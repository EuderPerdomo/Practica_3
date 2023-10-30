import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { RepuestoService } from 'src/app/services/repuesto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery:any
declare var $:any

@Component({
  selector: 'app-edit-repuesto',
  templateUrl: './edit-repuesto.component.html',
  styleUrls: ['./edit-repuesto.component.css']
})
export class EditRepuestoComponent implements OnInit {

  public repuesto: any={}
  public config:any={}
  public imgSelected :any | ArrayBuffer
  public load_btn=false
  public id:any
  public token:any
  public url:any
  public file: File = undefined!
  public config_global:any={}


  constructor(
    private _route:ActivatedRoute,
    private _repuestoService:RepuestoService,
    private _router:Router,
    private _adminService:AdminService
  ) { 
    this.token=localStorage.getItem('token')
    this.url=GLOBAL.url
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id=params['id']
      this._repuestoService.obtener_repuesto_admin(this.id,this.token).subscribe(
        response=>{
          if(response.data==undefined){           
            this.repuesto=undefined
          }else{
            this.repuesto=response.data
            console.log(this.repuesto)
            this.imgSelected=this.url+'obtener_portada/'+this.repuesto.label
          }
        },
        error=>{console.log(error)}
      )
    }
      

    )
  }

  actualizar(actualizarForm:any){

  }

  fileChangeEvent(event:any){
    var file:any
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0]
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'No hay una imagen'
      })
      
      $('#input-portada').text('Seleccionar imagen')
      this.imgSelected='../../../../assets/img/01.jpg'
      this.file=undefined!
    }
  
    if(file.size <= 4000000){
      if(file.type=='image/png' || file.type=='image/webp' || file.type=='image/jpg' || file.type=='image/gif' || file.type=='image/jpeg'){
      const reader = new FileReader()
      reader.onload = e =>this.imgSelected=reader.result
      reader.readAsDataURL(file)
  
      $('#input-portada').text(file.name)
  
      this.file =file
      }else{
        iziToast.show({
          title: 'Error',
          titleColor: 'red',
          class: 'text-danger',
          position: 'topRight',
          message: 'Formato de imagen o archivo invalido'          
        })
  
        $('#input-portada').text('Seleccionar imagen')
        this.imgSelected='../../../../assets/img/01.jpg'
        this.file=undefined!
      }
    }else{
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB'
      })
      $('#input-portada').text('Seleccionar imagen')
      this.imgSelected='../../../../assets/img/01.jpg'
      this.file=undefined!
    }
  console.log(this.file)
  }



}
