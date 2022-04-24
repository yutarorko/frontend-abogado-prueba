import { Component, OnInit } from '@angular/core';
import { Universidad } from '../colegiados/universidad';
import { AuthService } from '../usuarios/auth.service';
import { UniversidadService } from './universidad.service';

@Component({
  selector: 'app-universidades',
  templateUrl: './universidades.component.html',
  styleUrls: ['./universidades.component.css']
})
export class UniversidadesComponent implements OnInit {

  universidades:Universidad[]=[];

  constructor(
    public universidadService:UniversidadService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.universidadService.getUniversidades().subscribe(
      (response) =>{
        this.universidades = response;
      }
      )
  }

}
