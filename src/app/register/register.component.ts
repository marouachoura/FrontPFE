import { Component, OnInit } from '@angular/core'; import { Router } from '@angular/router'; import { AuthService } from 'src/Services/auth.service'; 
import { MembersService } from 'src/Services/members.service'; @Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  sites:any ;
  form: any = {
    nomPrenom : null,
    cin: null ,
    dateNais : null,
    login :null,
    site : null,
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  
  constructor(private ms: MembersService , private authService: AuthService, private router:Router) { }
  ngOnInit(): void {
    this.ms.GetSites().then(
      (data)=>{
       // this.sites=data;
        console.log(this.sites)
      }
    )
  }
  
  onSubmit(): void {
    const {nomPrenom ,cin,dateNais,login ,site, username, email, password } = this.form;
    this.authService.register(nomPrenom ,cin,dateNais,login ,site,username, email, password).subscribe(
   
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['./login'])
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
