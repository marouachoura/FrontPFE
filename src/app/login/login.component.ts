import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
 // roles: string[] = [];
 roles='';
  d: any;
  templateuser = false;
  templateadmin = false;
 // templateaVisitor = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      console.log(this.tokenStorage.getUser())
      console.log(this.tokenStorage.getUser().id)
      

      console.log(this.roles);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(

      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.d = this.tokenStorage.getUser().id;
        console.log(this.tokenStorage.getUser())
        this.router.navigate(['./members'])
        // this.reloadPage();
        console.log(data);
        // this.router.navigate(['./members'])
        //this.ngZone.run(() => this.router.navigate(['/members']));
        // if (this.roles == 'ROLE_USER') {
        //   this.templateuser = true
        //   this.router.navigate(['./members'])
        // }
        // else if (this.roles == 'ROLE_ADMIN') {
        //   this.templateadmin = true;
        //   this.router.navigate(['./members'])
        // }
        // else {
        //   this.templateaVisitor = true
        // }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
