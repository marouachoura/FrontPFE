import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sites } from 'src/Models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private httpClient: HttpClient) { }


  public tab1: Sites[] = [];
  saveSite(site: Sites): Promise<Sites> {
    return this.httpClient.post<Sites>('http://localhost:8080/api/test/sites/add', site).toPromise();

  }
 

  getSiteById(id: string): Promise<Sites> {
    return this.httpClient.get<Sites>('http://localhost:8080/api/test/sites/find/' + id).toPromise();
  
  }

  RemoveSiteById(id: string): Promise<void> {
    return this.httpClient.delete<void>('http://localhost:8080/api/test/sites/delete/' + id).toPromise();


  }

  
  GetALL(): Promise<Sites[]> {
    return this.httpClient.get<any[]>('http://localhost:8080/api/test/sites').toPromise();

  }
  EditSite(id: any, site: Sites): Promise<Sites> {
    return this.httpClient.put<Sites>('http://localhost:8080/api/test/' + id, site).toPromise();


  }

}
