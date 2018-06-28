import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Mascota } from '../clases/mascota';
import { Turno } from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor(public mihttp:MiHttpService) { }

  CrearMascota(mascota : Mascota){ 
    this.mihttp.CrearMascota(mascota);    
  }

  TraerTodas():Promise<Array<Mascota>>{
    return  this.mihttp.TraerMascotas()
     .then( data => {
       //console.log( data );
       return data;
     })
     .catch( err => {
       console.log( err );
       return null;
     });
  }

  ReservarTurno(turno: Turno){
    this.mihttp.ReservarTurno(turno);    
  }

  TraerTodosTurnos(){
    return this.mihttp.TraerTurnos()
     .then( data => {    
       //console.log( data );
       return data;
     })
     .catch( err => {
       console.log( err );
       return null;
     });
  }
}
