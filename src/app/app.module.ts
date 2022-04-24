import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//PAra consumir peticiones http
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';

import { SharedModule } from './shared/shared.module';
import { ColegiadosComponent } from './colegiados/colegiados.component';
import { RouterModule, Routes } from '@angular/router';
import { TramitesComponent } from './tramites/tramites.component';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UniversidadesComponent } from './universidades/universidades.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './colegiados/form.component';
import { DetalleComponent } from './colegiados/detalle/detalle.component';
import { FacturasComponent } from './facturas/facturas.component';
import { CuotasComponent } from './facturas/cuotas.component';
import { DetalleFacturaComponent } from './facturas/detalle-factura.component';
import { FormTramiteComponent } from './tramites/form-tramite.component';
import { LoginComponent } from './usuarios/login.component';

registerLocaleData(localeES,'es');

const routes: Routes = [
  {path:'',redirectTo: '/login',pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'colegiados', component:ColegiadosComponent},
  {path: 'universidades',component:UniversidadesComponent},
  {path: 'colegiados/detalle/:id',component:DetalleComponent},
  {path: 'colegiados/form',component:FormComponent},
  {path: 'colegiados/form/:id',component:FormComponent},
  {path: 'facturas/form/:colegiadoId',component:FacturasComponent},
  {path: 'cuotas/form/:colegiadoId',component:CuotasComponent},
  {path: 'facturas/:id',component:DetalleFacturaComponent},
  {path: 'tramites',component:TramitesComponent},
  {path: 'tramites/form',component:FormTramiteComponent},
  {path: 'tramites/form/:id',component:FormTramiteComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ColegiadosComponent,
    TramitesComponent,
    UniversidadesComponent,
    FormComponent,
    DetalleComponent,
    FacturasComponent,
    CuotasComponent,
    DetalleFacturaComponent,
    FormTramiteComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    PrimeNgModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: LOCALE_ID,useValue: 'es'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
