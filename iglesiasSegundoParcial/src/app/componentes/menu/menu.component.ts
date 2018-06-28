import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  estaLogueado : boolean;
  esAdmin : boolean;
  esCliente : boolean;
  flag : boolean;

  constructor(private route: ActivatedRoute,
    private router: Router) {       
      
      if(localStorage.getItem("token") != 'sinToken'){
        this.estaLogueado = true;
        this.flag = false;
        if(localStorage.getItem("tipo")=='admin'){ 
          this.esAdmin = true;  
          this.esCliente = false;
        }
        else if(localStorage.getItem("tipo")=='cliente'){
          this.esAdmin = false;
          this.esCliente = true;
        }
      }      
    }
  

  ngOnInit() {
    
  }

  irA(donde : string){
    switch(donde){
      case 'Principal':
        this.router.navigate(['/Principal']);
        break;
      case 'Desloguearse':
        try 
        {
          localStorage.setItem("tipo",null);
          localStorage.setItem("usuario","invitado");
          localStorage.setItem("token",null);
          this.router.navigate(['/Principal']);
          this.estaLogueado = false;
          this.esAdmin = false;
          this.esCliente = false;
        } 
        catch (error) 
        {
          return false;
        }
        break;
      case 'Login':
        this.router.navigate(['/Ingresar']);
        break;
      case 'Registrarse':
        this.router.navigate(['/Registrarse']);
        break;

    }
  }

}
