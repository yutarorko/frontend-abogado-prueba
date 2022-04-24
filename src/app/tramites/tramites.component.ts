import { Component, OnInit } from '@angular/core';
import { Tramite } from '../facturas/models/tramite';
import { TramiteService } from './services/tramite.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {

  tramites: Tramite[] = [];

  constructor(
    public tramiteService:TramiteService,
    public authService:AuthService,
  ) { }

  ngOnInit(): void {
    this.tramiteService.getTramites().subscribe(
      (tramites) =>{
        this.tramites = tramites;
      }
    )
  }

}
