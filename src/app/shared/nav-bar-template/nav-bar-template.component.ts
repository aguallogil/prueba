import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar-template',
  templateUrl: './nav-bar-template.component.html',
  styleUrls: ['./nav-bar-template.component.css']
})
export class NavBarTemplateComponent {
  constructor(private authService:AuthService,private router: Router){

  }
  logOut(event:Event){
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
