import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from 'src/Services/site.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-sites-form',
  templateUrl: './sites-form.component.html',
  styleUrls: ['./sites-form.component.css']
})
export class SitesFormComponent implements OnInit {

  form: any;
  currentid: any;
  item1: any;
  comp:any;
  data:any;
  d:any


  constructor(private ms: SiteService, private router: Router, private acivateRoute: ActivatedRoute,private tokenStorage: TokenStorageService) { }
  initform(item: any): void {

   //item? .attribut : yefhem ken si item.attribut fih valeur ye5ouha sinon ye5ou null
   this.form = new FormGroup({
    nomSite: new FormControl(item?.type, [Validators.required]),
    })
    
  }
  onsubmit() {
    console.log(this.form.value);
    const saveSite = { ...this.item1, ...this.form.value }
  
    this.ms.saveSite(saveSite)
      .then((data) => {
        this.router.navigate(['./sites'])


      })

  }


  ngOnInit(): void {
// this.ms.GetEnseignant().then(
//   (data)=>{
//     this.ens=data;
//     console.log(this.ens)
//   }
// )


    this.currentid = this.acivateRoute.snapshot.params.id;//récupéer l'id il mawjoud fil url
    // if truely testiha bil  !! 
    if (!!this.currentid) {
      // je suis dans edit 
      //mech tjib il membre à modifier w t9olou jibli il formulaire fih les données de ce member
      this.ms.getSiteById(this.currentid).then(
        (item) => {
          this.item1 = item; this.initform(this.item1);
          console.log(item);
        }
      );


    }

    else {
      //je suis dans add
      this.initform(null);
    }
    this.initform(null);


  }
}
