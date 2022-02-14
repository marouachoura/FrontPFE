import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from 'src/Services/members.service';


@Component({
  selector: 'app-enseignant-form',
  templateUrl: './enseignant-form.component.html',
  styleUrls: ['./enseignant-form.component.css']
})
export class EnseignantFormComponent implements OnInit {
  form: any;
  currentid: any;
  item1: any;
  ens:any;


  constructor(private ms: MembersService, private router: Router, private acivateRoute: ActivatedRoute) { }
  initform(item: any): void {

    //item? .attribut : yefhem ken si item.attribut fih valeur ye5ouha sinon ye5ou null
    this.form = new FormGroup({
      cin: new FormControl(item?.cin, [Validators.required]),
      nom: new FormControl(item?.nom, [Validators.required]),
      cv: new FormControl(item?.cv, [Validators.required]),
      prenom: new FormControl(item?.prenom, [Validators.required]),
      email: new FormControl(item?.email, [Validators.required]),
      photo: new FormControl(item?.photo),
      grade: new FormControl(item?.grade),
      etablissement: new FormControl(item?.etablissement),
      dateNaissance: new FormControl(item?.dateNaissance, [Validators.required])



    })
  }
  onsubmit() {
    console.log(this.form.value);
    const saveMember = { ...this.item1, ...this.form.value }
    //:ma3neha kol element fil item1 twali bil element ili ktebtou jdid fil form

    //.then na3mlouha wa9t c'et bon il resultat fil resolve w nhebou ya3mel 7aja o5ra , 
    this.ms.saveEnseignant(saveMember)
      .then((data) => {
        this.router.navigate(['./members'])


      })

  }


  ngOnInit(): void {

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