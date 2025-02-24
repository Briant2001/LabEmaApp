import { Component } from '@angular/core';
import { Ema, Filtro, GRadiologiaImagen } from '../../interfaces/lab-ema.interface';
import { LabEmaService } from '../../services/lab-ema.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gab-radiologia-imagen-page',
  templateUrl: './gab-radiologia-imagen-page.component.html',
  styles: ``
})
export class GabRadiologiaImagenPageComponent {


  public ema?: Ema<GRadiologiaImagen>
  public results: GRadiologiaImagen[] = [];
  public count: number = 0;
  public spinner: number = 0;
  public filtros: Filtro[] = [
    { nombre: "Acreditación", filtro: "acreditacion__icontains:" },
    { nombre: "Organismo", filtro: "razonSocial__icontains:" }
  ]

  /**
   *
   */
  constructor(private emaService: LabEmaService, private activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.activate.queryParams.subscribe(params => {
      if (params['query']) {
        const url = params['query'];
        this.emaService.search<GRadiologiaImagen>(url).subscribe(res => {
          if (res.results.length > 0) {
            this.ema = res
            this.results = res.results
            this.spinner = 1;
            return
          }
          this.spinner = 1;
        })
      } else {

        this.initRequest();
      }
    })
  }

  initRequest() {
    this.ema = undefined;
    this.count = 0;
    this.results = [];
    this.spinner = 0;
    this.emaService.getLabOR<GRadiologiaImagen>("search-radiologia").subscribe(
      e => {
        if (e.results.length == 0) {
          this.spinner = 1;
          return
        }
        this.ema = e;
        this.count = e.results.length;
        this.results = e.results;
        this.spinner = 1;
      }
    );
  }

  paginacion(event: Observable<Ema<GRadiologiaImagen>>): void {
    this.spinner = 0;
    event.subscribe(ema => {
      if (ema.results.length == 0) {
        this.spinner = 1;
        return
      }
      this.ema = ema;
      this.results = this.ema.results;
      this.spinner = 1;

    })
  }

  limpiarEma() {

    this.ema = undefined;
    this.results = []

  }


  search(query: string) {
    this.spinner = 0;
    if (query == "" || query == undefined) {
      this.initRequest()
      return
    }
    this.ema = undefined;
    this.count = 0;
    this.results = [];

    this.emaService.searchByQ<GRadiologiaImagen>("search-radiologia", query).subscribe(
      e => {
        if (e.results.length == 0) {
          this.spinner = 1;
          return
        }
        this.ema = e;
        this.count = e.results.length;
        this.results = e.results;
        this.spinner = 1;
      }
    );
  }
}
