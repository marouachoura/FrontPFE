
import { Component, NgModule, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  Members } from 'src/Models/member.model';
import { MembersService } from 'src/Services/members.service';
import { TokenStorageService } from 'src/Services/token-storage.service';


import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-membre-list',
  templateUrl: './membre-list.component.html',
  styleUrls: ['./membre-list.component.css']
})


export class MembreListComponent implements OnInit {
  public templateadmin=false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: any ;
  ad=false;
  comp:any;
  d='';
  pr:any;
  ens=false;
 
  en:any;
  //any : quelque soit le type
  dataSource: MatTableDataSource<Members> = new MatTableDataSource(this.ms.tabb);
  dataSourcee: MatTableDataSource<Members> = new MatTableDataSource(this.ms.tabb);

  //3al 9ad ma3andik columns tzidou fi displayedcolumns ==9adeh 3andik min ngcontainer fil html
  displayedColumns: string[] = ["nomPrenom", "cin", "dateNais", "login" ,"formations","site","Actions"];
 // displayedColumn: string[] = ["photo", "prenom", "nom", "email", "dateNaissance", "cv", "grade","etablissement","Actions"];



  //fil constructeur na3mel instance min il service : ma3neha injectit il service 
  constructor(private ms: MembersService, private router: Router, private dialog: MatDialog,private tokenStorage: TokenStorageService) {
    this.dataSource = new MatTableDataSource(this.ms.tabb);
    
  }
  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    // nlanci thread de type observable :no93ed netssana mba3d massakarha il user w nestana il retour de la type boolean 
    dialogRef.afterClosed().subscribe(
      isDeleted => {
        if (isDeleted) {
          //exécute de code de la suppression 
          console.log(id);
          this.ms.RemoveMemberById(id).then(() => this.GetMembers());

        }
      }

    )
  }
  GetMembers(): void {
    //.then((awelparamétre houwa chnou jek min il resolve)=>{chhnou na3mel a3lih})
    //this.ms.GetAllMembers().then((data) => {
    //.data  accéder au données de table de type MatTableDataSource
    //this.dataSource.data = data
    // })

    //this.ms.GetALL().then((data)=>this.dataSource.data=data);
    //console.log(this.dataSource.data);
    // this.ms.GetALL()
    //   .then((data) => {

    //     this.dataSource.data = data.filter(a=>a.grade==null);
    //     this.dataSourcee.data = data.filter(a=>a.grade!=null);
    //     console.log(data.filter(a=>a.grade!=null))
       
    //   });
    //console.log(this.dataSource.data);
    this.ms.GetALL()
    .then((data) => {
      this.dataSource.data = data;
      console.log(data);
    });

    
  }
  
  // GetMembersen(): void {
  // this.ms.GetEnseignant().then(
  // (data)=>{
  //   this.en=data;})
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


  }
  connect(id:any){
    this.ms.getMemberByCompte(id)
    .then((data) => {
      console.log(data)
      this.comp=data.id;
      console.log(this.comp)

    });
  }

  profile(id:any){
    this.ms.getfullMembre(id) .then((data) => {
      console.log(data)
      this.pr=data
    });
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
     
       if(this.roles=='ROLE_ADMIN'){
        this.templateadmin=true;
      }
     
    }
    
    this.GetMembers();
    //console.log(this.tokenStorage.getUser().id);
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      if(this.roles=='ROLE_ADMIN'){
        this.ad=true;
      }
      //console.log(this.tokenStorage.getUser())
      //console.log(this.tokenStorage.getUser().id)
//this.d=this.tokenStorage.getUser().id;
      //console.log(this.d);
     //console.log(this.connect(this.d));
     // this.profile(3);
    }

    

    /*if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      if(this.roles=='ROLE_USER'){
        this.us=true;
      }
      console.log(this.roles);
      console.log(this.connect(this.tokenStorage.getUser().id));
      
    }*/
  }

}

