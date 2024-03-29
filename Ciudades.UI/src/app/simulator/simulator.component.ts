import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { CityService } from '../services/city.service';
import { MatTableDataSource } from '@angular/material/table';
import { Flow } from '../models/flow';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent  implements OnInit {

  cities: City[] | undefined;
  competitors1Values : number[] =[];
  competitors2Values : number[] =[];
  competitors3Values : number[] =[];
  competitorsValues : number[] =[];
  competitorValues : number[] =[];
  competitor1 : City[] | undefined;
  competitor2 : City[] | undefined;
  competitor3 : City[] | undefined;
  competitors_score: number = 0;
  slug !: number;
  competitorsName : string[] = []; //list of competitors

  constructor(private cityService: CityService, private route: ActivatedRoute, private router : Router){
  }

  ngOnInit() : void{
    let route$ = this.route.params;
    route$.subscribe((route) => {this.slug = route['slug']});
    this.cityService
    //TAKE THE TARGET CITY
    .getCity(this.slug).
    subscribe((result: City[]) => {
      this.cities = result;
      } );
      //TAKE THE COMPETITORS ID
      this.cityService
      .getCompetitor(this.slug).
      subscribe((result: Flow[]) => {
        let competitors= Object.values(result[0]);
        this.cityService
        .getCity(competitors[1]).
        subscribe((result: City[]) => {
          this.competitor1 = result;
          let competitorValues = Object.values(result[0]);
          this.competitorsName[0] = competitorValues[1];
          this.competitors1Values = competitorValues.slice(3);
        });
        this.cityService
        .getCity(competitors[2]).
        subscribe((result: City[]) => {
          this.competitor2 = result;
          let competitorValues = Object.values(result[0]);
          this.competitorsName[1] = competitorValues[1];
          this.competitors2Values = competitorValues.slice(3);
          
        });
        this.cityService
        .getCity(competitors[3]).
        subscribe((result: City[]) => {
          this.competitor3 = result;
          let competitorValues = Object.values(result[0]);
          this.competitorsName[2] = competitorValues[1];
          this.competitors3Values = competitorValues.slice(3);
          this.competitorsValues =sumLists(this.competitors1Values,this.competitors2Values,this.competitors3Values);
          
          function sumLists(list1: number[], list2: number[],  list3: number[]): number[] {
            let result: number[] = [];
            let media: number  =0;
            for (let i = 0; i < list1.length; i++) {
              media = Math.round(((list1[i] + list2[i] + list3[i])/3));
              result.push(media);
            }
            return result;
          }
          this.competitors_score = this.getOverallScoreCompetitors(this.competitorsValues);
          });
        });                
  }

  
  onAttributeChange(city: City): void {
    city.history = Number(city.history.toFixed(1)); // Round to 1 decimal place
    city.governance = Number(city.governance.toFixed(1));
    city.reputation = Number(city.reputation.toFixed(1));
    city.space = Number(city.space.toFixed(1));
    city.climate = Number(city.climate.toFixed(1)); // Round to 1 decimal place
    city.georisk = Number(city.georisk.toFixed(1));
    city.geoeconomics = Number(city.geoeconomics.toFixed(1));
    city.gastronomy = Number(city.gastronomy.toFixed(1));
    city.branding = Number(city.branding.toFixed(1)); // Round to 1 decimal place
    city.socialActivity = Number(city.socialActivity.toFixed(1)); // Round to 1 decimal place
    city.expatExp = Number(city.expatExp.toFixed(1));
    city.ethics = Number(city.ethics.toFixed(1));
    city.equality = Number(city.equality.toFixed(1));
    city.humanCap = Number(city.humanCap.toFixed(1)); // Round to 1 decimal place
    city.smartcities = Number(city.smartcities.toFixed(1));
    city.innovation = Number(city.innovation.toFixed(1));
    city.digitalGovernment = Number(city.digitalGovernment.toFixed(1));
    city.education = Number(city.education.toFixed(1)); // Round to 1 decimal place
    city.employability = Number(city.employability.toFixed(1)); // Round to 1 decimal place
    city.connection = Number(city.connection.toFixed(1));
    city.health = Number(city.health.toFixed(1));
    city.sustainability = Number(city.sustainability.toFixed(1));
    city.tourism = Number(city.tourism.toFixed(1)); // Round to 1 decimal place
    city.urbanMobility = Number(city.urbanMobility.toFixed(1));
    city.urbanPlanning = Number(city.urbanPlanning.toFixed(1));
    city.safety = Number(city.safety.toFixed(1));
    city.income = Number(city.income.toFixed(1)); // Round to 1 decimal place
    city.netPurchasePower = Number(city.netPurchasePower.toFixed(1)); // Round to 1 decimal place

  }
  getOverallScore(city: City): number {
    const weights = [0.2*0.17665, 0.1*0.17665, 0.1*0.17665, 0.1*0.17665, 0.15 *0.17665,0.05*0.17665, 0.1*0.17665, 0.05*0.17665, 0.15*0.17665,
    0.25*0.18465,  0.25*0.18465, 0.25*0.18465, 0.25*0.18465, 0.2*0.1387, 0.5*0.1387, 0.3*0.1387, 0.0695*0.25, 0.114*0.25 ,0.1087*0.25 , 0.0601*0.25,
    0.1266*0.25, 0.1257*0.25, 0.0524*0.25, 0.1354*0.25, 0.0872*0.25, 0.1204*0.25, 0.0, 0.25];
    const attributes = [city.history, city.governance, city.reputation, city.space, city.climate, city.georisk, city.geoeconomics, city.gastronomy, city.branding,
      city.socialActivity, city.expatExp, city.ethics, city.equality, city.humanCap, city.smartcities, city.innovation, city.digitalGovernment, city.education,
      city.employability, city.connection, city.health, city.sustainability, city.tourism, city.urbanMobility, city.urbanPlanning, city.safety, city.income, city.netPurchasePower];
    let result = 0;
    for (let i = 0; i < weights.length; i++) {
      result += weights[i] * attributes[i];
    }
    result = Number(result.toFixed(1)); // Round to 1 decimal place
    return result;
}
getOverallScoreCompetitors(list: number []): number {
  const weights = [0.2*0.17665, 0.1*0.17665, 0.1*0.17665, 0.1*0.17665, 0.15 *0.17665,0.05*0.17665, 0.1*0.17665, 0.05*0.17665, 0.15*0.17665,
    0.25*0.18465,  0.25*0.18465, 0.25*0.18465, 0.25*0.18465, 0.2*0.1387, 0.5*0.1387, 0.3*0.1387, 0.0695*0.25, 0.114*0.25 ,0.1087*0.25 , 0.0601*0.25,
    0.1266*0.25, 0.1257*0.25, 0.0524*0.25, 0.1354*0.25, 0.0872*0.25, 0.1204*0.25, 0.0, 0.25];
  const attributes = list;
  let result = 0;
  for (let i = 0; i < weights.length; i++) {
    result += weights[i] * attributes[i];
  }
  result = Number(result.toFixed(1)); // Round to 1 decimal place
  console.log("RESULT", result);
  return result;
}

}
