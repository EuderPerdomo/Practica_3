import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTinymceModule } from 'ngx-tinymce';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

import { FormsModule } from '@angular/forms';
import {HttpClient,HttpClientModule} from '@angular/common/http'
import { routing } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IndexRepuestoComponent } from './components/repuestos/index-repuesto/index-repuesto.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateRepuestoComponent } from './components/repuestos/create-repuesto/create-repuesto.component';
//import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EditRepuestoComponent } from './components/repuestos/edit-repuesto/edit-repuesto.component';
import { CreateBodegaComponent } from './components/administracion/bodega/create-bodega/create-bodega.component';
import { IndexBodegaComponent } from './components/administracion/bodega/index-bodega/index-bodega.component';
import { EditBodegaComponent } from './components/administracion/bodega/edit-bodega/edit-bodega.component';
import { IndexGarantiaComponent } from './components/garantias/index-garantia/index-garantia.component';
import { CreateGarantiaComponent } from './components/garantias/create-garantia/create-garantia.component';
import { TrasladoRepuestoComponent } from './components/repuestos/traslado-repuesto/traslado-repuesto.component';
import { GestionGarantiaComponent } from './components/garantias/gestion-garantia/gestion-garantia.component';
import { UsuarioComponent } from './components/administracion/usuario/usuario.component';
import { CreateUsuarioComponent } from './components/administracion/usuario/create-usuario/create-usuario.component';
import { GestionTrasladoRepuestoComponent } from './components/repuestos/gestion-traslado-repuesto/gestion-traslado-repuesto.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    IndexRepuestoComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent,
    CreateRepuestoComponent,
    EditRepuestoComponent,
    CreateBodegaComponent,
    IndexBodegaComponent,
    EditBodegaComponent,
    IndexGarantiaComponent,
    CreateGarantiaComponent,
    TrasladoRepuestoComponent,
    GestionGarantiaComponent,
    UsuarioComponent,
    CreateUsuarioComponent,
    GestionTrasladoRepuestoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //HttpClient,
    HttpClientModule,
    routing,
    NgbPaginationModule,
    NgxTinymceModule.forRoot({baseURL:'../../../assets/tinymce/'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
