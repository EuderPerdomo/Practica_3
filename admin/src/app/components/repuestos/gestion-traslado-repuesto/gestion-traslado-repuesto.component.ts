import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepuestoService } from 'src/app/services/repuesto.service';


declare var jQuery:any
declare var iziToast:any;
declare var $:any

@Component({
  selector: 'app-gestion-traslado-repuesto',
  templateUrl: './gestion-traslado-repuesto.component.html',
  styleUrls: ['./gestion-traslado-repuesto.component.css']
})
export class GestionTrasladoRepuestoComponent implements OnInit {

  public token=localStorage.getItem('token')
  public filtro=''
  public load_data=true
  public traslados :Array<any>= [];

  public traslado:any={}

  //Paginacion
  public page=1
  public pageSize=10

  constructor(
    private _repuestoService:RepuestoService,
    private _router:Router
  ) { 
  }

  ngOnInit(): void {
    this.init_data()
  }



  //TO DO
  //Consultar traslados pendientes
  init_data(){
    this._repuestoService.consultar_solicitudes_traslados_admin(this.filtro,this.token).subscribe(
      response=>{
        console.log(response)
        this.traslados=response.data
        console.log(this.traslados)
        this.load_data=false
      },
      error=>{
        console.log(error)
      }
    )
  }

  //Confirmar Envio De Repuesto
cambioEstado(id:any,estado:any,origen:any,destino:any,repuesto:any,cantidad:any){

this.traslado.estado=estado
this.traslado.origen=origen
this.traslado.destino=destino
this.traslado.repuesto=repuesto
this.traslado.cantidad=cantidad

console.log(this.traslado)

  this._repuestoService.actualizar_estado_traslado_admin(id,this.traslado,this.token).subscribe(
    response=>{
      iziToast.show({
        title: 'OK',
        titleColor: 'green',
        color: '#1DC74C',
        class: 'text-succes',
        position: 'topRight',
        message: "Estado de Traslado  Actualizado correctamente"
    });
    this.init_data()
    //this._router.navigate(['/panel/repuestos/gestionTraslados'])
    },
    error=>{
  
    }
  )

console.log(estado)
$('#estadoModal-'+id).modal('hide')
$('.modal-backdrop').removeClass('show')
}
  //Confirmar Recibido




}
