import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/services/administracion.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery: any
declare var $: any

@Component({
  selector: 'app-index-dispositivo',
  templateUrl: './index-dispositivo.component.html',
  styleUrls: ['./index-dispositivo.component.css']
})
export class IndexDispositivoComponent implements OnInit {

  public token = localStorage.getItem('token');
 // public load = false;
  public dispositivo_const: Array<any> = [];
  public dispositivos: Array<any> = [];

  public load_data = true
  public filtro = ''

  public repuesto: Array<any> = []
  public arr_dispositivos: Array<any> = []
  public arr_dispositivos_inventario: Array<any> = []
  public url: any
  public page = 1
  public pageSize = 5
  public load_btn = false


  //Filtros
  public filtro_modelo = ''
  public filtro_correo = ''




  constructor(
    private _administracionService:AdministracionService
  ) { }

  ngOnInit(): void {
    this.init_data()
  }


  init_data() {
    this._administracionService.listar_dispositivos_admin(null,null,this.token).subscribe(
      response => {
        this.dispositivos = response.data
console.log(this.dispositivos)
        this.dispositivos.forEach(element => {
          this.arr_dispositivos.push({
            modelo: element.modelo
          })
        })
        console.log('arreglo de repuestos a exportar', this.arr_dispositivos)

        this.load_data = false
        this.url = GLOBAL.url
      },
      error => {
        console.log(error)
      }
    )
  }

  eliminar(id: any) {
    /*
    this.load_btn = true
    this._administracionService.eliminar_repuesto_admin(id, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#00CF61',
          class: 'text-success',
          position: 'topRight',
          message: 'Producto Eliminado Correctamente'
        })
        $('#delete-' + id).modal('hide')
        $('.modal-backdrop').removeClass('show')
        this.load_btn = false
        this.init_data()
      },
      error => {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#00CF61',
          class: 'text-success',
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        })

        console.log(error)
        this.load_btn = false
      }

    )
*/
  }


}
