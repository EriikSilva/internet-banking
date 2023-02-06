import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService:AuthService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getToken();
        request = request.clone({
            headers: request.headers.set('Authorization', 'bearer ' + authToken)
        })
      
        return next.handle(request)
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
}