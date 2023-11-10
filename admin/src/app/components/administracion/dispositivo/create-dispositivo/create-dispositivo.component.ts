import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/services/administracion.service';
declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery:any
declare var $:any


@Component({
  selector: 'app-create-dispositivo',
  templateUrl: './create-dispositivo.component.html',
  styleUrls: ['./create-dispositivo.component.css']
})
export class CreateDispositivoComponent implements OnInit {

  public dispositivo: any = {}
  public config: any = {}
  public file: File = undefined!
  public token:any
  public load_btn=false
  public imgSelected:any | ArrayBuffer='../../../../assets/img/01.jpg'


  constructor(
    private _administracionService:AdministracionService,
  ) { 
    this.token=localStorage.getItem('token')

    this.config={
      height:500,
      content_style: "body { line-height: 1; }",
    }
  }

  ngOnInit(): void {
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

      console.log(this.file)
      this.load_btn=true
      this._administracionService.registro_dispositivo_admin(this.dispositivo,this.file,this.token).subscribe(

        response=>{
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#00CF61',
            class:'text-susscess',
            position:'topRight',
            message:'dispositivo registrado correctamente'
          })
          this.load_btn=false
          //$('#modal_cliente').modal('hide')
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
