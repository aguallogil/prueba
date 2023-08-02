import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthService){

  }
  title = 'login-app';
  ngOnInit(): void {
    initFlowbite();
  }
  isAuthenticated() {
    return this.authService.isLoggedIn();
  }
}
