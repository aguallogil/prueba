import { config } from "cypress/types/bluebird";
import { MealComponent } from "../src/app/meal/meal.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import {AppRoutingModule} from '../src/app/app-routing.module';
import { MealService } from "../src/app/services/meal.service";
import * as CryptoJS from 'crypto-js';

describe('Prueba de Componente Meal', () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'https://api-express.fly.dev/auth/login', // Reemplaza con la ruta real de inicio de sesión
      body: {
        email: 'aguallogil_oscar@hotmail.com',
        password: '1234',
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201, 204]); // You can adjust the status codes as needed

      
      expect(response.body).to.have.property('accessToken');
      
      const accessToken = response.body.accessToken;
      cy.setCookie('auth_token', CryptoJS.AES.encrypt(accessToken, 'dggb4-34534-0ff').toString());
    });

    cy.getCookie('auth_token').then((cookie) => {
      const token = cookie.value;
      const bytes = CryptoJS.AES.decrypt(token,'dggb4-34534-0ff');
      const auth_token= bytes.toString(CryptoJS.enc.Utf8);
      // Intercepta la petición HTTP y agrega el token a la cabecera de autorización
      cy.intercept('GET', 'https://api-express.fly.dev/meals/pagination/1', (req) => {
        req.headers['Authorization'] = `Bearer ${auth_token}`;
      }).as('getMeals');

      // Monta el componente antes de cada prueba

      // Espera a que se complete la petición HTTP
      cy.wait('@getMeals').then((interception) => {
        const meals = interception.response.body; // Obtén la lista de meals desde la respuesta interceptada

        // Pasa la lista de meals al componente mediante la propiedad @Input
        cy.get('app-meal').should('be.visible').should('have.attr', 'data', JSON.stringify(meals));
      });
    });
    // Establecer la cookie de inicio de sesión antes de cargar el componente
    //cy.setCookie('auth_token', 'U2FsdGVkX18M5Zp9KTt7QNifvRlO%2BpprJlY%2B4Zjc0U9MRZ0wygS1EX9Ng4QLIGfAlKjVlppcjHhjZ5XFhz8H6C7c24SPRVVJyXAidrhPUYTlZssZdSlEZ%2FejeMoclksdjmQdKOPnpx8XAMWG65L%2BKgsI99uQL2yXyXns7M0fGqvBU7wyK0DZg%2FWdZV6Vy8vXWhjXmWQMPxH47Rbc1bEEv6Q%2Bbm6X27uJTO8KdqRYGpE%3D');

    // Montar el componente antes de cada prueba
    cy.mount(MealComponent, {
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule
      ],
      providers:[MealService]
    });
  });
  // afterEach(() => {
  //   // Limpiar las cookies después de cada prueba para evitar conflictos en pruebas posteriores
  //   cy.clearCookies();
  // });

  it('debe mostrar el componente', () => {
    // Verificar que el componente está presente
    cy.get('#table-search-meals').should('be.visible');
  });
});
