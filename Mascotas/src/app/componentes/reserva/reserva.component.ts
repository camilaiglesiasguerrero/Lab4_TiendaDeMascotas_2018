import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormatoFecha } from '../../clases/formato-fecha';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota.service';
import { Turno } from '../../clases/turno';

const now = new Date();

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: FormatoFecha}],
})
export class ReservaComponent implements OnInit {
  
  tituloMascotas: string = "TODOS MIS TURNOS";

  esParaHoy: boolean = true;
  model: NgbDateStruct;
  disabled = true;
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;
  time = {hour: now.getHours(), minute: now.getMinutes()+1};
  mascotas : Array<Mascota>;
  turno : Turno; 
  reservado : boolean;
  okD : boolean = false;
  okF : boolean = false;
  listadoTurnos: Array <Turno>;
  listadoMascotas : Array <Mascota>;
  listado : Array<any>;

  constructor(private builder: FormBuilder, private mascotasS : MascotaService,  private route: ActivatedRoute,
    private router: Router ) { 
    this.listadoTurnos = new Array<Turno>();
    this.listado = new Array<any>();
    this.listadoMascotas = new Array<Mascota>();
    this.esParaHoy = true;

    this.mascotasS.TraerTodas()
        .then(datos=>{
          this.mascotas = datos;
          for (let index = 0; index < this.mascotas.length; index++) {
            this.listadoMascotas.push(this.mascotas[index])
          }
          this.TraerTurnos();
          this.mascotas = this.mascotas.filter(datos => datos.owner === localStorage.getItem("usuario"));
        return this.mascotas})
          .catch(error => {console.log(error)
        });      
  }

  TraerTurnos(){
    while(this.listadoTurnos.length >0){
      this.listadoTurnos.pop();
    }
    
    if(this.listado.length != 0)
    {
      while(this.listado.length > 0)
        this.listado.pop();
    }

    this.mascotasS.TraerTodosTurnos()
      .then(datos=>{
        for (let index = 0; index < datos.length; index++) {
          if(datos[index]["owner"]===localStorage.getItem("usuario"))
            {
              this.listadoTurnos.push(datos[index]);
            }
        }
        this.armarListado();
      })
        .catch(error => {console.log(error)
      });
  }

  ngOnInit() {
    this.reservado = false;

    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.time = {hour: now.getHours(), minute: now.getMinutes()};
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }

  dia = new FormControl('', (control: FormControl) => {
    const value = control.value;
    if (value.day < now.getDate() || value.month < now.getMonth() || value.year < now.getFullYear()) {
      this.esParaHoy = false;
      this._danger.next(`Disculpe. Es imposible.`);
      this.okD = false;
    }
    else if(value.day == now.getDate() && value.month == now.getMonth() && value.year == now.getFullYear())
    {
      this.esParaHoy = true;
      this.okD = true;
    }
    else
    {
      this.okD = true;
    }
    return null;
  });

  unaMascota = new FormControl('',[
    Validators.required,
  ]);

  hora = new FormControl('', (control: FormControl) => {
    const value = control.value;
    //console.info(value + this.esParaHoy);    
    if (this.esParaHoy == true && (value.hour < now.getHours() || (value.hour >= now.getHours() && value.minute < now.getMinutes()))) {
      this._danger.next(`Disculpe. Es imposible.`);
      this.okF = false;
    }
    else
      this.okF = true;
    return null;
  });

  turnoForm: FormGroup = this.builder.group({
    fecha: this.dia,
    hora: this.hora,
    unaMascota: this.unaMascota,
  });

  Reservar(){
    if(this.okD && this.okF)
    {
      this.turno = new Turno();
      this.turno.mascotaFicha = this.turnoForm.get('unaMascota').value;
      var aux =  this.turnoForm.get('fecha').value;
      var concat = aux.year + '-' + aux.month + '-' + aux.day;  
      this.turno.fecha = concat;
      aux = this.turnoForm.get('hora').value;
      concat = aux.hour + ':' + aux.minute;
      this.turno.hora = concat;
      this.turno.owner = localStorage.getItem("usuario");
      
      this.mascotasS.ReservarTurno(this.turno)
        .then(datos=> {
         this.TraerTurnos();
        });
      this.reservado = true;    
      
    }
    else
      this._danger.next("Por favor ingrese valores de fecha y hora válidos");
  }
  
  armarListado(){
    for (let index = 0; index < this.listadoTurnos.length; index++) {
      //console.log(this.listadoTurnos);
      //console.log(this.listado);
      this.listado.push(this.listadoTurnos[index]);
    }
    
    for (let i = 0; i < this.listadoMascotas.length; i++) {
      for (let j = 0; j < this.listado.length; j++) {
        if(this.listado[j]['nroFicha'] == this.listadoMascotas[i].nroFicha)
        { 
          this.listado[j]['tipo']= this.listadoMascotas[i].tipo;
          this.listado[j]['raza']= this.listadoMascotas[i].raza;
          this.listado[j]['color']= this.listadoMascotas[i].color;
          this.listado[j]['edad']= this.listadoMascotas[i].edad;
        }
      }
      
    }
  }

}
