import { Component, NgModule, OnInit, Input } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { BaseChartDirective } from 'ng2-charts';
import { MascotaService } from '../../servicios/mascota.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private mascotaS : MascotaService) {
  }
  turnos : Array<any>;

  perros : number;
  gatos : number;

  ngOnInit(){
    this.mascotaS.TraerTodosTurnos()
        .then(datos=>{
          this.turnos = datos;
          this.perros = this.turnos.filter(datos => datos.tipo === 'perro').length;
          this.gatos = this.turnos.filter(datos => datos.tipo === 'gato').length;
          this.doughnutChartData = [this.perros,this.gatos];
          console.log(this.perros + '-' + this.gatos + '-' + this.doughnutChartData);
        })
          .catch(error => {console.log(error)
        });
        
  }
  // Doughnut
  public doughnutChartLabels:string[] = ['Perros','Gatos'];
  public doughnutChartData:number[];
  //public doughnutChartData:number[] = [ 10, 50];
  public doughnutChartType:string = 'doughnut';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  exportar(){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var dd = { content: BaseChartDirective };
    pdfMake.createPdf(dd).download();
  }
}