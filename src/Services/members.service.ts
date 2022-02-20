import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app-config';
import { HttpClient } from '@angular/common/http';
import { Members } from 'src/Models/member.model';
import { Sites } from 'src/Models/site.model';
import { Publications } from 'src/Models/article.model';


@Injectable({
  providedIn: 'root'
})
export class MembersService {


  public tabb: Members[] = [];
  public tab : Publications[] =[] ;

  public tabSites: Sites[] = [];


  public edittab: any = [];
  //public tab = GLOBAL._db.members;
  constructor(private httpClient: HttpClient) { }
  saveMember(member: Members): Promise<Members> {
    return this.httpClient.post<Members>('http://localhost:8080/employes/add', member).toPromise();
    /*const memberToSave =  {...member,}
    memberToSave.id = member.id??Math.ceil(Math.random()*10000).toString();
    memberToSave.createDate = member.createDate??new Date().toString();
    this.tab=[memberToSave,...this.tab.filter(item => item.id!==memberToSave.id)];
    return new Promise(resolve => resolve(memberToSave));*/
  }
  saveEnseignant(member: Members): Promise<Members> {
    return this.httpClient.post<Members>('http://localhost:9000/MEMBRE-SERVICE/membres/enseignant', member).toPromise();
  }
  getMemberById(id: string): Promise<Members> {
    return this.httpClient.get<Members>('http://localhost:8080/employes/find/' + id).toPromise();
    /*return new Promise(resolve => resolve(
      this.tab.filter(item => item.id===id)[0]??null));*/
  }

  RemoveMemberById(id: string): Promise<void> {
    return this.httpClient.delete<void>('http://localhost:9000/MEMBRE-SERVICE/membres/' + id).toPromise();

    /*this.tab=this.tab.filter(item => item.id!=id);
    return new Promise(resolve => resolve());*/

  }

  /*GetALLMembers(): Promise<Member[]> {
    //this.httpClient.get<Member>('linkToRestAPI',member).toPromise();
    return new Promise(resolve => resolve(this.tab));

  }*/
  GetALL(): Promise<Members[]> {
    return this.httpClient.get<Members[]>('http://localhost:8080/employes').toPromise();

  }

  GetEnseignant(): Promise<Members[]> {
    return this.httpClient.get<any[]>('http://localhost:9000/MEMBRE-SERVICE/enseignant').toPromise();

  }
  EditMember(id: any, member: Members): Promise<Members> {
    return this.httpClient.put<Members>('http://localhost:9000/MEMBRE-SERVICE/membres/etudiant/' + id, member).toPromise();


  }
  getMemberByCompte(id: any): Promise<Members> {
    return this.httpClient.get<Members>('http://localhost:9000/MEMBRE-SERVICE/Compte/' + id).toPromise();
    /*return new Promise(resolve => resolve(
      this.tab.filter(item => item.id===id)[0]??null));*/
  }

   getfullMembre(id: any): Promise<Members> {
    return this.httpClient.get<Members>('http://localhost:9000/MEMBRE-SERVICE/fullmember/' + id).toPromise();
    /*return new Promise(resolve => resolve(
      this.tab.filter(item => item.id===id)[0]??null));*/
  }
   GetSiteEmploye(id: any): Promise<Sites> {
    return this.httpClient.get<any>('http://localhost:8080/employes/site'+id).toPromise();

  }

  GetSites(): Promise<Sites[]> {
    return this.httpClient.get<any[]>('http://localhost:8080/sites/').toPromise();

  }
  GetFomations(id : any): Promise<Publications[]> {
    return this.httpClient.get<any[]>('http://localhost:8080/employes/formations/'+id).toPromise();

  }

  // GetSite(id: any): Promise<Sites> {
  //   return this.httpClient.get<Sites>('http://localhost:8080/sites/{id}/' + id).toPromise();
  //   /*return new Promise(resolve => resolve(
  //     this.tab.filter(item => item.id===id)[0]??null));*/
  // }

  
  


}
