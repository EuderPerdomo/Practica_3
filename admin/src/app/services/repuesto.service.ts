import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepuestoService {
  public url: any

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url
  }


  registro_repuesto_admin(data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token })
    const fd = new FormData()
    // fd.append('_id',data._id)
    fd.append('modelo', data.modelo)
    fd.append('tipo', data.tipo)
    fd.append('descripcion', data.descripcion)
    fd.append('fabricante', data.fabricante)
    fd.append('bodega', data.bodega)
    fd.append('label', file)
    return this._http.post(this.url + 'registro_repuesto_admin/', fd, { headers: headers })
  }


  actualizar_repuesto_admin(data: any, id:any, token: any): Observable<any> {
    console.log('datos de actualizacion',data)
    console.log('token:',token)
    if (data.label) {
      let headers = new HttpHeaders({ 'Authorization': token });
      const fd = new FormData();
      fd.append('modelo', data.modelo)
      fd.append('fabricante', data.fabricante)
      fd.append('tipo', data.tipo)
      fd.append('descripcion', data.descripcion)
      fd.append('label', data.label)
      console.log('metodo uno')
      return this._http.put(this.url + 'actualizar_repuesto_admin/'+id,fd, { headers: headers });
    } else {
      console.log('metodo dos')
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
      return this._http.put(this.url + 'actualizar_repuesto_admin/'+id, data, { headers: headers });
    }
  }

  listar_repuestos_admin(tipo:any, filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    //return this._http.get(this.url + 'listar_repuestos_admin/' + filtro, { headers: headers });
    return this._http.get(this.url+'listar_repuestos_admin/'+tipo+'/'+filtro,{headers:headers})
  }

  inventario_repuesto_admin(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'inventario_repuesto_admin/', { headers: headers });
  }




  obtener_repuesto_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + '/obtener_repuesto_admin/' + id, { headers: headers })
  }

  obtener_existencia_repuesto_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.get(this.url + '/obtener_existencia_repuesto_admin/' + id, { headers: headers })
  }

  eliminar_repuesto_admin(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this._http.delete(this.url + 'eliminar_repuesto_admin/' + id, { headers: headers })
  }

  //Traslados repuestos

  traslado_repuesto_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token })
    const fd = new FormData()
    fd.append('id_tecnico', data.id_tecnico)
    fd.append('destino', data.destino)
    fd.append('origen', data.origen)
    fd.append('repuesto', data.repuesto)
    fd.append('cantidad', data.cantidad)
    console.log('servicio:', fd, data)
    return this._http.post(this.url + 'traslado_repuesto_admin/', data, { headers: headers })
  }

/*
  agregarr_inventario_repuesto_admin(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token })
    const fd = new FormData()
    fd.append('destino', data.destino)
    fd.append('repuesto', data.repuesto)
    fd.append('cantidad', data.cantidad)
    return this._http.post(this.url + 'agregar_inventario_repuesto_admin/', data, { headers: headers })
  }
*/
  agregar_inventario_repuesto_admin(data: any, id:any, token: any): Observable<any> {
    console.log('el id que quiero poner',id,data)
      let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
      return this._http.put(this.url + 'agregar_inventario_repuesto_admin/'+id, data, { headers: headers });
    
  }

  consultar_solicitudes_traslados_admin(filtro: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'consultar_solicitudes_traslados_admin/' + filtro, { headers: headers });
  }

  actualizar_estado_traslado_admin(id: any, estado: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.put(this.url + 'actualizar_estado_traslado_admin/' + id, estado, { headers: headers })
  }
}
