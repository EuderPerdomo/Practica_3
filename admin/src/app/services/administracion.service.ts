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

//Dispositivos +++++++++++++++++++++++++++++++++++++++
registro_dispositivo_admin(data:any,file:any,token:any):Observable<any>{
  let headers = new HttpHeaders({'Authorization':token});
  const fd = new FormData();
  fd.append('modelo',data.modelo);
  fd.append('tipo',data.tipo);
  fd.append('fabricante',data.fabricante);
  fd.append('descripcion',data.descripcion);
  fd.append('label',file);
  console.log(data,'Datos enviados desde el servicio',fd,data,file)
  return this._http.post(this.url+'registro_dispositivo_admin/',fd,{headers:headers});
}


listar_dispositivos_admin(tipo:any, filtro: any, token: any): Observable<any> {
  let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
  return this._http.get(this.url+'listar_dispositivos_admin/'+tipo+'/'+filtro,{headers:headers})
}


}
