import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environments } from '../../../.env/env.prod';
import { concatMap, from, map, mergeMap, Observable, of, takeWhile, tap } from 'rxjs';
import { Ema, LaboratorioCalibracion, LaboratorioEnsayo } from '../interfaces/lab-ema.interface';

@Injectable({providedIn: 'root'})
export class LabEmaService {

  private _BaseURL = environments.baseUrl;
  private _Token = environments.Token;
  private _URLs:any[] = environments.URLs;
  private index:number = 0;

  constructor(private httpClient: HttpClient) { }

  getLabOR<T>(tipo:string):Observable<Ema<T>>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${this._Token}`
    })
    return this.httpClient.get<Ema<T>>(`${this._BaseURL}/${tipo}/?offset=0&limit=50`,{headers})
  }

  paginacion<T>(url:string | null):Observable<Ema<T> | null >{
    if (url == null) {
      return of(null)
    }
    const headers = new HttpHeaders({
      'Authorization': `Token ${this._Token}`
    })
    return this.httpClient.get<Ema<T>>(url,{headers})
  }

  searchByQ<T>(tipo:string,query:string):Observable<Ema<T>>  {

    const params = new HttpParams().set("q",`${query}`)
    const headers = new HttpHeaders({
      'Authorization': `Token ${this._Token}`
    })
    return this.httpClient.get<Ema<T>>(`${this._BaseURL}/${tipo}/?offset=0&limit=50`,{headers,params})

  }

  search<T>(url:string):Observable<Ema<T>>{
    const headers = new HttpHeaders({
      'Authorization': `Token ${this._Token}`
    })
    return this.httpClient.get<Ema<T>>(`${this._BaseURL}/${url}`,{headers})
  }

  searchAll<T>(query:string,path:string,parameters:any[]){

    const headers = new HttpHeaders({
      'Authorization': `Token ${this._Token}`
    });

    const URLs:any[] = [];
    parameters.forEach(element => {
      const url= `${path}/?offset=0&limit=50&q=${element.path}`+query;
      URLs.push(url);
    });


    return from(URLs).pipe(

      concatMap(url => this.httpClient.get<Ema<T>>(`${this._BaseURL}/${url}`,{headers}).pipe(
        tap((res)=>{
          if (res.results.length > 0) {
            console.log(res);
            res.url = url;
          }
        })
      )), // Ejecuta las peticiones en orden
      takeWhile((response,index) => !this.esResultadoValido(response,index), true), // Detiene cuando encuentra un resultado válid
    );
  }

  private esResultadoValido<T>(response: Ema<T>,index:number): boolean {

    return response && response.results.length>0;
  }

  htmlResponse: string = '';

  validarRFC(){
    const headers = new HttpHeaders({
      'responseType': `xml`
    });

    const formData = new FormData();
    formData.append('javax.faces.partial.ajax', 'true'); // Añade tus datos
    formData.append('javax.faces.source', 'formMain:consulta'); // Añade tus datos
    formData.append('javax.faces.partial.execute', '@all'); // Añade tus datos
    formData.append('javax.faces.partial.render', 'formMain'); // Añade tus datos
    formData.append('formMain:consulta', 'formMain:consulta'); // Añade tus datos
    formData.append('formMain', 'formMain'); // Añade tus datos
    formData.append('formMain:valRFC', 'RIFA970818NS5'); // Añade tus datos
    formData.append('javax.faces.ViewState', '4118388473759422277:-6055248495221823745'); // Añade tus datos

    return this.httpClient.post<FormData>("https://agsc.siat.sat.gob.mx/PTSC/ValidaRFC/index.jsf",formData,{
      responseType:"text" as "json"
    })
  }

}
