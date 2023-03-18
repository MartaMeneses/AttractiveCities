import { Injectable } from '@angular/core';
import {City} from '../models/city';
import {Flow} from '../models/flow';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private url = "City";
  constructor(private http: HttpClient) { }

  public getCities(insertValue : string) : Observable<City[]> {
    return this.http.get<City[]>(`${environment.apiUrl}/City/${insertValue}`);
  }
  public getCity(insertValue : number) : Observable<City[]>{
    return this.http.get<City[]>(`${environment.apiUrl}/GetCity/${insertValue}`);
  }
  public getCompetitor (insertValue : number) : Observable<Flow[]>{
    return this.http.get<Flow[]>(`${environment.apiUrl}/GetCompetitor/${insertValue}`);
  }
}
