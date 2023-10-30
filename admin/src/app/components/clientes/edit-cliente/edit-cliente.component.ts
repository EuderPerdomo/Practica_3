import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';


declare var jQuery:any
declare var iziToast:any;
declare var $:any

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit {

  public cliente:any={}
  public id:any
  public token:any
  constructor(
    private _route:ActivatedRoute,
    private _clienteService:ClienteService,
    private _adminService:AdminService,
    private _router:Router
  ) { 
    this.token=this._adminService.get_token()
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id=params['id']
this._clienteService.obtener_cliente_admin(this.id,this.token).subscribe(
  response=>{
if(response.data==undefined){
this.cliente=undefined
}else{
  console.log(response.data)
  this.cliente=response.data
}
  },
  error=>{

  }
)
      }
    )
  }

  actualizar(updateForm:any){
if(updateForm.valid){
this._clienteService.actualizar_cliente_admin(this.id,this.cliente,this.token).subscribe(
  response=>{
    iziToast.show({
      title: 'OK',
      titleColor: 'green',
      color: '#1DC74C',
      class: 'text-succes',
      position: 'topRight',
      message: "Cliente Actualizado correctamente"
  });
  this._router.navigate(['/panel/clientes'])
  },
  error=>{

  }
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

}
