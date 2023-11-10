import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GarantiaService } from 'src/app/services/garantia.service';
import { GLOBAL } from 'src/app/services/GLOBAL';

declare var iziToast: { show: (arg0: { title: string; titleColor: string; class: string; position: string; message: string; }) => void; };
declare var jQuery:any
declare var $:any


@Component({
  selector: 'app-index-garantia',
  templateUrl: './index-garantia.component.html',
  styleUrls: ['./index-garantia.component.css']
})
export class IndexGarantiaComponent implements OnInit {

public token = localStorage.getItem('token');
public load = false;
public garantias_const  :Array<any>= [];
public garantias :Array<any>= [];


public load_data=true
public filtro=''

public garantia: Array<any>=[]
public arr_garantias: Array<any>=[]
public url:any
public page=1
public pageSize=10
public load_btn=false

  constructor(
    private _garantiaService:GarantiaService,
  ) { }

  ngOnInit(): void {
    this.init_data()
  }


  init_data(){

    this._garantiaService.listar_garantias_admin(this.filtro,this.token).subscribe(
      response=>{
        console.log('Garantias consultadas',response)
        this.garantias=response.data
        this.load_data=false
        this.url=GLOBAL.url
      },
      error=>{
        console.log('Error al listar garantias',error)
      }
    )

  }

eliminar(id:any){

}
download_excel(){

}

resetear(){

}

filtrar(){
  
}

}
