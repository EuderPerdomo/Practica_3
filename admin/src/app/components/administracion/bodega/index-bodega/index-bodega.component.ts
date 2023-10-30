import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/services/administracion.service';


declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery:any
declare var $:any


@Component({
  selector: 'app-index-bodega',
  templateUrl: './index-bodega.component.html',
  styleUrls: ['./index-bodega.component.css']
})
export class IndexBodegaComponent implements OnInit {
  public token = localStorage.getItem('token');
  public load = false;
  public bodegas_const  :Array<any>= [];
  public bodegas :Array<any>= [];

public load_data=true
public filtro=''

public bodega: Array<any>=[]
public arr_bodegas: Array<any>=[]
public url:any
public page=1
public pageSize=10
public load_btn=false

  constructor(
    private _administracionService:AdministracionService

  ) { 
    
  }

  ngOnInit(): void {
    this.init_data()
  }

  init_data(){
    this._administracionService.listar_bodegas_admin(this.token).subscribe(
      response=>{

this.bodegas=response.data
this.load_data=false
console.log(this.bodegas)
      },
      error=>{
console.log(error)
      }
    )
  }

  eliminar(id:any){
    this.load_btn=true
    this._administracionService.eliminar_bodega_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title:'SUCCESS',
          titleColor:'#00CF61',
          class:'text-success',
          position:'topRight',
          message:'Bodega Eliminado Correctamente'
        })
        $('#delete-'+id).modal('hide')
        $('.modal-backdrop').removeClass('show')
        this.load_btn=false
        this.init_data()
      },
      error=>{
        iziToast.show({
          title:'ERROR',
          titleColor:'#00CF61',
          class:'text-success',
          position:'topRight',
          message:'Ocurrio un error en el servidor'
        })
  
        console.log(error)
        this.load_btn=false
      }
      
    )
  
  }

}
