import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';


declare var jQuery:any
declare var iziToast:any;
declare var $:any

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {
public cliente:any={
  tipo:''
}
public token

  constructor(
    private _clienteService:ClienteService,
    private _adminService:AdminService,
    private _router:Router
  ) {
    this.token=this._adminService.get_token()
   }

  ngOnInit(): void {
  }

  registro(registroForm:any){
if(registroForm.valid){
this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe(
  response=>{
    iziToast.show({
      title: 'OK',
      titleColor: 'green',
      color: '#1DC74C',
      class: 'text-succes',
      position: 'topRight',
      message: "Cliente registrado correctamente"
  });
  this.cliente={
    nombre:'',
    email:'',
    telefono:'',
    direccion:'',
    dni:'',
    tipo:''
  }
  this._router.navigate(['/panel/clientes'])
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

}
