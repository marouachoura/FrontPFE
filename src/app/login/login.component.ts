import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
 // roles: string[] = [];
 roles='';
 form: any;
  d: any;
  templateuser = false;
  templateadmin = false;
  submitted = false;
  invalidLogin: any;
 // templateaVisitor = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
     // console.log(this.tokenStorage.getUser())
     // console.log(this.tokenStorage.getUser().id)
      

     // console.log(this.roles);
    }
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)])
    })
  }

 
 sleep(ms:number) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

  onSubmit(): void {
   // debugger ;
    //console.log("maroua***********************************************************************");
    this.submitted=true;
    const { username, password } = this.form.value;

    this.authService.login(username, password).subscribe(

      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.d = this.tokenStorage.getUser().id;
       // console.log(this.tokenStorage.getUser())
       //this.sleep(20000);
       //console.log("World!");
       // this.router.navigate(['./members'])
       this.sleep(20000).then(()=>{ this.router.navigate(['./members'])});
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
        this.invalidLogin = true;
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  get loginFormControl() {
    return this.form.controls;
  }

  reloadPage(): void {
    window.location.reload();
  }
}
