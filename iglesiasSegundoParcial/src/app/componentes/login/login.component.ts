import { Component, OnInit, Output } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : Usuario; 
  private _danger = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;
  esCliente: boolean;

  constructor(private usuarioS : UsuarioService, private route: ActivatedRoute,
    private router: Router) { 
    this.usuario = new Usuario();
    this.usuario.tipo = 'cliente';
  }


  ngOnInit() {
    
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }

  EntrarComo(num : number){
    switch(num){
      case 1:
        this.usuario.email = 'admin@admin.com';
        this.usuario.clave = 'admin';
        this.usuario.tipo = 'admin';
        localStorage.setItem("tipo","admin");
        break;
      case 2:
        this.usuario.email = 'cliente@cliente.com';
        this.usuario.clave = 'cliente';
        this.usuario.tipo = 'cliente';
        localStorage.setItem("tipo","cliente");
        break;
    }
    this.Entrar();
  }

  Entrar(){
    if(this.usuario.email==null || this.usuario.clave==null )
      {
         this._danger.next(`Por favor completar usuario y clave.`);
      }
      else
      {
        try{
        var respuesta =  this.usuarioS.GenerarToken(this.usuario.email,this.usuario.clave,this.usuario.tipo, token => { 
        if(token!=undefined)
          {
            localStorage.setItem("token",token);
            localStorage.setItem("usuario",this.usuario.email);
            if(this.usuario.tipo == 'cliente') 
              this.router.navigate(['/Principal']);
            else if(this.usuario.tipo == 'admin')
              this.router.navigate(['/Principal']);
          }
        else{
            this._danger.next("No se pudo ingresar, vuelva a intentar");
          }
      });
    }catch(error){ 
      this._danger.next(error);
    }
  }
  }
}
