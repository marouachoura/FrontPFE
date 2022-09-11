import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Publications } from 'src/Models/article.model';
import { PublicationsService } from 'src/Services/publications.service';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-artilces',
  templateUrl: './artilces.component.html',
  styleUrls: ['./artilces.component.scss']
})
export class ArtilcesComponent implements OnInit {
  templateadmin=false;
  dataSource: MatTableDataSource<Publications> = new MatTableDataSource(this.ms.tab1);
  displayedColumns: string[] = ["nomFormation", "nomFormateur", "niveau", "certification", "duree", "Actions"];
  roles:any;
  ad:any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private ms: PublicationsService, private router: Router, private dialog: MatDialog,private tokenStorage: TokenStorageService) {
    this.dataSource = new MatTableDataSource(this.ms.tab1);
  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    // nlanci thread de type observable :no93ed netssana mba3d massakarha il user w nestana il retour de la type boolean 
    dialogRef.afterClosed().subscribe(
      isDeleted => {
        if (isDeleted) {
          //exécute de code de la suppression 
         // console.log(id);
          this.ms.RemovePubById(id).then(() => this.GetPubs());

        }
      }

    )
  }
  GetPubs(): void {

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
    

    this.GetPubs();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
      if(this.roles=='ROLE_ADMIN'){
        this.ad=true;
      }
  }


}
}
