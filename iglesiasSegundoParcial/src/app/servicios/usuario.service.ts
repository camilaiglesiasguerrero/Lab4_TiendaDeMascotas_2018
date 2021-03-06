import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http.service';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public mihttp:MiHttpService) { }


  public GenerarToken(email:string,clave:string,tipo:string, callback: (token: string) => void) { 
   
      var rta =  this.mihttp.postjwt('/ingreso/',email,clave, tipo, data => { 
      //console.info(localStorage);
      var token = JSON.parse(data.text()).token;
      // console.log(token);
      callback(token);
      });
  }

  CrearUsuario(usuario: Usuario){ 
    this.mihttp.InsertUser(usuario);    
  }


}
