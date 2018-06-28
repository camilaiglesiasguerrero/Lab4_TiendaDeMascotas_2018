import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota.service';

@Component({
  selector: 'app-alta-mascota',
  templateUrl: './alta-mascota.component.html',
  styleUrls: ['./alta-mascota.component.css']
})
export class AltaMascotaComponent implements OnInit {
  mascota : Mascota;
  Mensaje : string ='';
  constructor(private builder: FormBuilder, private mascotaS : MascotaService) { 
    this.tipo.setValue('gato');
  }

  ngOnInit() {
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
    this.Mensaje = 'Mascota guardada';
  }
}
