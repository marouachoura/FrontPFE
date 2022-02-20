import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Publications } from 'src/Models/article.model';
import { MembersService } from 'src/Services/members.service';

@Component({
  selector: 'app-emploue-formation-detail',
  templateUrl: './emploue-formation-detail.component.html',
  styleUrls: ['./emploue-formation-detail.component.css']
})
export class EmploueFormationDetailComponent implements OnInit {

  currentid: any;
  dataSource: MatTableDataSource<Publications> = new MatTableDataSource(this.ms.tab);
  displayedColumns: string[] = ["nomFormation", "nomFormateur", "niveau", "certification", "duree"];
  roles:any;
  ad:any;
  constructor(private ms: MembersService, private router: Router ,private acivateRoute: ActivatedRoute ) {
    this.dataSource = new MatTableDataSource(this.ms.tab);
  }

 
  ngOnInit(): void {
    this.currentid = this.acivateRoute.snapshot.params.id;
    this.ms.GetFomations(this.currentid)
      .then((data) => {
        this.dataSource.data = data;
      });
    //console.log(this.dataSource.data);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


  }


}
