import { Component, Input } from '@angular/core';

@Component({
  selector: 'ema-descripcion-lab',
  templateUrl: './descripcion-lab.component.html',
  styles: ``
})
export class DescripcionLabComponent {
  @Input() title:string="Titulo";
  @Input() p1:string="Parrafo1";
  @Input() p2:string="Parrafo2";
}
