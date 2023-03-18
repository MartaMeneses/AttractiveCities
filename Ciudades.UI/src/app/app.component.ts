import { Component, OnInit } from '@angular/core';
import {Country} from './models/country';
import {CountryService} from './services/country.service'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Ciudades.UI';
  searchTerm : string = "";
  countryList: Country[] = [];

  countryList$ : Observable<Country[]> = this.countryService.getCountries();

  constructor(private countryService: CountryService){
    
  }

  ngOnInit() : void{
    this.countryService
    .getCountries().
    subscribe((result: Country[]) => (this.countryList = result));
  }

}
