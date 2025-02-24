import { Component, Input } from '@angular/core';
import { Ema } from '../../interfaces/lab-ema.interface';

@Component({
  selector: 'ema-list-laboratorios-page',
  templateUrl: './list-laboratorios.component.html',
  styles: ``
})
export class ListLaboratoriosComponent<T> {

  @Input() tipo :string ="";
  @Input() Organismos? :Ema<T>;
  @Input() descripcion:string="sasasasa";

}
