import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } 
from '@angular/http';
//import 'rxjs/add/operator/toPromise';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators'; 
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/toPromise';
import { Usuario } from '../clases/usuario';
import { Mascota } from '../clases/mascota';
import { Turno } from '../clases/turno';
import { toDate } from '@angular/common/src/i18n/format_date';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';



@Injectable()
export class MiHttpService {

  url : string = "http://localhost:8080/spApi/api";
  headers: Headers;
  options: RequestOptions;

  constructor( public http: Http ) {     
    this.headers = new Headers({ 'Content-Type': 'application/json', 
    'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });   
  }

  postjwt(ruta:string,email:string,clave:string,tipo:string, callback: (r: Response) => void)
  {
    let data = new URLSearchParams();
    data.append('email',email);
    data.append('clave', clave);
    data.append('tipo',tipo)
    this.http
      .post(this.url+ruta,data)
      .pipe(map(res => res))
      .subscribe(callback, 
        error => {
           alert(error);
        });
  }

  InsertUser(usuario: Usuario){ 
      let data = new URLSearchParams();
      data.append('tipo', usuario.tipo);
      data.append('email', usuario.email);
      data.append('clave', usuario.clave);
      
      return this.http
        .post(this.url + '/Usuario/', data)
          .subscribe(data => {
              console.log(data);
          }, error => {
              console.log(error.json());
          });
    }

    CrearMascota(mascota : Mascota){ 
      let data = new URLSearchParams();
      data.append('nroFicha',mascota.nroFicha.toString());
      data.append('raza',mascota.raza);
      data.append('color',mascota.color);
      data.append('edad',mascota.edad.toString());
      data.append('tipo', mascota.tipo);
      if(mascota.owner != '')
        data.append('owner',mascota.owner);
        
      return this.http
        .post(this.url + '/Mascota/', data)
          .subscribe(data => {
              console.log(data);
          }, error => {
              console.log(error.json());
          });
    }

    TraerMascotas(){
      return this.http
      .get( this.url + '/Mascotas/')
      .toPromise()
      .then( this.extraerDatos )
      .catch( this.handleError );
    }

    ReservarTurno(turno: Turno){ 
      let data = new URLSearchParams();
      data.append('nroFicha',turno.mascotaFicha);
      data.append('fecha',turno.fecha);
      data.append('hora', turno.hora);
        
      return this.http
        .post(this.url + '/Turno/', data)
          .subscribe(data => {
              //console.log(data);
          }, error => {
              console.log(error.json());
          });
    }

    TraerTurnos(){
      return this.http
      .get( this.url + '/Turno/')
      .toPromise()
      .then( this.extraerDatos )
      .catch( this.handleError );
    }

    private extraerDatos(resp:Response) {

      return resp.json() || {};

  }
  private handleError(error:Response | any) {

      return error;
  }
  



  
}