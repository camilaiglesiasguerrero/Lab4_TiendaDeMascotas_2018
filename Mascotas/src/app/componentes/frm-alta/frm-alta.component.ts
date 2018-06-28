import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota.service';


@Component({
  selector: 'app-frm-alta',
  templateUrl: './frm-alta.component.html',
  styleUrls: ['./frm-alta.component.css']
})
export class FrmAltaComponent implements OnInit {
  mascota : Mascota;
  Mensaje : string ='';
  mascotas : Array<Mascota> ;
  listado : Array<Mascota>;
  tituloMascotas : string;
  id: number = 0;

  constructor(private builder: FormBuilder, private mascotaS : MascotaService) { 
    this.tipo.setValue('gato');
  }

  ngOnInit() {
    this.listado =  new Array<Mascota>();
    this.mascotaS.TraerTodas()
        .then(datos=>{
          this.mascotas=datos; 
          for (let index = 0; index < this.mascotas.length; index++) {
            this.id = this.mascotas[index].nroFicha;
            this.nroFicha.setValue(this.id +1);
            if(this.mascotas[index].owner == localStorage.getItem("usuario"))
             {
              this.tituloMascotas = "Mis mascotas";
               this.listado.push(this.mascotas[index]);
             }
             else if(localStorage.getItem("tipo") == "admin")
              {
                this.tituloMascotas = "Todas las mascotas";
                this.listado.push(this.mascotas[index]);
              }
           }
        
          })
          .catch(error => {console.log(error)
        });
        
        
  }

  nroFicha = new FormControl('',[
    Validators.required,
  ]);

  raza = new FormControl('',[
    Validators.required,
  ]);

  color = new FormControl('',[
    Validators.required,
  ]);
  
  edad = new FormControl('',[
    Validators.required,
    Validators.min(0),
    Validators.max(30),
  ]);
  
  tipo = new FormControl('',[
    Validators.required,
  ]);

  altaForm: FormGroup = this.builder.group({
    nroFicha: this.nroFicha,
    raza: this.raza,
    color: this.color,
    edad : this.edad,
    tipo : this.tipo,
  });

  
  Registrar(){
    this.mascota = new Mascota();
    this.mascota.nroFicha = this.altaForm.get('nroFicha').value;
    this.mascota.raza = this.altaForm.get('raza').value;
    this.mascota.color = this.altaForm.get('color').value;
    this.mascota.edad = this.altaForm.get('edad').value;
    this.mascota.tipo = this.altaForm.get('tipo').value;
    if(localStorage.getItem('tipo')=='cliente')
      this.mascota.owner = localStorage.getItem('usuario');
    
    this.mascotaS.CrearMascota(this.mascota);
    this.listado.push(this.mascota);
    this.Mensaje = 'Mascota guardada';

    
  }
}
