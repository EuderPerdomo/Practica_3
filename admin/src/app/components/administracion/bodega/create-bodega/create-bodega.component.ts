import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AdministracionService } from 'src/app/services/administracion.service';

declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery:any
declare var $:any

@Component({
  selector: 'app-create-bodega',
  templateUrl: './create-bodega.component.html',
  styleUrls: ['./create-bodega.component.css']
})
export class CreateBodegaComponent implements OnInit {

  public bodega: any = {}
  public file: File = undefined!
  public config:any={}
  public token:any
  public load_btn=false

  public config_global:any={}

  constructor(
    private _administracionService : AdministracionService,
    private _adminService :AdminService,
    private _router:Router,
  ) {
    this.token = this._adminService.get_token()
   }

  ngOnInit(): void {
  }

  registro(registroForm: any) {

    if (registroForm.valid) {

      console.log(this.bodega)
      this.load_btn=true
      this._administracionService.registro_bodega_admin(this.bodega,this.token).subscribe(
        response=>{
          iziToast.show({
            title:'SUCCESS',
            titleColor:'#00CF61',
            class:'text-susscess',
            position:'topRight',
            message:'Bodega registrada correctamente'
          })
          this.load_btn=false
          this._router.navigate(['/panel/bodegas'])
        },
        error=>{
          this.load_btn=false
          console.log(error)
        }
      )

    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'Complete el formulario'
      })
      this.load_btn=true
    }
  }

}
