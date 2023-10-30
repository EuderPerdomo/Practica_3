import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { RepuestoService } from 'src/app/services/repuesto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery:any
declare var $:any

@Component({
  selector: 'app-index-repuesto',
  templateUrl: './index-repuesto.component.html',
  styleUrls: ['./index-repuesto.component.css']
})
export class IndexRepuestoComponent implements OnInit {
  public token = localStorage.getItem('token');
  public load = false;
  public repuestos_const  :Array<any>= [];
  public repuestos :Array<any>= [];


public load_data=true
public filtro=''

public repuesto: Array<any>=[]
public arr_repuestos: Array<any>=[]
public url:any
public page=1
public pageSize=10
public load_btn=false

  constructor(
    private _repuestoService:RepuestoService
  ) { }

  ngOnInit(): void {
    this.init_data();
  }


  filtrar(){
    if(this.filtro){
      this.init_data()
    }else{
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese filtro de busqueda'
      })
    }
  }


  iinit_data(){
    this.load = true;
    this._repuestoService.listar_repuestos_admin(this.filtro,this.token).subscribe(
      response=>{
        this.repuestos_const = response.data;
        this.repuestos= this.repuestos_const;
        console.log('Repuestos listados Correctamente',this.repuestos)
        this.load = false;
      }
    );
  }



  init_data(){
    this._repuestoService.listar_repuestos_admin(this.filtro,this.token).subscribe(
      response=>{
        console.log('Los repuestos',response)
        this.repuestos=response.data
/*
        this.repuestos.forEach(element=>{
          this.arr_repuestos.push({
            titulo:element.titulo,
            stock:element.stock,
            precio:element.precio,
            categoria:element.categoria,
            nventas:element.nventas
          })
        })
       
        console.log(this.arr_repuestos)
         */
        this.load_data=false
        this.url=GLOBAL.url
      },
      error=>{
        console.log(error)
      }
    )
  }
  resetear(){
    this.filtro=''
    this.init_data()
  }

eliminar(id:any){
  this.load_btn=true
  this._repuestoService.eliminar_repuesto_admin(id,this.token).subscribe(
    response=>{
      iziToast.show({
        title:'SUCCESS',
        titleColor:'#00CF61',
        class:'text-success',
        position:'topRight',
        message:'Producto Eliminado Correctamente'
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

download_excel(){

}

}
