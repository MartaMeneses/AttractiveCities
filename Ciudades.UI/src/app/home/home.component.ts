import { Component, OnInit } from '@angular/core';
import {Country} from '../models/country';
import {CountryService} from '../services/country.service'
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
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
    console.log(this.countryList);
  }

}
