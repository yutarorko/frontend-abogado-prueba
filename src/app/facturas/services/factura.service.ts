import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Factura } from '../models/factura';
import { Tramite } from '../models/tramite';
import { Router } from '@angular/router';
import { AuthService } from '../../usuarios/auth.service';
import Swal from 'sweetalert2';

import { URL_BACKEND } from 'src/app/config/config';


@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private urlEndPoint: string = URL_BACKEND + '/api/facturas';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router:Router,
    public authService:AuthService
  ) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer '+ token);
    }
    return this.httpHeaders;
  }
  private isNoAutorizado(e:any):boolean{
    if(e.status == 401){
      this.router.navigate(['/login'])
      return true;
    }
    if(e.status==403){
      Swal.fire('Acceso denegado',`Usuario ${this.authService.usuario.nombre} ${this.authService.usuario.apellido} no tienes acceso a este recurso!`,'warning');
      this.router.navigate(['/colegiados'])
      return true;
    }
    return false;
  }


  //Obtener factura
  getFactura(id:number):Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEndPoint}/${id}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  //Crear factura
  create(factura:Factura):Observable<Factura>{
    return this.http.post<Factura>(this.urlEndPoint,factura,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  //Filtrar tramites
  filtrarTramites(term:string):Observable<Tramite[]>{
    return this.http.get<Tramite[]>(`${this.urlEndPoint}/filtrar-tramites/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

}
