import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } 
from '@angular/http';
import { map } from 'rxjs/operators'; 
import { Usuario } from '../clases/usuario';


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

    manejadorDeError(error:Response|any)
  { 
    //console.log(error);
        return error;
  }

  extraerDatos(respuesta:Response)
  {
        //console.log(respuesta);
        return respuesta.json()||{};
  }
}