import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','../../src/assets/css/animate.css','../../src/assets/css/bootstrap.css','../../src/assets/css/font-awesome.min.css','../../src/assets/css/pe-icons.css','../../src/assets/css/prettyPhoto.css','../../src/assets/css/style.css']
})
export class AppComponent {
  title = 'lab';
  isLoggedIn = false;
  isLoginFailed = false;
  roles='';
  templateuser=false;
  templateadmin=false;
  //templateaVisitor=false;

constructor(public tokenStorage: TokenStorageService,private router: Router) {
  
}
ngOnInit(): void {
if (this.tokenStorage.getToken()) {
  this.isLoggedIn = true;
  this.roles = this.tokenStorage.getUser().roles;
  if(this.roles=='ROLE_USER'){
    this.templateuser=true
  }
  else if(this.roles=='ROLE_ADMIN'){
    this.templateadmin=true;
  }
  // else{
  //   this.templateaVisitor=true
  // }
}
}
logout(): void {
  this.tokenStorage.signOut();
  this.isLoggedIn = false;
  this.router.navigate(['./login'])
}
}
