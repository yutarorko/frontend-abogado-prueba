import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Habilidad } from '../colegiados/habilidad';
import { AuthService } from '../usuarios/auth.service';
import Swal from 'sweetalert2';
import { URL_BACKEND } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  private urlEndPoint:string= URL_BACKEND + "/api/colegiados";
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

  getHabilidades():Observable<Habilidad[]>{
    return this.http.get<Habilidad[]>(this.urlEndPoint+`/habilidades`,{headers:this.agregarAuthorizationHeader()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }
}
