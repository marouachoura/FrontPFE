import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from 'src/Services/members.service';
import { PublicationsService } from 'src/Services/publications.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {
  form: any;
  currentid: any;
  item1: any;
  comp:any;
  data:any;
  d:any


  constructor(private ms: PublicationsService, private router: Router, private acivateRoute: ActivatedRoute,private mss: MembersService,private tokenStorage: TokenStorageService) { }
  initform(item: any): void {

   //item? .attribut : yefhem ken si item.attribut fih valeur ye5ouha sinon ye5ou null
   this.form = new FormGroup({
    nomFormation: new FormControl(item?.type, [Validators.required]),
    nomFormateur: new FormControl(item?.titre, [Validators.required]),
    niveau: new FormControl(item?.lien, [Validators.required]),
    certification: new FormControl(item?.Sourcepdf, [Validators.required]),
    duree: new FormControl(item?.date)




    })
    
  }
  connect(id:any){
    this.mss.getMemberByCompte(id)
    .then((data) => {
      console.log(data)
      this.comp=data.id;
      console.log(this.comp)

    });
  }
  onsubmit() {
    
    console.log(this.form.value);
    const savePub = { ...this.item1, ...this.form.value }
    //:ma3neha kol element fil item1 twali bil element ili ktebtou jdid fil form

    //.then na3mlouha wa9t c'et bon il resultat fil resolve w nhebou ya3mel 7aja o5ra , 
    this.ms.savePub(savePub)
      .then((data) => {
        this.ms.affecter(data.id,this.comp)
        this.router.navigate(['./formations'])


      })

  }


  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
  
      this.d=this.tokenStorage.getUser().id;
      this.connect(this.d)}
    this.currentid = this.acivateRoute.snapshot.params.id;//récupéer l'id il mawjoud fil url
    // if truely testiha bil  !! 
    if (!!this.currentid) {
      // je suis dans edit 
      //mech tjib il membre à modifier w t9olou jibli il formulaire fih les données de ce member
      this.ms.getPubById(this.currentid).then(
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
