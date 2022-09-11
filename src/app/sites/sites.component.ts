import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Sites } from 'src/Models/site.model';
import { SiteService } from 'src/Services/site.service';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  templateadmin=false;
  dataSource: MatTableDataSource<Sites> = new MatTableDataSource(this.ms.tab1);
  displayedColumns: string[] = ["id", "nomSite", "Actions"];
  roles:any;
  ad:any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private ms: SiteService, private router: Router, private dialog: MatDialog,private tokenStorage: TokenStorageService) {
    this.dataSource = new MatTableDataSource(this.ms.tab1);
  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    // nlanci thread de type observable :no93ed netssana mba3d massakarha il user w nestana il retour de la type boolean 
    dialogRef.afterClosed().subscribe(
      isDeleted => {
        if (isDeleted) {
          //exécute de code de la suppression 
          console.log(id);
          this.ms.RemoveSiteById(id).then(() => this.GetSites());

        }
      }

    )
  }
  GetSites(): void {

    this.ms.GetALL()
      .then((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;

      });
    //console.log(this.dataSource.data);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


  }


  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
    
      if(this.roles=='ROLE_ADMIN'){
        this.templateadmin=true;
      }
     
    }
    

    this.GetSites();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
      if(this.roles=='ROLE_ADMIN'){
        this.ad=true;
      }
  }


}

}
