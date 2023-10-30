import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AdministracionService } from 'src/app/services/administracion.service';
import { RepuestoService } from 'src/app/services/repuesto.service';



declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery:any
declare var $:any

@Component({
  selector: 'app-traslado-repuesto',
  templateUrl: './traslado-repuesto.component.html',
  styleUrls: ['./traslado-repuesto.component.css']
})
export class TrasladoRepuestoComponent implements OnInit {
//Iniciar editar
  public token = localStorage.getItem('token');
  public _id = localStorage.getItem('_id');
  public load = false;
  public repuestos_const  :Array<any>= [];
  public repuestos :Array<any>= [];


public load_data=true
public filtro=''

public repuesto: Array<any>=[]
public arr_repuestos: Array<any>=[]
public url:any
public page=1
public pageSize=10
public load_btn=false



//Editar

public id:any
public existencias: any={}

public bodegas :Array<any>= [];
public bodega_destino :any
public bodega_origen :any
public cantidad_traslado :any
public cantidad_existencia :any
public id_repuesto_traslado:any

//TO DO
// En que bodegas esta el repuesto
//Esta solo en la bodega principal
//Esta en diferentes bodegas




  constructor(
    private _route:ActivatedRoute,
    private _repuestoService:RepuestoService,
    private _router:Router,
    private _administracionService:AdministracionService,
  ) { }

  ngOnInit(): void {
this.init_data()
this.listar_Bodegas()
  }


  init_data(){
    this._route.params.subscribe(
      params=>{
        this.id=params['id']
      this._repuestoService.obtener_existencia_repuesto_admin(this.id,this.token).subscribe(
        response=>{
          if(response.data==undefined){           
            this.existencias=undefined
          }else{
            this.repuestos=response.data
            console.log('Repuestos',this.repuestos)
            this.load_data=false
            //this.imgSelected=this.url+'obtener_portada/'+this.repuesto.label
          }
        },
        error=>{console.log(error)}
      )
    }
      

    )
  }


  listar_Bodegas(){
    this._administracionService.listar_bodegas_admin(this.token).subscribe(
      response=>{
this.bodegas=response.data
this.load_data=false
console.log(this.bodegas)
      },
      error=>{
console.log(error)
      }
    )
  }


  trasladar(item:any){
    console.log('click',item)
this.id_repuesto_traslado=item.repuestos.repuesto
this.bodega_origen=item._id
this.cantidad_existencia=item.repuestos.cantidad

console.log('Bodega de origen',this.bodega_origen,item)

if((this.bodega_origen!=undefined) &&( this.cantidad_traslado!=undefined)){
console.log('validados',this.repuestos[0].repuesto._id)
}
  }

  confirmar_traslado(){
const data={
id_tecnico:this._id,
id_origen:this.bodega_origen,//Id de origeen
id_destino:this.bodega_destino,//Id destino
id_repuesto:this.id_repuesto_traslado,//Id de repuesto
cantidad_traslado:this.cantidad_traslado,//Cantidad a trasladar
}

this._repuestoService.traslado_repuesto_admin(data,this.token).subscribe(
  response=>{
    console.log(response)
    iziToast.show({
      title:'SUCCESS',
      titleColor:'#00CF61',
      class:'text-susscess',
      position:'topRight',
      message:response.message
    })
    this.bodega_destino=''
    this.cantidad_traslado=0
    $('.modal').modal('hide')
    this.init_data()
  },

  error=>{
    console.log(error)
    iziToast.show({
      title: 'Error',
      titleColor: 'red',
      class: 'text-danger',
      position: 'topRight',
      message: 'Error al realizar el Traslado'
    })
  }
)

//this._repuestoService.traslado_repuesto_admin()
  }


  crear_traslado(registroFormTraslado:any){
if(registroFormTraslado.valid){

}else {
  iziToast.show({
    title: 'Error',
    titleColor: 'red',
    class: 'text-danger',
    position: 'topRight',
    message: 'Complete el formulario'
  })
}

  }

  validar_bodega():boolean {
    if((this.bodega_destino != this.bodega_origen)) {
                 return true;
    }
     else { 
        return false;
    } 
}

  validar_cantidad():boolean {
    if(parseInt(this.cantidad_traslado) <= parseInt(this.cantidad_existencia)) {
            return true;
    }
     else { 
        return false;
    } 
}

}
