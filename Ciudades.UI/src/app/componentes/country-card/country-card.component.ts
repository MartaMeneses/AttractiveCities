import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { Router } from '@angular/router';
import { LinkService } from 'src/app/services/link.service';


@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css']
})
export class CountryCardComponent implements OnInit {
  @Input() country !: Country;

  constructor(private linkService : LinkService, private router : Router) { }

  ngOnInit(): void { }
  
  navigate(country : string){
    this.router.navigate(['/City', country]); 
  }
}
