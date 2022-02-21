import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from 'src/Services/members.service';
interface Site {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  form: any;
  currentid: any;
  item1: any;
  ens:any;
 // sites:any ;
  // sites: Site[] = [
  //   {value: 'Sfax', viewValue: 'Sfax'},
  //   {value: 'Tunis', viewValue: 'Tunis'},
  //   {value: 'France', viewValue: 'France'},
  // ];

  constructor(private ms: MembersService, private router: Router, private acivateRoute: ActivatedRoute) { }
  initform(item: any): void {

    //item? .attribut : yefhem ken si item.attribut fih valeur ye5ouha sinon ye5ou null
    this.form = new FormGroup({
      nomPrenom: new FormControl(item?.nomPrenom, [Validators.required]),
      cin: new FormControl(item?.cin, [Validators.required]),
      dateNais: new FormControl(item?.dateNais),
      login: new FormControl(item?.login, [Validators.required]),
      site: new FormControl(item?.site, [Validators.required]),
      // photo: new FormControl(item?.photo),
      // diplome: new FormControl(item?.diplome),
      // encadrant_id: new FormControl(item?.encadrant_id),


      // dateNaissance: new FormControl(item?.dateNaissance, [Validators.required])



    })
  }
  onsubmit() {
    console.log(this.form.value);
    const saveMember = { ...this.item1, ...this.form.value }
    //:ma3neha kol element fil item1 twali bil element ili ktebtou jdid fil form

    //.then na3mlouha wa9t c'et bon il resultat fil resolve w nhebou ya3mel 7aja o5ra , 
    this.ms.saveMember(saveMember)
      .then((data) => {
        this.router.navigate(['./members'])


      })

  }


  ngOnInit(): void {
// this.ms.GetEnseignant().then(
//   (data)=>{
//     this.ens=data;
//     console.log(this.ens)
//   }
// )
// this.ms.GetSites().then(
//   (data)=>{
//     this.sites=data;
//     console.log(this.sites)
//   }
// )

    this.currentid = this.acivateRoute.snapshot.params.id;//récupéer l'id il mawjoud fil url
    // if truely testiha bil  !! 
    if (!!this.currentid) {
      // je suis dans edit 
      //mech tjib il membre à modifier w t9olou jibli il formulaire fih les données de ce member
      this.ms.getMemberById(this.currentid).then(
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