import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { LabEmaService } from '../services/lab-ema.service';
import { BancoSangre, Catalogo, Ema, GRadiologiaImagen, LabAnalisisClinicos, LaboratorioCalibracion, LaboratorioEnsayo, OrganismoCertificacion, ProductosMRC, ProvEnsayosApitud, UnidadInspeccion } from '../interfaces/lab-ema.interface';
import { environments } from '../../../.env/env.prod';
import { concatMap, EMPTY, filter, from, map, of, take, takeWhile, tap } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent implements AfterViewInit {


  @ViewChild("categorias") categorias?: ElementRef<HTMLDivElement>

  private _URLs = environments.URLs;
  public ema?: Ema<any>;
  public _OC?: OrganismoCertificacion[];
  public _LC?: LaboratorioCalibracion[];
  public _LP?: LaboratorioEnsayo[];
  public _UI?: UnidadInspeccion[];
  public _CL?: LabAnalisisClinicos[];
  public _PEA?: ProvEnsayosApitud[];
  public _PMR?: ProductosMRC[];
  public _BS?: BancoSangre[];
  public _RI?: GRadiologiaImagen[];

  public control = 0;


  /**
   *
   */
  constructor(private emaService: LabEmaService, private routerActive:Router) { }

  ngAfterViewInit(): void { }



  search(query: string) {
    if (this.control == 1) {
      return
    }
    this.control = 1;

    from(this._URLs).pipe(
      // Por cada configuración de URL, se ejecuta la búsqueda según el 'path'
      concatMap(urlConfig => {
         if (urlConfig.path === "search") {
          return this.emaService.searchAll<OrganismoCertificacion>(query, urlConfig.path, urlConfig.parameters)
          .pipe(tap(
            res=>{
              if (res.results.length>0) {
                this.routerActive.navigate(["ema/catalogo/OC"],{queryParams:{query:`${res.url}` }});
              }
            }));

        }
        else if (urlConfig.path === "search-calibracion") {
          return this.emaService.searchAll<LaboratorioCalibracion>(query, urlConfig.path, urlConfig.parameters)
          .pipe(tap(
            res=>{
              if (res.results.length>0) {
                this.routerActive.navigate(["ema/catalogo/LC"],{queryParams:{query:`${res.url}` }});
              }
            }
          ));
        }
        else if (urlConfig.path === "search-ensayos") {
          return this.emaService.searchAll<LaboratorioEnsayo>(query, urlConfig.path, urlConfig.parameters)
          .pipe( tap(
            res=>{
              if (res.results.length>0) {
                this.routerActive.navigate(["ema/catalogo/LP"],{queryParams:{query:`${res.url}` }});
              }
            }
          ));

        }
        else if (urlConfig.path === "search-unidades-inspeccion") {
          return this.emaService.searchAll<UnidadInspeccion>(query, urlConfig.path, urlConfig.parameters)
          .pipe(tap(
            res=>{
              if (res.results.length > 0) {
                this.routerActive.navigate(["ema/catalogo/UI"],{queryParams:{query:`${res.url}` }});

              }
            }));

        }
        else if (urlConfig.path === "search-analisis-clinicos") {
          return this.emaService.searchAll<LabAnalisisClinicos>(query, urlConfig.path, urlConfig.parameters)
          .pipe(tap(
            res=>{
              if (res.results.length>0) {

                this.routerActive.navigate(["ema/catalogo/SALUD"],{queryParams:{query:`${res.url}` }});
              }
            }));

        }
        else if (urlConfig.path === "search-pea") {
          return this.emaService.searchAll<ProvEnsayosApitud>(query, urlConfig.path, urlConfig.parameters)
          .pipe(tap(
            res=>{
              if (res.results.length>0) {
                this.routerActive.navigate(["ema/catalogo/PEA"],{queryParams:{query:`${res.url}` }});
              }
            }));
        }
        else if (urlConfig.path === "search-pmr") {
          return this.emaService.searchAll<ProductosMRC>(query, urlConfig.path, urlConfig.parameters)
          .pipe(tap(
            res=>{
              if (res.results.length>0) {

                this.routerActive.navigate(["ema/catalogo/PMR"],{queryParams:{query:`${res.url}` }});
              }
            }));
        }
        else if (urlConfig.path === "search-bancos-sangre") {
          return this.emaService.searchAll<BancoSangre>(query, urlConfig.path, urlConfig.parameters)
          .pipe(
            tap(
              res=>{
                if (res.results.length>0) {

                  this.routerActive.navigate(["ema/catalogo/BS"],{queryParams:{query:`${res.url}` }});
                }
              }));
        }
        else if (urlConfig.path === "search-radiologia") {
          return this.emaService.searchAll<GRadiologiaImagen>(query, urlConfig.path, urlConfig.parameters)
          .pipe(
            tap(
              res=>{
                if (res.results.length>0) {

                  this.routerActive.navigate(["ema/catalogo/RI"],{queryParams:{query:`${res.url}` }});
                }else{
                  this.control = 2;
                }
              })
          );
        }
        // En caso de no coincidir, se retorna un observable vacío search-pmr
        return of();
      }),
      // Filtramos las respuestas que contengan resultados válidos
      filter(response => {
        return response.results && response.results.length > 0;
      }),
      // takeWhile((response,index) => response && response.results.length>0, true), // Detiene cuando encuentra un resultado válid

      take(1),
      // Se toma la primera respuesta válida y se detiene la secuencia
    ).subscribe(response => {
      this.control = 0;
    });
  }

  isProductoA(producto: Catalogo, tipo: string): producto is LaboratorioCalibracion | LaboratorioEnsayo | OrganismoCertificacion
    | UnidadInspeccion | LabAnalisisClinicos | ProvEnsayosApitud | ProductosMRC | BancoSangre | GRadiologiaImagen {
    return producto.TYPE === tipo;
  }

}
