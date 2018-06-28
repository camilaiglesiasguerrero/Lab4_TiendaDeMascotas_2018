import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Turno } from '../../clases/turno';
import { Mascota } from '../../clases/mascota';
import { MascotaService } from '../../servicios/mascota.service';

@Component({
  selector: 'app-nexo',
  templateUrl: './nexo.component.html',
  styleUrls: ['./nexo.component.css']
})
export class NexoComponent implements OnInit {
  mascotas : Array<Mascota>;
  listadoTurnos: Array<Turno>;
  listado : Array<any>;
  listadoMascotas : Array<Mascota>;
  turnos: string;
  flagFiltro : boolean;
  esListado : boolean;

  constructor(private route: ActivatedRoute, private router: Router, 
    private mascotasS : MascotaService) { 
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(this.router.url == '/MisTurnos')
      { 
        this.esListado = true;
        this.flagFiltro = true;
        this.turnos = 'TODOS MIS TURNOS';
        this.TraerTurnos();
      }
      else if(this.router.url == '/Turnos'){
        this.esListado = true;
        this.flagFiltro = false;
        this.turnos = "TODOS LOS TURNOS";
        this.TraerTurnos();
      }
      else if(this.router.url == '/Dashboard'){
        this.esListado = false;
        this.flagFiltro = false;
        this.TraerTurnos();
      }
    });

    
  }

  TraerTurnos(){
    this.listadoTurnos = new Array<Turno>();
    this.listado = new Array<any>();
    this.listadoMascotas = new Array<Mascota>();

    while(this.listadoTurnos.length >0){
      this.listadoTurnos.pop();
    }
    
    if(this.listado.length != 0)
    {
      while(this.listado.length > 0)
        this.listado.pop();
    }

    this.mascotasS.TraerTodas()
        .then(datos=>{
          this.mascotas = datos;
          for (let index = 0; index < this.mascotas.length; index++) {
            this.listadoMascotas.push(this.mascotas[index])
          }
          this.mascotasS.TraerTodosTurnos()
          .then(datos=>{
            for (let index = 0; index < datos.length; index++) {
              this.listadoTurnos.push(datos[index]);
            }

            if(this.flagFiltro){
              for (let index = 0; index < this.listadoTurnos.length; index++) {
                if(this.listadoTurnos[index]["owner"] == localStorage.getItem("usuario"))
                  this.listado.push(this.listadoTurnos[index]);
              }
            }
            else{
              for (let index = 0; index < this.listadoTurnos.length; index++) {
                  this.listado.push(this.listadoTurnos[index]);
              }
            }

            
            for (let i = 0; i < this.listadoMascotas.length; i++) {
              for (let j = 0; j < this.listado.length; j++) {
                if(this.listado[j]['nroFicha'] == this.listadoMascotas[i].nroFicha)
                { 
                  this.listado[j]['tipo']= this.listadoMascotas[i].tipo;
                  this.listado[j]['raza']= this.listadoMascotas[i].raza;
                  this.listado[j]['color']= this.listadoMascotas[i].color;
                  this.listado[j]['edad']= this.listadoMascotas[i].edad;
                }
              }
            }
          })
            .catch(error => {console.log(error)
          });
        })
          .catch(error => {console.log(error)
        });      
  }

  
}
