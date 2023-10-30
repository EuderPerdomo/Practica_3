import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministracionService } from 'src/app/services/administracion.service';

declare var jQuery:any
declare var iziToast:any;
declare var $:any

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {

  public usuario: any = {
    tipo: ''
  }
  public token: any
  public bodegas: Array<any> = [];
  public roles: Array<any> = [];
  public load_data = true


  constructor(
    private _administracionService: AdministracionService,
    private _router:Router,
  ) {
    this.token = localStorage.getItem('token')
  }

  ngOnInit(): void {
    this.listar_bodegas()
    this.listar_roles()
  }

  registro(registroForm:any){
    if(registroForm.valid){
    this._administracionService.registro_usuario_admin(this.usuario,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'OK',
          titleColor: 'green',
          color: '#1DC74C',
          class: 'text-succes',
          position: 'topRight',
          message: response.message//"Usuario registrado correctamente"
      });
      this.usuario={
        nombre:'',
        apellidos:'',
        email:'',
        telefono:'',
        dni:'',
        tipo:'',
        contrasena:'',
      }
      this._router.navigate(['/panel/usuarios'])
      },
      error=>{}
    )
    }else{
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: "Debe llenar todos los campos del formulario"
    });
    }
      }
    

  listar_bodegas() {
    this._administracionService.listar_bodegas_admin(this.token).subscribe(
      response => {
        this.bodegas = response.data
        this.load_data = false
        console.log(this.bodegas)
      },
      error => {
        console.log(error)
      }
    )
  }

  listar_roles(){
    this._administracionService.listar_roles_admin(this.token).subscribe(
      response => {
        this.roles = response.data
        this.load_data = false
        console.log(this.roles)
      },
      error => {
        console.log(error)
      }
    )
  }

}
