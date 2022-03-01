import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
 
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
   
  public isAdmin( ): Boolean {
   
   //return this.getUser().roles.include( "ROLE_ADMIN"  );
   if (! this.isEmptyObject(this.getUser())){
    //console.log( this.getUser().roles.includes("ROLE_ADMIN"))

      return this.getUser().roles.includes("ROLE_ADMIN")
   }
   return false
  }
  public isUser( ): Boolean {
  
   //return this.getUser().roles.include( "ROLE_USER");
   if (! this.isEmptyObject(this.getUser()) ){
  //  console.log(this.getUser().roles.includes("ROLE_USER"))

    return   this.getUser().roles.includes("ROLE_USER")
   }
   return false 
  
  }
  public isEmptyObject(obj: any) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
