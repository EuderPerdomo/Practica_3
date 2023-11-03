import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GarantiaService {
  public url: any

  constructor(
    private _http:HttpClient
  ) {
    this.url=GLOBAL.url
   }


  registro_garantia_admin(data:any,file:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Authorization':token});
    const fd = new FormData();

    fd.append('modelo',data.modelo);
    fd.append('serial',data.serial);
    fd.append('observaciones_ingreso',data.observaciones);
    fd.append('diagnostico_cliente',data.diagnostico_cliente);
    fd.append('oficina',data.oficina);
    fd.append('numero_factura',data.numero_factura);
    fd.append('fecha_factura',data.fecha_factura);
    fd.append('cliente',data.cliente);
    fd.append('label',file);
    console.log(data,'Datos enviados desde el servicio',fd)
    return this._http.post(this.url+'registro_garantia_admin',fd,{headers:headers});
  }


  actualizar_garantia_admin(data: any, id:any, token: any): Observable<any> {
    console.log('datos de actualizacion',data)
    console.log('token:',token)
    if (data.label) {
      let headers = new HttpHeaders({ 'Authorization': token });
      const fd = new FormData();
    fd.append('modelo',data.modelo);
    fd.append('serial',data.serial);
    fd.append('observaciones_ingreso',data.observaciones);
    fd.append('diagnostico_cliente',data.diagnostico_cliente);
    fd.append('oficina',data.oficina);
    fd.append('numero_factura',data.numero_factura);
    fd.append('fecha_factura',data.fecha_factura);
    fd.append('cliente',data.cliente);
    fd.append('label',data.label);
      return this._http.put(this.url + 'actualizar_garantia_admin/'+id,fd, { headers: headers });
    } else {
      console.log('metodo dos')
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
      return this._http.put(this.url + 'actualizar_garantia_admin/'+id, data, { headers: headers });
    }
  }


  listar_garantias_admin(filtro: any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token});
    return this._http.get(this.url + 'listar_garantias_admin/'+filtro,{headers:headers});
  }


  obtener_garantia_admin(id:any, token:any): Observable<any> {
    console.log('servicio obtener garanitia',id)
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization':token })
    return this._http.get(this.url+'obtener_garantia_admin/'+id,{ headers: headers })
  }

/*
    agregar_observacion_garantia_admin(id:any, data:any, token:any):Observable<any>{
    let headers = new HttpHeaders({'Authorization':token});
    const fd = new FormData();
    fd.append('observacion',data.observacion);
    return this._http.put(this.url+'agregar_observacion_garantia_admin/'+id,fd,{headers:headers});
  }
*/



  agregar_observacion_garantia_admin(id:any,data:any,token:any):Observable<any> {
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token})
    return this._http.put(this.url+'agregar_observacion_garantia_admin/'+id,data,{headers:headers})
   }

   agregar_repuesto_garantia_admin(data:any,token:any):Observable<any> {
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token})
    return this._http.put(this.url+'agregar_repuesto_garantia_admin/',data,{headers:headers})
   }


}
