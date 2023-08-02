import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthenticated-content',
  templateUrl: './unauthenticated-content.component.html',
  styleUrls: ['./unauthenticated-content.component.css']
})
export class UnauthenticatedContentComponent {
  constructor(private router: Router) { }

  get title() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'login': return 'Inicio de Sesión';
      case 'meals': return 'Catalogo de Meals';
      case 'create-account': return 'Sign Up';
      case 'change-password': return 'Change Password';
      default: return '';
    }
  }

  get description() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case 'reset-password': return 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.';
      default: return '';
    }
  }
}
