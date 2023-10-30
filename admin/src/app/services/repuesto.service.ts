import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepuestoService {
  public url:any

  constructor(
    private _http:HttpClient,
  ) { 
this.url=GLOBAL.url
  }


  registro_repuesto_admin(data:any,file:any,token:any):Observable<any> {
    let headers=new HttpHeaders({'Authorization':token})
console.log('El archivo',file)
    const fd=new FormData()
   // fd.append('_id',data._id)
    fd.append('modelo',data.modelo)
    fd.append('serial',data.serial)
    fd.append('tipo',data.tipo)
    fd.append('descripcion',data.descripcion)
    fd.append('cantidad',data.cantidad)
    fd.append('bodega',data.bodega)
    fd.append('label',file)
    return this._http.post(this.url+'registro_repuesto_admin/',fd,{headers:headers})
   }

   listar_repuestos_admin(filtro: any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url + 'listar_repuestos_admin/'+filtro,{headers:headers});
  }

  obtener_repuesto_admin(id:any, token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url +'/obtener_repuesto_admin/' + id, { headers: headers })
  }

  obtener_existencia_repuesto_admin(id:any, token:any): Observable<any> {
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url +'/obtener_existencia_repuesto_admin/' + id, { headers: headers })
  }

  eliminar_repuesto_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.delete(this.url + 'eliminar_repuesto_admin/' + id, { headers: headers })
  }

  //Traslados repuestos

  traslado_repuesto_admin(data:any,token:any):Observable<any> {
    let headers=new HttpHeaders({'Authorization':token})
    const fd=new FormData()
    fd.append('id_tecnico',data.id_tecnico)
    fd.append('destino',data.destino)
    fd.append('origen',data.origen)
    fd.append('repuesto',data.repuesto)
    fd.append('cantidad',data.cantidad)
    console.log('servicio:', fd,data)
    return this._http.post(this.url+'traslado_repuesto_admin/',data,{headers:headers})
   }


   consultar_solicitudes_traslados_admin(filtro: any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url + 'consultar_solicitudes_traslados_admin/'+filtro,{headers:headers});
  }

  actualizar_estado_traslado_admin(id:any,estado:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.put(this.url+'actualizar_estado_traslado_admin/'+id,estado,{headers:headers})
  }
}
