import { Injectable } from '@angular/core';
import {Country} from '../models/country';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url = "Country";
  constructor(private http: HttpClient) { }

  public getCountries() : Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiUrl}/Country`);
  }
  public getRegion(insertValue : string) : Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.apiUrl}/Country/${insertValue}`);
  }
  public getCountriesRegion(insertValue : number) : Observable<Country[]>{
    return this.http.get<Country[]>(`${environment.apiUrl}/GetCountriesRegion/${insertValue}`);
  }
}
