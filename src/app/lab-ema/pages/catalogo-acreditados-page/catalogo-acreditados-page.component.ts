import { Component, ElementRef, Input, OnInit, Type, ViewChild } from '@angular/core';
import { LaboratoriosCalibracionPageComponent } from '../laboratorios-calibracion-page/laboratorios-calibracion-page.component';
import { LabEmaService } from '../../services/lab-ema.service';
import { BancoSangre, Busqueda, Catalogo, Ema, GRadiologiaImagen, LabAnalisisClinicos, LaboratorioCalibracion, LaboratorioEnsayo, OrganismoCertificacion, ProductosMRC, ProvEnsayosApitud, UnidadInspeccion } from '../../interfaces/lab-ema.interface';
import { environments } from '../../../../.env/env.prod';

import { concatMap, EMPTY, filter, from, map, pipe, take } from 'rxjs';

@Component({
  selector: 'app-catalogo-acreditados-page',
  templateUrl: './catalogo-acreditados-page.component.html',
  styles: ``,
})
export class CatalogoAcreditadosPageComponent implements OnInit {

  private _URLs = environments.URLs;

  public ema?: Ema<any>;
  public _OC?: OrganismoCertificacion[] ;
  public _LC?:LaboratorioCalibracion[];
  public _LP?: LaboratorioEnsayo[] ;
  public _UI?: UnidadInspeccion[] ;
  public _CL?: LabAnalisisClinicos[] ;
  public _PEA?: ProvEnsayosApitud[] ;
  public _PMR?: ProductosMRC[] ;
  public _BS?: BancoSangre[] ;
  public _RI?: GRadiologiaImagen[] ;


  /**
   *
   */
  constructor(private emaService: LabEmaService) {

  }

  ngOnInit(): void {


  }

  search(query: string) {
    from(this._URLs).pipe(
      // Por cada configuración de URL, se ejecuta la búsqueda según el 'path'
      concatMap(urlConfig => {
        if (urlConfig.path === "search-calibracion") {
          return this.emaService.searchAll<LaboratorioCalibracion>(query, urlConfig.path, urlConfig.parameters).pipe(
            map(res=>{
              res.results.forEach(res=>{
                res.TYPE = "LC"
              })
              return {...res,}
            })
          );
        } else if (urlConfig.path === "search-ensayos") {
          return this.emaService.searchAll<LaboratorioEnsayo>(query, urlConfig.path, urlConfig.parameters).pipe(
            map(res=>{
              res.results.forEach(res=>{
                res.TYPE = "LP"
              })
              return {...res,}
            })
          );
        }else if (urlConfig.path === "search") {
          return this.emaService.searchAll<OrganismoCertificacion>(query, urlConfig.path, urlConfig.parameters).pipe(
            map(res=>{
              res.results.forEach(res=>{
                res.TYPE = "OC"
              })
              return {...res,}
            })
          );
        }else if (urlConfig.path === "search-unidades-inspeccion") {
          return this.emaService.searchAll<UnidadInspeccion>(query, urlConfig.path, urlConfig.parameters).pipe(
            map(res=>{
              res.results.forEach(res=>{
                res.TYPE = "UI"
              })
              return {...res,}
            })
          );
        }
        else if (urlConfig.path === "search-analisis-clinicos") {
          return this.emaService.searchAll<LabAnalisisClinicos>(query, urlConfig.path, urlConfig.parameters).pipe(
            map(res=>{
              res.results.forEach(res=>{
                res.TYPE = "CL"
              })
              return {...res,}
            })
          );
        }
        else if (urlConfig.path === "search-pea") {
          return this.emaService.searchAll<ProvEnsayosApitud>(query, urlConfig.path, urlConfig.parameters).pipe(
            map(res=>{
              res.results.forEach(res=>{
                res.TYPE = "PEA"
              })
              return {...res,}
            })
          );
        }
        else if (urlConfig.path === "search-pmr") {
          return this.emaService.searchAll<ProductosMRC>(query, urlConfig.path, urlConfig.parameters).pipe(
            map(res=>{
              res.results.forEach(res=>{
                res.TYPE = "PMR"
              })
              return {...res,}
            })
          );
        }
        else if (urlConfig.path === "search-bancos-sangre") {
          return this.emaService.searchAll<BancoSangre>(query, urlConfig.path, urlConfig.parameters).pipe(
            map(res=>{
              res.results.forEach(res=>{
                res.TYPE = "BS"
              })
              return {...res,}
            })
          );
        }
        else if (urlConfig.path === "search-radiologia") {
          return this.emaService.searchAll<GRadiologiaImagen>(query, urlConfig.path, urlConfig.parameters).pipe(
            map(res=>{
              res.results.forEach(res=>{
                res.TYPE = "RI"
              })
              return {...res,}
            })
          );
        }
        // En caso de no coincidir, se retorna un observable vacío search-pmr
        return EMPTY;
      }),
      // Filtramos las respuestas que contengan resultados válidos
      filter(response => response.results && response.results.length > 0),
      // Se toma la primera respuesta válida y se detiene la secuencia
      take(1)
    ).subscribe(response => {
      if (this.isProductoA(response.results[0],"LC")) {
        this._LC = response.results as LaboratorioCalibracion[];
      }else if (this.isProductoA(response.results[0],"LP")) {
        this._LP = response.results as LaboratorioEnsayo[];
      }
      else if (this.isProductoA(response.results[0],"OC")) {
        this._OC = response.results as OrganismoCertificacion[];
      }
      else if (this.isProductoA(response.results[0],"UI")) {
        this._UI = response.results as UnidadInspeccion[];
      }
      else if (this.isProductoA(response.results[0],"CL")) {
        this._CL = response.results as LabAnalisisClinicos[];
      }
      else if (this.isProductoA(response.results[0],"PEA")) {
        this._PEA = response.results as ProvEnsayosApitud[];
      }
      else if (this.isProductoA(response.results[0],"PMR")) {
        this._PMR= response.results as ProductosMRC[];
      }
      else if (this.isProductoA(response.results[0],"BS")) {
        this._BS= response.results as BancoSangre[];
      }
      else if (this.isProductoA(response.results[0],"RI")) {
        this._RI= response.results as GRadiologiaImagen[];
      }

    });
  }

  isProductoA(producto: Catalogo,tipo:string): producto is LaboratorioCalibracion| LaboratorioEnsayo | OrganismoCertificacion
  | UnidadInspeccion | LabAnalisisClinicos | ProvEnsayosApitud | ProductosMRC | BancoSangre | GRadiologiaImagen {
    return producto.TYPE === tipo;
  }

}
