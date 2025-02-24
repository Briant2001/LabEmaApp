import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Filtro } from '../../interfaces/lab-ema.interface';

@Component({
  selector: 'ema-input-busqueda',
  templateUrl: './input-busqueda.component.html',
  styles: ``
})
export class InputBusquedaComponent implements OnInit{


  @Output() eventQuery:EventEmitter<string> = new EventEmitter<string>();
  @ViewChild("categorias") categorias?:ElementRef<HTMLDivElement>;
  @ViewChild("query") InputQuery?:ElementRef<HTMLInputElement>
  @ViewChild("button") button?:ElementRef<HTMLInputElement>

  @Input() filtros?:Filtro[];


  private query:string = "";

  public categoria : string = "Selecione un valor";
  public placeholder : string = "Busqueda";

  ngOnInit(): void {
    if (!this.filtros) {

      this.categoria = "Ingrese un valor";
    }
  }
  onShowCategorias(){
    if (this.filtros) {
      this.categorias!.nativeElement.classList.toggle("hidden");
    }
  }

  onSelectCategoria(categoria:string,clave:string){
    this.InputQuery!.nativeElement.value ="";

    this.query = "";

    if (clave=="") {

      this.eventQuery.emit();
      this.categorias!.nativeElement.classList.toggle("hidden");
      this.categoria = categoria;
      return
    }
    this.categoria = categoria;
    this.query = clave;

    this.placeholder = 'Busqueda por '+categoria
    this.categorias!.nativeElement.classList.toggle("hidden")
  }

  onEnter(query:string){
    if (this.filtros) {
      if (this.query == "" ) {
        // this.eventQuery.emit();
        this.button?.nativeElement.focus()
        return
      }
      this.eventQuery.emit(this.query+query);
      return
    }
    this.eventQuery.emit(query);

    // this.query += query;

  }

}
