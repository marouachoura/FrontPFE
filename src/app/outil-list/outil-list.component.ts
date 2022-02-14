import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Outils } from 'src/Models/outil.model';
import { OutilService } from 'src/Services/outil.service';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-outil-list',
  templateUrl: './outil-list.component.html',
  styleUrls: ['./outil-list.component.css']
})
export class OutilListComponent implements OnInit {
  dataSource: MatTableDataSource<Outils> = new MatTableDataSource(this.ms.tab2);
  displayedColumns: string[] = ["source", "date", "Actions"];
  roles:any;
  ad:any;
  constructor(private ms: OutilService, private router: Router, private dialog: MatDialog,private tokenStorage: TokenStorageService) {
    this.dataSource = new MatTableDataSource(this.ms.tab2);
  }

  delete(id: string) {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {})
    // nlanci thread de type observable :no93ed netssana mba3d massakarha il user w nestana il retour de la type boolean 
    dialogRef.afterClosed().subscribe(
      isDeleted => {
        if (isDeleted) {
          //exécute de code de la suppression 
          console.log(id);
          this.ms.RemoveToolById(id).then(() => this.GetTools());

        }
      }

    )
  }
  GetTools(): void {

    this.ms.GetALL()
      .then((data) => {
        this.dataSource.data = data;
      });
    //console.log(this.dataSource.data);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


  }


  ngOnInit(): void {
    this.GetTools();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
      if(this.roles=='ROLE_ADMIN'){
        this.ad=true;
      }
  }
  }



}
