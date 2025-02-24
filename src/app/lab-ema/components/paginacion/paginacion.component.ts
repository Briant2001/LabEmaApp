import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Ema } from '../../interfaces/lab-ema.interface';
import { LabEmaService } from '../../services/lab-ema.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ema-paginacion',
  templateUrl: './paginacion.component.html',
  styles: ``
})
export class PaginacionComponent<T> {

  @Input() total?:number = 0;
  @Input() counts:number = 0;
  @Input() Ema?:Ema<T> ;

  @Output() limpiar: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventEma: EventEmitter<Observable<Ema<T>>> = new EventEmitter<Observable<Ema<T>>>();

  public numePage:number = 1;

  /**
   *
   */
  constructor(private emaService:LabEmaService) {

  }

  onNext():void{

    if (!this.Ema) {
      return undefined
    }
    if (this.Ema.next == null) {
      return
    }
    this.eventEma.emit(of());
    this.emaService.paginacion<T>(this.Ema.next).subscribe(e=> {
      if (e==null) {
        return
      }

      this.eventEma.emit(of(e));
      this.counts  += e.results.length;
      this.numePage++;
    });

    this.limpiar.emit();
  }


  onPrevious():void{

    if (!this.Ema) {
      return undefined
    }
    if (this.Ema.previous == null) {
      return
    }
    this.eventEma.emit(of());
    this.emaService.paginacion<T>(this.Ema.previous).subscribe(e=> {
      if (e == null) {
        return
      }
      this.eventEma.emit(of(e));
      this.counts  -= e.results.length;
      this.numePage--;
    });

    this.limpiar.emit();
  }

  returnEma(){

  }



}
