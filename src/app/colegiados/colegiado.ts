import { Habilidad } from './habilidad';
import { Universidad } from './universidad';
import { Factura } from '../facturas/models/factura';
export class Colegiado {
    id:number;
    colegiatura:string;
    apellido:string;
    nombre:string;
    dni:string;
    nacimiento:string;
    departamento:string;
    provincia:string;
    distrito:string;
    domicilio:string;
    trabajo:string;

    universidad: Universidad;

    telefono:string;
    correo:string;

    habilidad:Habilidad;

    fechaFallecimiento:string;
    lm:string;
    sexo:string;
    fechaColegiatura:string;

    facturas:Factura[]=[];
}