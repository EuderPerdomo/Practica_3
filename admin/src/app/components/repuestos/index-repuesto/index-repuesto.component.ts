import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { RepuestoService } from 'src/app/services/repuesto.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';


declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery:any
declare var $:any

@Component({
  selector: 'app-index-repuesto',
  templateUrl: './index-repuesto.component.html',
  styleUrls: ['./index-repuesto.component.css']
})
export class IndexRepuestoComponent implements OnInit {
  public token = localStorage.getItem('token');
  public load = false;
  public repuestos_const  :Array<any>= [];
  public repuestos :Array<any>= [];

public load_data=true
public filtro=''

public repuesto: Array<any>=[]
public arr_repuestos: Array<any>=[]
public arr_repuestos_inventario: Array<any>=[]
public url:any
public page=1
public pageSize=5
public load_btn=false

  constructor(
    private _repuestoService:RepuestoService
  ) { }

  ngOnInit(): void {
    this.init_data();
  }


  filtrar(){
    if(this.filtro){
      this.init_data()
    }else{
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese filtro de busqueda'
      })
    }
  }


  iinit_data(){
    this.load = true;
    this._repuestoService.listar_repuestos_admin(this.filtro,this.token).subscribe(
      response=>{
        this.repuestos_const = response.data;
        this.repuestos= this.repuestos_const;

        
        console.log('Repuestos listados Correctamente',this.repuestos)
        this.load = false;
      }
    );
  }



  init_data(){
    this._repuestoService.listar_repuestos_admin(this.filtro,this.token).subscribe(
      response=>{
        console.log('Los repuestos',response)
        this.repuestos=response.data

        this.repuestos.forEach(element=>{
          this.arr_repuestos.push({
            modelo:element.repu[0].modelo

          })
        })
console.log('arreglo de repuestos a exportar',this.arr_repuestos)

        this.load_data=false
        this.url=GLOBAL.url
      },
      error=>{
        console.log(error)
      }
    )
  }
  resetear(){
    this.filtro=''
    this.init_data()
  }

eliminar(id:any){
  this.load_btn=true
  this._repuestoService.eliminar_repuesto_admin(id,this.token).subscribe(
    response=>{
      iziToast.show({
        title:'SUCCESS',
        titleColor:'#00CF61',
        class:'text-success',
        position:'topRight',
        message:'Producto Eliminado Correctamente'
      })
      $('#delete-'+id).modal('hide')
      $('.modal-backdrop').removeClass('show')
      this.load_btn=false
      this.init_data()
    },
    error=>{
      iziToast.show({
        title:'ERROR',
        titleColor:'#00CF61',
        class:'text-success',
        position:'topRight',
        message:'Ocurrio un error en el servidor'
      })

      console.log(error)
      this.load_btn=false
    }
    
  )

}

download_excel(){

  //inventario_repuesto_admin

  this._repuestoService.inventario_repuesto_admin(this.token).subscribe(
    response=>{
      console.log('Repuestos inventario',response.data)
      //this.repuestos=response.data
this.arr_repuestos=response.data

     this.arr_repuestos.forEach(element=>{
        this.arr_repuestos_inventario.push({
          Modelo:element.repu[0].modelo,
          Cantidad:element.cantidad,
          Bodega:element.bodega,
          Descripcion:element.repu[0].descripcion,
        })
      })
      
console.log('arreglo de repuestos a exportar,ggg',this.arr_repuestos_inventario)

//Inicia inventario
let workbook = new Workbook();
let worksheet = workbook.addWorksheet("Reporte de productos");

worksheet.addRow(undefined);
for (let x1 of this.arr_repuestos_inventario){
  let x2=Object.keys(x1);

  let temp=[]
  for(let y of x2){
    temp.push(x1[y])
  }
  worksheet.addRow(temp)
}

let fname='REP01- ';

worksheet.columns = [
  { header: 'Modelo', key: 'col1', width: 30},
  { header: 'Cantidad', key: 'col2', width: 15},
  { header: 'Bodega', key: 'col3', width: 15},
  { header: 'Descripción', key: 'col4', width: 50},
]as any;

workbook.xlsx.writeBuffer().then((data) => {
  let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
});

//Finaliza inventario

    },
    error=>{
      console.log(error)
    }
  )

}

}
