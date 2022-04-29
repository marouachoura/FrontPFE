import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.httpClient.post<Members>('http://10.66.13.85:32000/api/test/employes/add', member).toPromise();
    
  }
  saveEnseignant(member: Members): Promise<Members> {
    return this.httpClient.post<Members>('http://10.66.13.85:32000/MEMBRE-SERVICE/membres/enseignant', member).toPromise();
  }
  getMemberById(id: string): Promise<Members> {
    return this.httpClient.get<Members>('http://10.66.13.85:32000/api/test/employes/find/' + id).toPromise();
    /*return new Promise(resolve => resolve(
      this.tab.filter(item => item.id===id)[0]??null));*/
  }

  RemoveMemberById(id: string): Promise<void> {
    return this.httpClient.delete<void>('http://10.66.13.85:32000/api/test/employes/delete/' + id).toPromise();

    /*this.tab=this.tab.filter(item => item.id!=id);
    return new Promise(resolve => resolve());*/

  }

  /*GetALLMembers(): Promise<Member[]> {
    //this.httpClient.get<Member>('linkToRestAPI',member).toPromise();
    return new Promise(resolve => resolve(this.tab));

  }*/
  GetALL(): Promise<Members[]> {
    return this.httpClient.get<Members[]>('http://10.66.13.85:32000/api/test/employes' ).toPromise();

  }

  GetEnseignant(): Promise<Members[]> {
    return this.httpClient.get<any[]>('http://10.66.13.85:32000/MEMBRE-SERVICE/enseignant').toPromise();

  }
  EditMember(id: any, member: Members): Promise<Members> {
    return this.httpClient.put<Members>('http://10.66.13.85:32000/MEMBRE-SERVICE/membres/etudiant/' + id, member).toPromise();


  }


   getfullMembre(id: any): Promise<Members> {
    return this.httpClient.get<Members>('http://10.66.13.85:32000/MEMBRE-SERVICE/fullmember/' + id).toPromise();
    /*return new Promise(resolve => resolve(
      this.tab.filter(item => item.id===id)[0]??null));*/
  }
   GetSiteEmploye(id: any): Promise<Sites> {
    return this.httpClient.get<any>('http://10.66.13.85:32000/api/test/employes/site'+id).toPromise();

  }

  GetSites(): Promise<Sites[]> {
    return this.httpClient.get<any[]>('http://10.66.13.85:32000/api/test/sites/').toPromise();

  }
  GetFomations(id : any): Promise<Publications[]> {
    return this.httpClient.get<any[]>('http://10.66.13.85:32000/api/test/employes/formations/'+id).toPromise();

  }


  public affecter(idEmp: number, idformation: number) {
    
    return this.httpClient.put<void>(`http://10.66.13.85:32000/api/test/employes/${idEmp}/formations/${idformation}`,{});
  }

  // GetSite(id: any): Promise<Sites> {
  //   return this.httpClient.get<Sites>('http://10.66.13.85:8080/sites/{id}/' + id).toPromise();
  //   /*return new Promise(resolve => resolve(
  //     this.tab.filter(item => item.id===id)[0]??null));*/
  // }

  
  


}
