import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { AuthService } from '../../usuarios/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {


  items: MenuItem[]=[];

  constructor(public authService:AuthService,private router:Router) { }

  logout():void{
    Swal.fire('Éxito en cerrar sesión',`Hasta luego ${this.authService.usuario.nombre} ${this.authService.usuario.apellido}, has cerrado sesión con éxito!`,'success');
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.items=[
      {
          label:'Colegiados',
          icon:'pi pi-fw pi-users',
          routerLink: '/colegiados',
          visible: this.authService.hasRole('ROLE_USER')
      },
      {
        label:'Tramites',
        icon:'pi pi-fw pi-shopping-bag',
        routerLink: '/tramites',
        visible: this.authService.hasRole('ROLE_USER')
    },
      {
        label:'Universidades',
        icon:'pi pi-fw pi-building',
        routerLink: '/universidades',
        visible: this.authService.hasRole('ROLE_USER')
    },
    {
        label:'Iniciar Sesión',
        icon:'pi pi-fw pi-sign-in',
        routerLink: '/login',
        visible: !this.authService.isAuthenticated()
    },
    {
      label:'Cerrar Sesión',
      icon:'pi pi-fw pi-sign-out',
      visible: this.authService.isAuthenticated(),
      items:[
          {
              label:this.authService.usuario.nombre+' '+this.authService.usuario.apellido,
              icon:'pi pi-fw pi-user'
          },
          {
              separator:true
          },
          {
              label:'Cerrar Sesión',
              icon:'pi pi-fw pi-sign-out',
              command: ()=> this.logout()
          }
      ]
  },
  ];
  }

}
