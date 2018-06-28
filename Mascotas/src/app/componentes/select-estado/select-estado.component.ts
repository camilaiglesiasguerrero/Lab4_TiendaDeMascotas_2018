import { Component, OnInit, Input, Output } from '@angular/core';
import { MascotaService } from '../../servicios/mascota.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-select-estado',
  templateUrl: './select-estado.component.html',
  styleUrls: ['./select-estado.component.css']
})
export class SelectEstadoComponent implements OnInit {

  @Input() id : number;
  @Input() estado:string;  

  esAdmin : boolean;
  
  constructor(private mascotaS : MascotaService) {
    if(localStorage.getItem('tipo')=='admin')
      this.esAdmin = true;
    else 
      this.esAdmin = false;
  }

  ngOnInit() {
  }

  cambioEstado(estado){
    this.mascotaS.cambiarEstado(this.id, estado)
    .then( data => {    
      return data;
    })
    .catch( err => {
      console.log( err );
      return null;
    });
  }

}
