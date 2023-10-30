import { Component, OnInit } from '@angular/core';
import { AdministracionService } from 'src/app/services/administracion.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

public token = localStorage.getItem('token');
public load = false;
public usuarios_const  :Array<any>= [];
public usuarios :Array<any>= [];


public load_data=true
public filtro=''

public usuario: Array<any>=[]
public arr_usuarios: Array<any>=[]
public url:any
public page=1
public pageSize=10
public load_btn=false


  constructor(
    private _administracionService:AdministracionService,
    ) {
    
   }

  ngOnInit(): void {
  this.init_data()
  }

  init_data(){
    this._administracionService.listar_usuarios_admin(this.token).subscribe(
      response=>{
        console.log(response)
        this.usuarios=response.data
        this.load_data=false
      },
      error=>{
        console.log(error)
      }
    )
  }

  eliminar(item:any){}

}
