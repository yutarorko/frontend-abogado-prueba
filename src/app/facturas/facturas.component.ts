import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { Observable } from 'rxjs';
import { flatMap, map,startWith } from 'rxjs/operators';
import { Tramite } from './models/tramite';
import { Factura } from './models/factura';
import { ColegiadoService } from '../colegiados/colegiado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaService } from './services/factura.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from './models/item-factura';
import Swal from 'sweetalert2';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  providers: [MessageService]
})
export class FacturasComponent implements OnInit {

  autocompleteControl = new FormControl();
  tramitesFiltrados: Observable<Tramite[]>;

  factura:Factura = new Factura();

  tiposPagos = [{nombre:"efectivo"},{nombre:"deposito"}];

  constructor(
    private primengConfig: PrimeNGConfig,
    public colegiadoService: ColegiadoService,
    private activatedRoute:ActivatedRoute,
    public facturaService:FacturaService,
    private router:Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    
    this.activatedRoute.paramMap.subscribe(params =>{
      let colegiadoId = +params.get('colegiadoId')!;
      this.colegiadoService.getColegiado(colegiadoId).subscribe(colegiado => this.factura.colegiado = colegiado);

      //cargar filtro
      this.tramitesFiltrados = this.autocompleteControl.valueChanges.pipe(
        map(value => typeof value === "string"? value:value.nombre),
        flatMap(value => value ? this._filter(value):[])
      );

    });
  }
  //material
  private _filter(value: string): Observable<Tramite[]>{
    const filterValue = value.toLowerCase();
    return this.facturaService.filtrarTramites(filterValue);
  }
  //mostrar nombre del autocomplete
  mostrarNombre(tramite:Tramite):string{
    return tramite.nombre!;
  }
  //seleccionado por autocomplete
  seleccionarTramite(event:MatAutocompleteSelectedEvent):void{
    let tramite = event.option.value as Tramite;
    //console.log(tramite);
    
    //evitar agregar 2 veces
    if(this.existeItem(tramite.id)){
      this.incrementarCantidad(tramite.id);
    }
    //creamos linea item
    else{
      let nuevoItem = new ItemFactura();
      nuevoItem.tramite = tramite;
      this.factura.items.push(nuevoItem);
    }
    //autocomplete limpiar
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  //Recalcular cantidad
  actualizarCantidad(id:number, event:any):void{
    let cantidad:number = event.target.value as number;

    if(cantidad==0){
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item:ItemFactura)=>{
      if(id === item.tramite.id){
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  //verificar si existe ya el tramite
  existeItem(id:number):boolean{
    let existe = false;
    this.factura.items.forEach((item:ItemFactura)=>{
      if(id === item.tramite.id){
        existe = true;
      }
    });
    return existe;
  }
  //Incrementar cantidad a un producto
  incrementarCantidad(id:number):void{
    this.factura.items = this.factura.items.map((item:ItemFactura)=>{
      if(id === item.tramite.id){
        ++item.cantidad;
      }
      return item;
    });
  }
  //eliminar un item factura
  eliminarItemFactura(id:number):void{
    this.factura.items = this.factura.items.filter((item:ItemFactura)=>id !== item.tramite.id);
  }
  //Guardar factura
  create():void{
    if(this.factura.serie && this.factura.numeroBoleta && this.factura.formaPago){
      this.factura.cuota = "no";
      this.facturaService.create(this.factura).subscribe(factura =>{
        Swal.fire('Nueva boleta creada',`Boleta de pago del colegiado ${factura.colegiado.nombre} ${factura.colegiado.apellido}, creada con éxito!`,'success');
        this.router.navigate(['/colegiados']);
      });
    }
    else{
      this.showError();
    }
  }
  //Validacion
  showError() {
    if(!this.factura.serie){
      this.messageService.add({severity:'warn', summary: 'Error: Complete datos', detail: 'El número de serie es obligatorio, por favor complete.'});
    }
    if(!this.factura.numeroBoleta){
      this.messageService.add({severity:'warn', summary: 'Error: Complete datos', detail: 'El número de boleta es obligatorio, por favor complete.'});
    }
    if(!this.factura.formaPago){
      this.messageService.add({severity:'warn', summary: 'Error: Complete datos', detail: 'Por favor elija el metodo de pago.'});
    }
    
  }
}
