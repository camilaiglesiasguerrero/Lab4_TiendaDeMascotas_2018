import { Component, OnInit, Input } from '@angular/core';
import { COMMON_DEPRECATED_I18N_PIPES } from '@angular/common/src/pipes/deprecated';
import { MascotaService } from '../../servicios/mascota.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  losDatos : Array<any>;
  cols: any[];

  constructor(private mascotaS:MascotaService) { 

  }

  ngOnInit(){
    this.losDatos = new Array<any>();
    this.mascotaS.TraerTodosTurnos()
    .then(data=>{
      this.losDatos = data;
      console.log(this.losDatos);
    })
    .catch();
  }

  rows = [
    this.losDatos
  ];

  columns = [
    { id: 'id' },
    { nroFicha: 'N° Ficha' },
    /*{ tipo: 'Tipo' },
    { raza: 'Raza' },
    { color: 'Color' },
    { edad: 'Edad' },*/
    { fecha: 'Fecha' },
    { hora: 'Hora' },
    { estado: 'Estado' },
    { owner: 'Dueño' }
  ];
}
