import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sites } from 'src/Models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private httpClient: HttpClient) { }

 // test webhooks
  public tab1: Sites[] = [];
  saveSite(site: Sites): Promise<Sites> {
    return this.httpClient.post<Sites>('http://10.66.13.85:32001/api/test/sites/add', site).toPromise();

  }
 

  getSiteById(id: string): Promise<Sites> {
    return this.httpClient.get<Sites>('http://10.66.13.85:32001/api/test/sites/find/' + id).toPromise();
  
  }

  RemoveSiteById(id: string): Promise<void> {
    return this.httpClient.delete<void>('http://10.66.13.85:32001/api/test/sites/delete/' + id).toPromise();


  }

  
  GetALL(): Promise<Sites[]> {
    return this.httpClient.get<any[]>('http://10.66.13.85:32001/api/test/sites').toPromise();

  }
  EditSite(id: any, site: Sites): Promise<Sites> {
    return this.httpClient.put<Sites>('http://10.66.13.85:32001/api/test/' + id, site).toPromise();


  }

}
