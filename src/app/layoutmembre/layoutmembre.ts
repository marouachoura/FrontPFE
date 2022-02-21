import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService';
import { MembersService } from 'src/Services/members.service';

import { TokenStorageService } from 'src/Services/token-storage.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-layoutmembre',
  templateUrl: './layoutmembre.html',
  styleUrls: ['./layoutmembre.css','../../assets/css/animate.css','../../assets/css/bootstrap.css','../../assets/css/font-awesome.min.css','../../assets/css/pe-icons.css','../../assets/css/prettyPhoto.css','../../assets/css/style.css']
})
export class Layoutmembre implements OnInit {
comp:any;
d:any;
pr:any;
etd:any;
    constructor(private ms: MembersService,private tokenStorage: TokenStorageService,private router: Router,private dialog: MatDialog) { }

    connect(id:any){
      this.ms.getMemberByCompte(id)
      .then((data) => {
        console.log(data)
        this.comp=data.id;
        console.log(this.comp)
        this.profile(this.comp);
  
      });
    }
    logout(): void {
      this.tokenStorage.signOut();
      this.router.navigate(['./login'])
    }
  
    profile(id:any){
      this.ms.getfullMembre(id) .then((data) => {
       // console.log(data)
        this.pr=data;
       // console.log(this.pr.events[0].titre)
       // console.log(this.pr.events)
      // console.log(this.pr.outils)
       console.log(this.pr.pubs)



    
        if(this.pr.encadrant!=null){
          this.etd=true;
        }
      });
    }
  
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
   
 
      //console.log(this.tokenStorage.getUser())
     // console.log(this.tokenStorage.getUser().id)
this.d=this.tokenStorage.getUser().id;
this.connect(this.d)

      //console.log(this.d);
      //console.log(this.connect(this.d));
      
    }
   
  }

  /*deleteoutils(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    // nlanci thread de type observable :no93ed netssana mba3d massakarha il user w nestana il retour de la type boolean 
    dialogRef.afterClosed().subscribe(
      isDeleted => {
        if (isDeleted) {
          //exécute de code de la suppression 
          console.log(id);
          this.ou.RemoveToolById(id).then(() => window.location.reload());

        }
      }

    )
  }*/

}
