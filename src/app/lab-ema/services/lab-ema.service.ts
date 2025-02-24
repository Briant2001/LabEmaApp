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

}
