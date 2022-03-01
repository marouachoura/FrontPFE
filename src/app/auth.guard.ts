import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authServiceToken : TokenStorageService , private _router:Router ){}
  canActivate (): boolean{
    if (this._authServiceToken.getToken()){
      return true
    } else {
      this._router.navigate(['./login'])
      return false 
    }

  }
  
}
