import { Routes,RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { AdminGuard } from "./guards/admin.guard";
import { RootGuardGuard } from "./guards/root-guard.guard";
import { IndexRepuestoComponent } from "./components/repuestos/index-repuesto/index-repuesto.component";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";
import { CreateRepuestoComponent } from "./components/repuestos/create-repuesto/create-repuesto.component";
import { CreateBodegaComponent } from "./components/administracion/bodega/create-bodega/create-bodega.component";
import { EditRepuestoComponent } from "./components/repuestos/edit-repuesto/edit-repuesto.component";
import { IndexBodegaComponent } from "./components/administracion/bodega/index-bodega/index-bodega.component";
import { EditBodegaComponent } from "./components/administracion/bodega/edit-bodega/edit-bodega.component";
import { IndexGarantiaComponent } from "./components/garantias/index-garantia/index-garantia.component";
import { CreateGarantiaComponent } from "./components/garantias/create-garantia/create-garantia.component";
import { TrasladoRepuestoComponent } from "./components/repuestos/traslado-repuesto/traslado-repuesto.component";
import { GestionGarantiaComponent } from "./components/garantias/gestion-garantia/gestion-garantia.component";
import { UsuarioComponent } from "./components/administracion/usuario/usuario.component";
import { CreateUsuarioComponent } from "./components/administracion/usuario/create-usuario/create-usuario.component";
import { GestionTrasladoRepuestoComponent } from "./components/repuestos/gestion-traslado-repuesto/gestion-traslado-repuesto.component";

const appRoute:Routes=[
{path:'',redirectTo:'inicio',pathMatch:'full'},
{path:'inicio',component:InicioComponent,canActivate:[AdminGuard]},

{path:'panel',children:[
    {path:'clientes',component:IndexClienteComponent,canActivate:[AdminGuard]},
    {path:'clientes/registro',component:CreateClienteComponent,canActivate:[AdminGuard]},
    {path:'clientes/:id',component:EditClienteComponent,canActivate:[AdminGuard]},

    
    //Gestion Traslados repuestos
    {path:'repuestos/gestionTraslados',component:GestionTrasladoRepuestoComponent,canActivate:[AdminGuard]},


    {path:'repuestos',component:IndexRepuestoComponent,canActivate:[AdminGuard]},
    {path:'repuestos/registro',component:CreateRepuestoComponent,canActivate:[AdminGuard]},
    {path:'repuestos/:id',component:EditRepuestoComponent,canActivate:[AdminGuard]},

    //Traslados
    {path:'repuestos/traslado/:id',component:TrasladoRepuestoComponent,canActivate:[AdminGuard]},

    


    {path:'garantias',component:IndexGarantiaComponent,canActivate:[AdminGuard]},
    {path:'garantias/registro',component:CreateGarantiaComponent,canActivate:[AdminGuard]},
    {path:'garantias/gestion/:id',component:GestionGarantiaComponent,canActivate:[AdminGuard]},

    {path:'bodegas',component:IndexBodegaComponent,canActivate:[AdminGuard]},
   {path:'bodegas/registro',component:CreateBodegaComponent,canActivate:[AdminGuard]},
   {path:'bodegas/:id',component:EditBodegaComponent,canActivate:[AdminGuard]},

   //Usuarios
   {path:'usuarios',component:UsuarioComponent,canActivate:[AdminGuard]},
   {path:'usuarios/registro',component:CreateUsuarioComponent,canActivate:[AdminGuard]},
]},

{path:'login',component:LoginComponent}


]
 export const appRoutingProviders:any[]=[]
 export const routing:ModuleWithProviders<any>=RouterModule.forRoot(appRoute)