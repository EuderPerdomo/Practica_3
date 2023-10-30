import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './services/admin.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';

  constructor(
    private _adminService:AdminService,
    private _router:Router
  ){
  }

  ngOnInit(): void {

    if(localStorage.getItem('token') != null){
      this._adminService.verificar_token(localStorage.getItem('token')).subscribe(
        response=>{
          console.log('Token Verificado')
        },
        error=>{
          localStorage.removeItem('token');
          localStorage.removeItem('_id');
          localStorage.removeItem('user');
          this._router.navigate(['/login']);
        }
      );
    }
  }




}
