import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';
import { Colegiado } from './colegiado';
import Swal from 'sweetalert2';

import { URL_BACKEND } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ColegiadoService {

  private urlEndPoint:string = URL_BACKEND + '/api';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json' });

  constructor(private http:HttpClient, private router:Router,public authService:AuthService) { }

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

  //Traer colegiados
  getColegiados():Observable<Colegiado[]>{
    return this.http.get<Colegiado[]>(this.urlEndPoint+`/colegiados`).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  //Traer por dni
  getColegiadosByDni(term:string):Observable<Colegiado[]>{
    return this.http.get<Colegiado[]>(this.urlEndPoint+`/colegiados/filtrar-colegiados-dni/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  //Traer por apellido
  getColegiadosByApellido(term:string):Observable<Colegiado[]>{
    return this.http.get<Colegiado[]>(this.urlEndPoint+`/colegiados/filtrar-colegiados-apellido/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  //Traer por colegiatura
  getColegiadosByColegiatura(term:string):Observable<Colegiado[]>{
    return this.http.get<Colegiado[]>(this.urlEndPoint+`/colegiados/filtrar-colegiados-colegiatura/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  //Traer por nombre
  getColegiadosByNombre(term:string):Observable<Colegiado[]>{
    return this.http.get<Colegiado[]>(this.urlEndPoint+`/colegiados/filtrar-colegiados-nombre/${term}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  //Traer ultimo colegiado
  getUltimoColegiado():Observable<Colegiado>{
    return this.http.get<Colegiado>(this.urlEndPoint+`/colegiados/ultimo`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
  //Crear colegiado
  create(colegiado:Colegiado): Observable<Colegiado>{
    return this.http.post(this.urlEndPoint+`/colegiados`,colegiado,{headers:this.agregarAuthorizationHeader()}).pipe(
      map( (response:any) => response.Colegiado as Colegiado),
      catchError(e => {
        
        if(this.isNoAutorizado(e)){
          //no tiene permiso para crear
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);
        }
        if(e.error.Mensaje){
          console.log(e.error.Mensaje);
        }
        return throwError(e);
      })
    )
  }
  //Obtener colegiado
  getColegiado(id:number):Observable<Colegiado>{
    return this.http.get<Colegiado>(`${this.urlEndPoint}/colegiados/${id}`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{

        //si no tiene permiso
        if(this.isNoAutorizado(e)){
          //no tiene permiso para crear
          return throwError(e);
        }

        if(e.status != 401 && e.error.Mensaje){
          this.router.navigate(['/colegiados']);
          console.log(e.error.Mensaje);
        }
        return throwError(e);
      })
    );
  }
  update(colegiado: Colegiado) : Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/colegiados/${colegiado.id}`,colegiado,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{

        if(this.isNoAutorizado(e)){
          //no tiene permiso para crear
          return throwError(e);
        }

        if(e.status == 400){
          return throwError(e);
        }
        if(e.error.Mensaje){
          console.log(e.error.Mensaje);
        }
        return throwError(e);
      })
    );
  }
}
