import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GarantiaService } from 'src/app/services/garantia.service';
import { GLOBAL } from 'src/app/services/GLOBAL';


declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery: any
declare var $: any

@Component({
  selector: 'app-gestion-garantia',
  templateUrl: './gestion-garantia.component.html',
  styleUrls: ['./gestion-garantia.component.css']
})
export class GestionGarantiaComponent implements OnInit {

  public garantia: any = {}
  //public observacion:any=''
  public observacion: any = {}
  public id: any
  public id_tecnico: any
  public token: any

  public bodegas: any = {}
  public id_bodega: any
  public id_repuesto: any
  public repuestos: any
  public cantidades_repuesto: any
  public imagen: any

  public config: any = {};

  public load_data = false
  public url: any


  public test: any = []

  public repuesto_asignar:any={}

  constructor(
    private _garantiaService: GarantiaService,
    private _route: ActivatedRoute,
    private _adminService: AdminService,
    private _router: Router


  ) {
    this.token = this._adminService.get_token(),
      this.id_tecnico = localStorage.getItem('_id')

    this.config = {
      height: 300
    }
  }

  ngOnInit(): void {
    this.obtener_garantia()
    this.consultar_bodegas_autorizadas_admin()
    this.url = GLOBAL.url
  }

  obtener_garantia() {
    this._route.params.subscribe(
      params => {
        this.id = params['id']
        console.log(this.id, this.token)
        this._garantiaService.obtener_garantia_admin(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              console.log('respuesta undefined')
              this.garantia = undefined
            } else {
              console.log(response.data)
              this.garantia = response.data
              this.load_data = true
            }
          },
          error => {
          }
        )
      }
    )
  }

  agregar_observacion_garantia_admin(registroObservacionForm: any) {
    if (registroObservacionForm.valid) {
      console.log('valido')
      this._garantiaService.agregar_observacion_garantia_admin(this.id, this.observacion, this.token).subscribe(
        response => {
          console.log(response)
          this.obtener_garantia()
          this.observacion = ''
        },
        error => { console.log('error') })
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'Agregue una observacion valida'
      })
    }
  }

  asignarRepuesto(datos: any) {
if(datos.valid){

  this.repuesto_asignar={
id_repuesto: this.repuestos[this.id_repuesto][0]._id,
id_bodega:this.bodegas[this.id_bodega]._id,
id_garantia:this.id,
  }

  this._garantiaService.agregar_repuesto_garantia_admin(this.repuesto_asignar,this.token).subscribe(
    response=>{},
    error=>{}
  )

  console.log('valido',this.repuesto_asignar)
}
  }

  buscar_repuestos() {

    console.log('posicion', this.id_bodega)
    this.repuestos = this.bodegas[this.id_bodega].repu
    console.log('acceder',this.repuestos[1][0].modelo)
    this.cantidades_repuesto = this.bodegas[this.id_bodega].cantidad
    console.log('Repuestos que pertenecen', this.repuestos, this.cantidades_repuesto)
    console.log('id_bodega',this.bodegas[this.id_bodega]._id, 'id_repuesto',this.repuestos[this.id_repuesto]._id)
  }

  buscar_imagen() {
    console.log('repuestos',this.repuestos)
    console.log(this.id_repuesto, 'id_repuesto',this.repuestos[this.id_repuesto][0]._id)
    this.imagen = this.repuestos[this.id_repuesto][0].label
  }

  organizar_valores() {

    //Nombres de las bodegas
    var valores: any = []
    console.log('organixar valoress', this.bodegas.length)

for (let i = 0; i < this.bodegas.length; i++) {
 
  const objeto = {
    'id': this.bodegas[i]._id,
    'nombre': this.bodegas[i].nombre
  }

  if (i == 0) {
    valores.push(
      { 'id': this.bodegas[i]._id, 'nombre': this.bodegas[i].nombre }
    )
  } else{
    
    if( valores.some((user:any) => user.id === this.bodegas[i]._id)){ //https://javascript.plainenglish.io/check-if-an-array-contains-an-object-with-a-certain-property-value-in-javascript-5325295a5820
      console.log('es igual')

    }else{
      valores.push(
        { 'id': this.bodegas[i]._id, 'nombre': this.bodegas[i].nombre }
      )
    }

  }
}

    console.log('valores', valores)

  }

  consultar_bodegas_autorizadas_admin() {
    this._adminService.consultar_bodegas_autorizadas_admin(this.id_tecnico, this.token).subscribe(
      response => {
        this.bodegas = response.data
        console.log('Estas son las Bodegas autorizadas', response.data)
        //this.organizar_valores()
      },
      error => { console.log('Bodegas autorizadas error', error) }
    )



  }


  // registro(registroForm: any) {
  //   if (registroForm.valid) {
  //     if(this.file==undefined){
  //       iziToast.show({
  //         title: 'Error',
  //         titleColor: 'red',
  //         class: 'text-danger',
  //         position: 'topRight',
  //         message: 'Debe elegir una imagen de portada'
  //       })
  //     }else{
  //       console.log(this.garantia)
  //     console.log(this.file)
  //     this.load_btn=true
  //     this._garantiaService.registro_garantia_admin(this.garantia,this.file,this.token).subscribe(
  //       response=>{
  //         iziToast.show({
  //           title:'SUCCESS',
  //           titleColor:'#00CF61',
  //           class:'text-susscess',
  //           position:'topRight',
  //           message:'Garantia registrada correctamente'
  //         })
  //         this.load_btn=false
  //         this._router.navigate(['/panel/garantias'])
  //       },
  //       error=>{
  //         this.load_btn=false
  //         console.log(error)
  //       }
  //     )
  //     }

  //   } else {
  //     iziToast.show({
  //       title: 'Error',
  //       titleColor: 'red',
  //       class: 'text-danger',
  //       position: 'topRight',
  //       message: 'Complete el formulario'
  //     })
  //     this.load_btn=true
  //     $('#input-portada').text('Seleccionar imagen')
  //     this.imgSelected='../../../../assets/img/01.jpg'
  //     this.file=undefined!
  //   }
  // }



}
