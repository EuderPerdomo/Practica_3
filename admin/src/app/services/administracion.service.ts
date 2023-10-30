import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  public url
  constructor(private _http:HttpClient) { this.url=GLOBAL.url}

  registro_bodega_admin(data:any,token:any):Observable<any> {
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token})
    console.log(this.url+'registro_bodega_admin/',data,{headers:headers}, token)
    return this._http.post(this.url+'registro_bodega_admin/',data,{headers:headers})
   }

   listar_bodegas_admin(token:any):Observable<any> {
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token})
    return this._http.get(this.url+'listar_bodegas_admin/',{headers:headers})
   }

   obtener_bodega_admin(id:any,token:any):Observable<any> {
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token})
    return this._http.get(this.url+ '/obtener_bodega_admin/'+id,{headers:headers})
   }

   actualizar_bodega_admin(id:any,data:any,token:any):Observable<any> {
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token})
    return this._http.put(this.url+'actualizar_bodega_admin/'+id,data,{headers:headers})
   }

   eliminar_bodega_admin(id:any,token:any):Observable<any> {
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token})
    return this._http.delete(this.url+'eliminar_bodega_admin/'+id,{headers:headers})
   }


   //USUARIOS ++++++++++++++++++++++++++
   listar_usuarios_admin(token:any):Observable<any> {
    console.log('buscar usuarios')
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token})
    return this._http.get(this.url+'listar_usuarios_admin/',{headers:headers})
   }

registro_usuario_admin(data:any,token:any):Observable<any>{
  let headers= new HttpHeaders({'Content-Type':'application/json','Authorization':token})
  return this._http.post(this.url+'registro_usuario_admin',data,{headers:headers})
}

//Roles +++++++++++++++++++++++++++++++++++++++
   listar_roles_admin(token:any):Observable<any> {
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token})
    return this._http.get(this.url+'listar_roles_admin/',{headers:headers})
   }
}
