import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ha ocurrido un error.';

        // Puedes personalizar el mensaje de error según el tipo de error que recibas.
        // Por ejemplo, si el servidor devuelve un mensaje de error específico,
        // puedes utilizarlo para mostrar un mensaje más informativo al usuario.

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente (por ejemplo, error de red).
          errorMessage = `Error del cliente: ${error.error.message}`;
        } else if (error.status >= 400 && error.status < 500) {
          // Errores de cliente (por ejemplo, errores de validación).
          errorMessage = `Error del cliente: ${error.error.message}`;
        } else if (error.status >= 500) {
          // Errores del servidor (por ejemplo, errores internos del servidor).
          errorMessage = `Error del servidor: ${error.error.message}`;
        }

        // Puedes mostrar el mensaje de error en una notificación, un cuadro de diálogo, o cualquier otra forma.
        console.error(errorMessage);

        // Devuelve el error para que el código que realiza la solicitud original pueda manejarlo también.
        return throwError(errorMessage);
      })
    );
  }
}
