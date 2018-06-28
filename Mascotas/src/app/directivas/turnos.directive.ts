import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { SelectEstadoComponent } from '../componentes/select-estado/select-estado.component';

@Directive({
  selector: '[appTurnos]'
})
export class TurnosDirective implements OnInit{

  @Input() estado : string;
  elEstado : string;
  elemento : ElementRef;

  constructor(el: ElementRef) {
    this.elemento = el;  
  }

  ngOnInit(){
    if(this.estado == 'cancelado')
      this.elemento.nativeElement.style.backgroundColor = "lightcoral";
    else if(this.estado == 'finalizado')
      this.elemento.nativeElement.style.backgroundColor = "dimgray";
    else if(this.estado == 'pendiente')
      this.elemento.nativeElement.style.backgroundColor = "palegreen";
  }
}
