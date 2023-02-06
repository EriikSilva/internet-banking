import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  sideBarVisivel

  constructor(private authService:AuthService){}

  
  logout(){
    this.authService.logout()
    window.location.reload();
  }

}
