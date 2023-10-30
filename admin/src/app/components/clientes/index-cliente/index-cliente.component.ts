import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var jQuery:any
declare var iziToast:any;
declare var $:any

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes:Array<any>=[]
  public filtro_nombre=''
  public filtro_correo=''
  public load_data=true

  public page=1
  public pageSize=20
  public token:any




  constructor(
    private _clienteService:ClienteService,
    private _adminService:AdminService
  ) { 
    this.token= _adminService.get_token()
  }

  ngOnInit(): void {
    this.init_data()

  }



  init_data(){
    this._clienteService.listar_clientes_filtro_admin(null,null,this.token).subscribe(
      response=>{

this.clientes=response.data
this.load_data=false
      },
      error=>{
console.log(error)
      }
    )
  }


  filtro(tipo:any){
    console.log(tipo)
    if(tipo=="nombre"){
      if(this.filtro_nombre){
        console.log(this.filtro_nombre)
        this.load_data=true
        this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_nombre,this.token).subscribe(
          response=>{
        
        this.clientes=response.data 
        this.load_data=false       
          },
          error=>{
        console.log(error)
          }
        )
      }else{
        this.init_data()
      }
    }else if(tipo=="correo"){
if(this.filtro_correo){
  this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_correo,this.token).subscribe(
    response=>{
  
  this.clientes=response.data
  
    },
    error=>{
  console.log(error)
    }
  )
}else{
  this.init_data()
}
    }



  }

  eliminar(id:any){
    this._clienteService.eliminar_cliente_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'OK',
          titleColor: 'green',
          color: '#1DC74C',
          class: 'text-succes',
          position: 'topRight',
          message: "Cliente Eliminado correctamente"
      });
      $('#delete-'+id).modal('hide')
      $('.modal-backdrop').removeClass('show')

      this.init_data()
      }
    )
  }

}
