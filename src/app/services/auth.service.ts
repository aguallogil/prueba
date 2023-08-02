import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'auth_token';
  private secretKey = 'dggb4-34534-0ff'; // Reemplaza esto con tu propia clave secreta

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  login(email: string, password: string): Observable<void> {
    return new Observable((observer) => {
      // Realizar la solicitud HTTP al servidor para obtener el token después de verificar las credenciales del usuario.
      this.http.post<any>(environment.apiUrl+'auth/login', { email, password }).subscribe(
        (response) => {
          if (response && response.accessToken) {
            // console.log(response)
            const encryptedToken = this.encryptToken(response.accessToken);
            this.setAuthToken(encryptedToken);
          }
          observer.next();
          observer.complete();
        },
        (error) => {
          console.error('Error during login:', error);
          observer.error('Failed to login. Please check your credentials and try again.');
        }
      );
    });
  }
  logout() {
    // Borra el token del servicio y del almacenamiento local.
    this.removeAuthToken();
  }

  private encryptToken(token: string): string {
    // Cifra el token usando la clave secreta.
    return CryptoJS.AES.encrypt(token, this.secretKey).toString();
  }

  private decryptToken(encryptedToken: string): string {
    // Descifra el token usando la clave secreta.
    const bytes = CryptoJS.AES.decrypt(encryptedToken, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  private setAuthToken(token: string) {
    // Almacena el token cifrado en una cookie.
    this.cookieService.set(this.authTokenKey, token);
  }

  private removeAuthToken() {
    // Elimina la cookie con el token cifrado.
    this.cookieService.delete(this.authTokenKey);
  }

  getToken(): string | null {
    // Obtiene el token almacenado en la cookie cifrada y lo descifra antes de devolverlo.
    const encryptedToken = this.cookieService.get(this.authTokenKey);
    return encryptedToken ? this.decryptToken(encryptedToken) : null;
  }

  isLoggedIn(): boolean {
    // Verifica si el usuario ha iniciado sesión comprobando si existe el token cifrado.
    return !!this.getToken();
  }
}
