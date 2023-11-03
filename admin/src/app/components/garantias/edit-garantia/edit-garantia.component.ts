import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ClienteService } from 'src/app/services/cliente.service';
import { GarantiaService } from 'src/app/services/garantia.service';
import { RepuestoService } from 'src/app/services/repuesto.service';

declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery:any
declare var $:any

@Component({
  selector: 'app-edit-garantia',
  templateUrl: './edit-garantia.component.html',
  styleUrls: ['./edit-garantia.component.css']
})
export class EditGarantiaComponent implements OnInit {
  public garantia: any={}
  public cliente: any = {}
  public imgSelected:any | ArrayBuffer='../../../../assets/img/01.jpg'
  public file: File = undefined!
  public clientes:Array<any>=[]
  public filtro_nombre=''
  public id:any
  public token:any
  public url:any
  public load_btn=false

    /*Datos del cliente */
    public id_cliente:undefined
    public nombre_cliente:undefined

  constructor(
    private _route:ActivatedRoute,
    private _garantiaService:GarantiaService,
    private _clienteService:ClienteService,
    private _router:Router,
  ) {
    this.token=localStorage.getItem('token'),
    this.url=GLOBAL.url
   }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id=params['id']
      this._garantiaService.obtener_garantia_admin(this.id,this.token).subscribe(
        response=>{
          if(response.data==undefined){           
            this.garantia=undefined
          }else{
            this.garantia=response.data
            this.cliente=response.data.cliente
            this.id_cliente=this.cliente._id//valor inicial del id de cliente
            console.log('Valores Iniciales',this.garantia,'id del cliente',this.id_cliente)
            this.imgSelected=this.url+'obtener_portada/'+this.garantia.label
          }
        },
        error=>{console.log(error)}
      )
    }
    )
    this.consultar_clientes()
  }

  onChange(_id:any) {
    for (let clave of this.clientes){
      if(_id==clave['_id']){
        console.log(clave.nombre)
        this.cliente.nombre=clave.nombre
        console.log(this.cliente)
      }
      }
}

  crear_cliente(registroFormCliente:any){
    console.log('creacion de cliente')
    if(registroFormCliente.valid){
      this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'OK',
            titleColor: 'green',
            class: 'text-succes',
            position: 'topRight',
            message: "Cliente registrado correctamente"  
        });
        console.log(response)
        this.cliente={
          nombre:'',
          email:'',
          telefono:'',
          direccion:'',
          dni:'',
          tipo:''
        }
        console.log(response)
        this.garantia.cliente=response.data._id
        //this.nombre_cliente=response.data.nombre
        this.cliente.nombre=response.data.nombre
        this.id_cliente=response.data._id
        $('#modal_cliente').modal('hide')
        //this._router.navigate(['/panel/clientes'])
        },
        error=>{}
      )
      }else{
        iziToast.show({
          title: 'Error',
          titleColor: 'red',
          class: 'text-danger',
          position: 'topRight',
          message: "Debe llenar todos los campos del formulario"
      });
      }
  }

  consultar_clientes(){
    this._clienteService.listar_clientes_filtro_admin(null,null,this.token).subscribe(
      response=>{
        console.log('clientes consultados',response.data);
        this.clientes=response.data
      },
      error=>{
        console.log('Error en la consulta de los clientes',error)
      }
    );
  }


  filtro(tipo:any){
    console.log(tipo)
    if(tipo=="nombre"){
      if(this.filtro_nombre){
        console.log(this.filtro_nombre)
        //this.load_data=true
        this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_nombre,this.token).subscribe(
          response=>{
        
        this.clientes=response.data 
        //this.load_data=false       
          },
          error=>{
        console.log(error)
          }
        )
      }else{
        this.consultar_clientes()
      }
    }

  }

 actualizar(actualizarGarantiaForm: any) {
  
  if(actualizarGarantiaForm.valid){

    var data : any= {};

    if(this.file != undefined){
      data.label = this.file;
    }
    
    data.modelo = this.garantia.modelo;
    data.serial = this.garantia.serial;
    data.observaciones_ingreso = this.garantia.observaciones;
    data.diagnostico_cliente = this.garantia.diagnostico_cliente;
    data.oficina = this.garantia.oficina
    data.numero_factura = this.garantia.numero_factura
    data.fecha_factura=this.garantia.fecha_factura
    data.cliente=this.id_cliente
  
    this.load_btn = true;
    console.log('datos que se van a actualizar',data)
  
    this._garantiaService.actualizar_garantia_admin(data,this.id,this.token).subscribe(
      response=>{
        iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizó correctamente la garantia.'
        });

        this.load_btn = false;

        this._router.navigate(['panel/garantias']);
      },
      error=>{
        this.load_btn = false;
      }
    )

  }else{
    iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
    });
    this.load_btn = false;
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
