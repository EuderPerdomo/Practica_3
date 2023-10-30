import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public url: any

  constructor(
    private _http: HttpClient,
  ) {
    this.url = GLOBAL.url
  }

  login_admin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.post(this.url + 'login_admin', data, { headers: headers })
  }

  get_token() {
    return localStorage.getItem('token')
  }


  registro_repuesto_admin(data: any, file: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Authorization': token });
    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('etiquetas', JSON.stringify(data.etiquetas));
    fd.append('precio', data.precio);
    fd.append('precio_dolar', data.precio_dolar);
    fd.append('peso', data.peso);
    fd.append('sku', data.sku);
    fd.append('descripcion', data.descripcion);
    fd.append('contenido', data.contenido);
    fd.append('categoria', data.categoria);
    fd.append('visibilidad', data.visibilidad);
    fd.append('tallas_str', '');
    fd.append('portada', file);
    fd.append('tipo', data.tipo);
    return this._http.post(this.url + 'registro_repuesto_admin', fd, { headers: headers });
  }

  obtener_config_public(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(this.url + 'obtener_config_public', { headers: headers })
  }


  verificar_token(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this._http.get(this.url + 'verificar_token', { headers: headers });
  }


  consultar_bodegas_autorizadas_admin(id:any,token:any):Observable<any> {
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token})
    return this._http.get(this.url+'consultar_bodegas_autorizadas_admin/'+id,{headers:headers})
   }

   consultar_repuesto_autorizados_admin(id:any,token:any):Observable<any> {
    let headers=new HttpHeaders({'Content-Type':'application/json','Authorization':token})
    return this._http.get(this.url+'consultar_bodegas_autorizadas_admin/'+id,{headers:headers})
   }

  public isAuthenticated(allowRoles: string[]): boolean {
    const token: any = localStorage.getItem('token')

    if (!token) {
      return false
    }
    try {
      const helper = new JwtHelperService()
      var decodeToken = helper.decodeToken(token)

      if (!decodeToken) {
        localStorage.removeItem('token')
        return false
      }

    } catch (error) {
      localStorage.removeItem('token')
      return false
    }
    console.log('token decodificado:',decodeToken)
    return allowRoles.includes(decodeToken['role'])
  }

}
