import { Component, OnInit, Input, Output } from '@angular/core';
import { Mascota } from '../../clases/mascota';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  @Input() listado: Array<any>;
  @Input() sonMascotas: boolean;
  @Input() sonTurnos: boolean;


  esAdmin : boolean;
  aux: Array <any>;
  buscados:string;
  estado: string;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem("tipo") == "admin")
    {
      this.buscados = "Tipo";
      this.esAdmin = true;
      this.aux = this.listado;
    }
    else  
      this.esAdmin = false;
  }

  onChange(filtro) {
    if(filtro == 'Tipo')
      this.listado = this.aux;
    else 
      this.listado = this.aux.filter(datos => datos.tipo === filtro);
    }

  
  
}
