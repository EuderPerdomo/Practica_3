import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AdministracionService } from 'src/app/services/administracion.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { GarantiaService } from 'src/app/services/garantia.service';



declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery: any
declare var $: any

@Component({
  selector: 'app-create-garantia',
  templateUrl: './create-garantia.component.html',
  styleUrls: ['./create-garantia.component.css']
})
export class CreateGarantiaComponent implements OnInit {
  public cliente: any = {}
  public modelo: any = {}
  public garantia: any = {
  }
  public observacion: any = ''

  public file: File = undefined!
  public imgSelected: any | ArrayBuffer = '../../../../assets/img/01.jpg'
  public config: any = {}
  public token: any
  public load_btn = false

  public config_global: any = {}

  /*Datos del cliente */
  public id_cliente: undefined
  public nombre_cliente: undefined

  /** Listado de los clientes*/
  public clientes: Array<any> = []
  public modelos: Array<any> = []
  public filtro_nombre = ''
  public filtro_modelos = ''



  constructor(
    private _garantiaService: GarantiaService,
    private _adminService: AdminService,
    private _router: Router,
    private _clienteService: ClienteService,
    private _administracionService: AdministracionService
  ) {
    this.config = {
      height: 500
    }
    this.token = this._adminService.get_token()
  }

  ngOnInit(): void {
    this.consultar_clientes()
    this.consultar_modelos()
  }


  registro(registroForm: any) {
    if (registroForm.valid) {
      if (this.file == undefined) {
        iziToast.show({
          title: 'Error',
          titleColor: 'red',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe elegir una imagen de portada'
        })
      } else {
        console.log(this.garantia)
        console.log(this.file)
        this.load_btn = true
        this._garantiaService.registro_garantia_admin(this.garantia, this.file, this.token).subscribe(
          response => {
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#00CF61',
              class: 'text-susscess',
              position: 'topRight',
              message: 'Garantia registrada correctamente'
            })
            this.load_btn = false
            this._router.navigate(['/panel/garantias'])
          },
          error => {
            this.load_btn = false
            console.log(error)
          }
        )
      }

    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'Complete el formulario'
      })
      this.load_btn = true
      $('#input-portada').text('Seleccionar imagen')
      this.imgSelected = '../../../../assets/img/01.jpg'
      this.file = undefined!
    }
  }

  fileChangeEvent(event: any): void {
    var file: any
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
      this.imgSelected = '../../../../assets/img/01.jpg'
      this.file = undefined!
    }

    if (file.size <= 4000000) {
      if (file.type == 'image/png' || file.type == 'image/webp' || file.type == 'image/jpg' || file.type == 'image/gif' || file.type == 'image/jpeg') {
        const reader = new FileReader()
        reader.onload = e => this.imgSelected = reader.result
        reader.readAsDataURL(file)

        $('#input-portada').text(file.name)

        this.file = file
      } else {
        iziToast.show({
          title: 'Error',
          titleColor: 'red',
          class: 'text-danger',
          position: 'topRight',
          message: 'Formato de imagen o archivo invalido'
        })

        $('#input-portada').text('Seleccionar imagen')
        this.imgSelected = '../../../../assets/img/01.jpg'
        this.file = undefined!
      }
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB'
      })
      $('#input-portada').text('Seleccionar imagen')
      this.imgSelected = '../../../../assets/img/01.jpg'
      this.file = undefined!
    }
    console.log(this.file)
  }

  crear_cliente(registroFormCliente: any) {
    console.log('creacion de cliente')
    if (registroFormCliente.valid) {
      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'OK',
            titleColor: 'green',
            class: 'text-succes',
            position: 'topRight',
            message: "Cliente registrado correctamente"
          });
          console.log(response)
          this.cliente = {
            nombre: '',
            email: '',
            telefono: '',
            direccion: '',
            dni: '',
            tipo: ''
          }
          console.log(response)
          this.garantia.cliente = response.data._id
          //this.nombre_cliente=response.data.nombre
          this.cliente.nombre = response.data.nombre
          this.id_cliente = response.data._id
          $('#modal_cliente').modal('hide')
          //this._router.navigate(['/panel/clientes'])
        },
        error => { }
      )
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: "Debe llenar todos los campos del formulario"
      });
    }
  }

  consultar_clientes() {
    this._clienteService.listar_clientes_filtro_admin(null, null, this.token).subscribe(
      response => {
        console.log('clientes consultados', response.data);
        this.clientes = response.data
      },
      error => {
        console.log('Error en la consulta de los clientes', error)
      }
    );
  }

  consultar_modelos() {
    this._administracionService.listar_dispositivos_admin(null, null, this.token).subscribe(
      response => {
        console.log('Modelos consultados', response.data);
        this.modelos = response.data
      },
      error => {
        console.log('Error en la consulta de los modelos', error)
      }
    );
  }

  filtro(tipo: any) {
    console.log(tipo)
    if (tipo == "nombre") {
      if (this.filtro_nombre) {
        console.log(this.filtro_nombre)
        //this.load_data=true
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_nombre, this.token).subscribe(
          response => {

            this.clientes = response.data
            //this.load_data=false       
          },
          error => {
            console.log(error)
          }
        )
      } else {
        this.consultar_clientes()
      }
    }

  }

  filtro_modelo(tipo: any) {
    console.log(tipo)
    if (tipo == "equipo") {
      if (this.filtro_nombre) {
        console.log(this.filtro_modelo)
        //this.load_data=true
        this._administracionService.listar_dispositivos_admin(tipo, this.filtro_modelo, this.token).subscribe(
          response => {
            this.modelos = response.data
          },
          error => {
            console.log(error)
          }
        )
      } else {
        this.consultar_modelos()
      }
    }

  }


  onChange(_id: any) {
    for (let clave of this.clientes) {
      if (_id == clave['_id']) {
        console.log(clave.nombre)
        this.cliente.nombre = clave.nombre
        console.log(this.cliente)
      }
    }
  }

  onChange_modelo(_id: any) {
    for (let clave of this.modelos) {
      if (_id == clave['_id']) {
        console.log(clave.modelo)
        this.modelo.modelo = clave.modelo
        console.log(this.cliente)
      }
    }
  }

}




