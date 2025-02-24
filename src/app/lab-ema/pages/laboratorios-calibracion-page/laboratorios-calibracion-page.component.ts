import { Component, Input } from '@angular/core';
import { Ema, Filtro, LaboratorioCalibracion } from '../../interfaces/lab-ema.interface';
import { LabEmaService } from '../../services/lab-ema.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-laboratorios-calibracion-page',
  templateUrl: './laboratorios-calibracion-page.component.html',
  styles: ``,
})
export class LaboratoriosCalibracionPageComponent {

  public ema?: Ema<LaboratorioCalibracion>
  public results: LaboratorioCalibracion[] = [];
  public count: number = 0;
  public spinner: number = 0;
  @Input() list?: Ema<LaboratorioCalibracion>


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
        this.emaService.search<LaboratorioCalibracion>(url).subscribe(res => {
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
    this.emaService.getLabOR<LaboratorioCalibracion>("search-calibracion").subscribe(
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
    )

  }

  paginacion(event: Observable<Ema<LaboratorioCalibracion>>): void {
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
    if (query == "") {
      this.initRequest()
      return
    }
    this.ema = undefined;
    this.count = 0;
    this.results = [];

    this.emaService.searchByQ<LaboratorioCalibracion>("search-calibracion", query).subscribe(
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
