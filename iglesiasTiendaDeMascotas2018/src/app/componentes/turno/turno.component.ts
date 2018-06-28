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
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: FormatoFecha}],
})
export class TurnoComponent implements OnInit {
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
  turnos: Array <any>;
  
  constructor(private builder: FormBuilder, private mascotasS : MascotaService,  private route: ActivatedRoute,
    private router: Router ) { 
    this.esParaHoy = true;
    this.mascotasS.TraerTodas()
        .then(datos=>{
          this.mascotas = datos;
          this.mascotas = this.mascotas.filter(datos => datos.owner === localStorage.getItem("usuario"));
        return this.mascotas})
          .catch(error => {console.log(error)
        });
        
  }
  acceso:boolean;
  ngOnInit() {
    this.route.params.subscribe(params => {
      if(this.router.url == '/ListadoTurnos/Cliente')
        this.acceso = true;
      else if(this.router.url == '/Turnos')
        this.acceso = true;
    });
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
    }
    else if(value.day == now.getDate() && value.month == now.getMonth() && value.year == now.getFullYear())
        this.esParaHoy = true;
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
    }
    return null;
  });

  turnoForm: FormGroup = this.builder.group({
    fecha: this.dia,
    hora: this.hora,
    unaMascota: this.unaMascota,
  });

  Reservar(){
    this.turno = new Turno();
    this.turno.mascotaFicha = this.turnoForm.get('unaMascota').value;
    var aux =  this.turnoForm.get('fecha').value;
    var concat = aux.year + '-' + aux.month + '-' + aux.day;  
    this.turno.fecha = concat;
    aux = this.turnoForm.get('hora').value;
    concat = aux.hour + ':' + aux.minute;
    this.turno.hora = concat;
    
    this.mascotasS.ReservarTurno(this.turno);
    this.mascotasS.TraerTodosTurnos()
        .then(datos=>{
          this.turnos = datos;
        })
          .catch(error => {console.log(error)
        });
    this.reservado = true;    
    
  }
  

}
