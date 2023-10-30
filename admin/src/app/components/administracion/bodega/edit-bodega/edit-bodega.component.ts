import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AdministracionService } from 'src/app/services/administracion.service';


declare var jQuery:any
declare var iziToast:any;
declare var $:any


@Component({
  selector: 'app-edit-bodega',
  templateUrl: './edit-bodega.component.html',
  styleUrls: ['./edit-bodega.component.css']
})
export class EditBodegaComponent implements OnInit {

  public bodega:any={}
  public id:any
  public token:any
  constructor(
    private _route:ActivatedRoute,
    private _administracionService:AdministracionService,
    private _adminService:AdminService,
    private _router:Router,
  ) { 
    this.token=this._adminService.get_token()
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id=params['id']
this._administracionService.obtener_bodega_admin(this.id,this.token).subscribe(
  response=>{
if(response.data==undefined){
this.bodega=undefined
}else{
  console.log(response.data)
  this.bodega=response.data
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
    this._administracionService.actualizar_bodega_admin(this.id,this.bodega,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'OK',
          titleColor: 'green',
          color: '#1DC74C',
          class: 'text-succes',
          position: 'topRight',
          message: "Bodega Actualizada correctamente"
      });
      this._router.navigate(['/panel/bodegas'])
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
