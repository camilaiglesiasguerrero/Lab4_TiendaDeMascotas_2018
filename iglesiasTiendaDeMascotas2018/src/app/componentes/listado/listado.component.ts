import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Mascota } from '../../clases/mascota';
import { Turno } from '../../clases/turno';
import { MascotaService } from '../../servicios/mascota.service';
import { ExcelService } from '../../servicios/excel.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  mostrar: boolean;
  aux: Array<any>;
  buscados: string = 'Tipo';

  @Input() mascotas: Array<Mascota>;
  @Input() turnos: Array<any>;

  constructor(private route: ActivatedRoute,
    private router: Router, private mascotaS: MascotaService, private excelS : ExcelService) { 
    }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      if(this.router.url == '/Turnos')
      { 
        this.mostrar = false;
      }
      else 
      {
        this.mascotaS.TraerTodosTurnos()
        .then(datos=>{
          this.turnos = datos;
          this.aux = this.turnos;
          //console.log(this.turnos);
        })
          .catch(error => {console.log(error)
        });
        
        this.mostrar = true;
      }
    });
  
  }
 
  exportToExcel(event) {
    //console.log(this.turnos);
    this.excelS.exportAsExcelFile(this.turnos, 'Turnos');
  }

  onChange(filtro) {
    if(filtro == 'Tipo')
      this.aux = this.turnos;
    else 
      this.aux = this.turnos.filter(datos => datos.tipo === filtro);
}



}
