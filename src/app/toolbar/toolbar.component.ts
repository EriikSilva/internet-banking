import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{

  sideBarVisivel
  items:any;

  constructor(private authService:AuthService){}


  ngOnInit(): void {
      this.items = [
        {
          label:'Perfil',
          icon:'pi pi-user',
          routerLink: ['/perfil']
        },
        {
          label:'Sair',
          icon:'pi pi-fw pi-power-off',
          command: (event) => {
            this.logout()
          }

       },

      ]
  }

  // teste($event){
  //   console.log($event)
  // }
  
  logout(){
    this.authService.logout()
    window.location.reload();
  }


}
