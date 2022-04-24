import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Universidad } from './universidad';
import { Habilidad } from './habilidad';
import { UniversidadService } from '../universidades/universidad.service';
import { HabilidadService } from '../habilidades/habilidad.service';
import { Colegiado } from './colegiado';
import { ColegiadoService } from './colegiado.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  providers: [MessageService]
})
export class FormComponent implements OnInit {

  public colegiado:Colegiado = new Colegiado();
  public errores: string[];

  tiposSexo = [{nombre:"femenino"},{nombre:"masculino"}];

  fechaNacimiento: Date;
  fechaColegiatura: Date;

  universidades: Universidad[];
  selectedUniversidad : Universidad;

  habilidades :Habilidad[];
  selectedHabilidad: Habilidad;

  nroColegiatura:string;

  constructor(
    private primengConfig: PrimeNGConfig,
    public universidadService :UniversidadService,
    public habilidadService : HabilidadService,
    public colegiadoService : ColegiadoService,
    private router:Router,
    private messageService: MessageService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    this.cargarColegiado();

    this.universidadService.getUniversidades().subscribe(
      (response) => {
        this.universidades = response;
      }
    );

    this.habilidadService.getHabilidades().subscribe(
      (response) => {
        this.habilidades = response;
      }
    );

  }

  cargarColegiado():void{
    this.activatedRouter.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          this.colegiadoService.getColegiado(id).subscribe(
            (colegiado) => this.colegiado = colegiado
          )
        }
        else{
          this.colegiadoService.getUltimoColegiado().subscribe(
            (colegiado) => this.colegiado.colegiatura =  (+(colegiado.colegiatura) + 1).toString()
          )
        }
      }
    );
  }

  create():void{
    this.colegiadoService.create(this.colegiado).subscribe(
      colegiado =>{
        this.router.navigate(['/colegiados']);
        Swal.fire("Nuevo colegiado", `El colegiado : ${colegiado.nombre} ${colegiado.apellido} ha sido registrado con éxito!!`,'success');
      },
      err => {
        this.errores = err.error.Errors as string[];
        this.messageService.clear();
        this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Error al registrar colegiado', detail:this.errores.toString()});
        console.error('Error desde el backend :', +err.status);
        console.error(err.error.Errors);
      }
    );
  }
  update():void{
    //this.colegiado.facturas = null;
    //this.colegiado.resoluciones=null;
    this.colegiadoService.update(this.colegiado).subscribe(
      json => {
        this.router.navigate(['/colegiados']);
        Swal.fire('Colegiado Actualizado',`${json.Mensaje}: ${json.Colegiado.nombre} ${json.Colegiado.apellido}`,'success');
      }
    )

  }

  //Toast
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
  }
  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
      this.messageService.clear('c');
  }
}
