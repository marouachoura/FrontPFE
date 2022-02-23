import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publications } from 'src/Models/article.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  public tab1: Publications[] = [];
  constructor(private httpClient: HttpClient) { }
  savePub(pub: Publications): Promise<Publications> {
    return this.httpClient.post<Publications>('http://localhost:8080/api/test/formations/add', pub).toPromise();

  }
  affecter(idPub:any,idmembre: any): Promise<void> {
    return this.httpClient.get<void>('http://localhost:9000/MEMBRE-SERVICE/affecterAuteurToPub/' + idPub +'/' +idmembre).toPromise();

    /*this.tab=this.tab.filter(item => item.id!=id);
    return new Promise(resolve => resolve());*/

  }

  getPubById(id: string): Promise<Publications> {
    return this.httpClient.get<Publications>('http://localhost:8080/api/test/formations/find/' + id).toPromise();
    /*return new Promise(resolve => resolve(
      this.tab.filter(item => item.id===id)[0]??null));*/
  }

  RemovePubById(id: string): Promise<void> {
    return this.httpClient.delete<void>('http://localhost:8080/api/test/formations/delete/' + id).toPromise();

    /*this.tab=this.tab.filter(item => item.id!=id);
    return new Promise(resolve => resolve());*/

  }

  /*GetALLMembers(): Promise<Member[]> {
    //this.httpClient.get<Member>('linkToRestAPI',member).toPromise();
    return new Promise(resolve => resolve(this.tab));

  }*/
  GetALL(): Promise<Publications[]> {
    return this.httpClient.get<any[]>('http://localhost:8080/api/test/formations').toPromise();

  }
  EditPub(id: any, pub: Publications): Promise<Publications> {
    return this.httpClient.put<Publications>('http://localhost:8080/api/test/formation/update/' + id, pub).toPromise();


  }

}
