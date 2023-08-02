import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.logout();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
  
    if (this.loginForm.valid) {
      // Si el formulario es válido, aquí puedes agregar la lógica para enviar los datos al backend y realizar la autenticación real.
      this.authService.login(this.loginForm.get('email')?.value,this.loginForm.get('password')?.value).subscribe(
        () => {
          // Login exitoso, realizar acciones adicionales o redirección a otra página.
           // Si la autenticación es exitosa, redirige al usuario a una página de éxito.
           this.router.navigate(['/meals']).then(() => {
            window.location.reload();
          });
            //this.router.navigate(['/meals']);
        },
        (error) => {
          console.log(error);
        });
    }
  }
}