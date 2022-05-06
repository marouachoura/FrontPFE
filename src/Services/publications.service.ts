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
    return this.httpClient.post<Publications>('http://10.66.13.85:32000/api/test/formations/add', pub).toPromise();

  }
 

  getPubById(id: string): Promise<Publications> {
    return this.httpClient.get<Publications>('http://10.66.13.85:32000/api/test/formations/find/' + id).toPromise();
    /*return new Promise(resolve => resolve(
      this.tab.filter(item => item.id===id)[0]??null));*/
  }

  RemovePubById(id: string): Promise<void> {
    return this.httpClient.delete<void>('http://10.66.13.85:32000/api/test/formations/delete/' + id).toPromise();

    /*this.tab=this.tab.filter(item => item.id!=id);
    return new Promise(resolve => resolve());*/

  }


  GetALL(): Promise<Publications[]> {
    return this.httpClient.get<any[]>('http://10.66.13.85:32000/api/test/formations').toPromise();

  }
  EditPub(id: any, pub: Publications): Promise<Publications> {
    return this.httpClient.put<Publications>('http://10.66.13.85:32000/api/test/formation/update/' + id, pub).toPromise();


  }

}
