import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AdministracionService } from 'src/app/services/administracion.service';
import { RepuestoService } from 'src/app/services/repuesto.service';
import { v4 as uuidv4 } from 'uuid';


declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery:any
declare var $:any
@Component({
  selector: 'app-create-repuesto',
  templateUrl: './create-repuesto.component.html',
  styleUrls: ['./create-repuesto.component.css']
})
export class CreateRepuestoComponent implements OnInit {

  public repuesto: any = {}
  public file: File = undefined!
  public imgSelected:any | ArrayBuffer='../../../../assets/img/01.jpg'
  public config:any={}
  public token:any
  public load_btn=false

  public config_global:any={}
  public bodegas:Array<any>=[]


  constructor(
    private _repuestoService : RepuestoService,
    private _adminService : AdminService,
    private _router:Router,
    private _administracionService:AdministracionService
  ) { 
    this.config={
      height:500
    }
    this.token = this._adminService.get_token()
  }

  ngOnInit(): void {
    this.listar_Bodegas() 
  }


listar_Bodegas(){
  this._administracionService.listar_bodegas_admin(this.token).subscribe(
    response=>{

this.bodegas=response.data
console.log(this.bodegas)
    },
    error=>{
console.log(error)
    }
  )
}

  registro(registroForm: any) {
    if (registroForm.valid) {
      if(this.file==undefined){
        iziToast.show({
          title: 'Error',
          titleColor: 'red',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe elegir una imagen de portada'
        })
      }else{
        console.log(this.repuesto, 'identificador',uuidv4())
     // this.repuesto._id=uuidv4()
      console.log(this.file)
      this.load_btn=true
      this._repuestoService.registro_repuesto_admin(this.repuesto,this.file,this.token).subscribe(
        response=>{
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#00CF61',
            class:'text-susscess',
            position:'topRight',
            message:'Repuesto registrado correctamente'
          })
          this.load_btn=false
          $('#modal_cliente').modal('hide')
        },
        error=>{
          this.load_btn=false
          console.log(error)
        }
      )
      }

    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'Complete el formulario'
      })
      this.load_btn=true
      $('#input-portada').text('Seleccionar imagen')
      this.imgSelected='../../../../assets/img/01.jpg'
      this.file=undefined!
    }
  }

  fileChangeEvent(event: any): void {
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
