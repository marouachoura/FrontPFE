import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/Services/event.service';
import { MembersService } from 'src/Services/members.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  form: any;
  currentid: any;
  item1: any;
comp:any;
d:any;

  constructor(private ms: EventService, private router: Router, private acivateRoute: ActivatedRoute,private mss: MembersService,private tokenStorage: TokenStorageService) { }
  initform(item: any): void {

    //item? .attribut : yefhem ken si item.attribut fih valeur ye5ouha sinon ye5ou null
    this.form = new FormGroup({


      titre: new FormControl(item?.titre, [Validators.required]),
      lieu: new FormControl(item?.lieu, [Validators.required]),
      date: new FormControl(item?.date)



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
    const saveEvent = { ...this.item1, ...this.form.value }
    //:ma3neha kol element fil item1 twali bil element ili ktebtou jdid fil form

    //.then na3mlouha wa9t c'et bon il resultat fil resolve w nhebou ya3mel 7aja o5ra , 
    this.ms.saveEvents(saveEvent)
      .then((data) => {
       // console.log(data.id)
        this.ms.affecter(data.id,this.comp)
        this.router.navigate(['./Events'])


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
      this.ms.getEventById(this.currentid).then(
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