import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/Services/token-storage.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css','../../assets/css/animate.css','../../assets/css/bootstrap.css','../../assets/css/font-awesome.min.css','../../assets/css/pe-icons.css','../../assets/css/prettyPhoto.css','../../assets/css/style.css']
})
export class FootertComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
  }
 
}
