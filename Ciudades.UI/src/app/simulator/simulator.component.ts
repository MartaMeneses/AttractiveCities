import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { CityService } from '../services/city.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent  implements OnInit {

  cities: City[] | undefined;
  slug !: number;

  constructor(private cityService: CityService, private route: ActivatedRoute, private router : Router){
  }

  ngOnInit() : void{
    let route$ = this.route.params;
    route$.subscribe((route) => {this.slug = route['slug']});
    this.cityService
    .getCity(this.slug).
    subscribe((result: City[]) => (this.cities = result));
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
    city.social_activity = Number(city.social_activity.toFixed(1)); // Round to 1 decimal place
    city.expat_exp = Number(city.expat_exp.toFixed(1));
    city.ethics = Number(city.ethics.toFixed(1));
    city.equality = Number(city.equality.toFixed(1));
    city.human_cap = Number(city.human_cap.toFixed(1)); // Round to 1 decimal place
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
    city.netRealIncome = Number(city.netRealIncome.toFixed(1)); // Round to 1 decimal place
    city.costofLife = Number(city.costofLife.toFixed(1)); // Round to 1 decimal place

  }
  getOverallScore(city: City): number {
    const weights = [0.2*0.17665, 0.1*0.17665, 0.1*0.17665, 0.1*0.17665, 0.15 *0.17665,0.05*0.17665, 0.1*0.17665, 0.05*0.17665, 0.15*0.17665,
    0.25*18465,  0.25*18465, 0.25*18465, 0.25*18465, 0.2*0.1387, 0.5*0.1387, 0.3*0.1387, 0.025, 0.025, 0.025, 0.025,
    0.025, 0.025, 0.025, 0.025, 0.025, 0.025, 0.050, 0.050];
    const attributes = [city.history, city.governance, city.reputation, city.space, city.climate, city.georisk, city.geoeconomics, city.gastronomy, city.branding,
      city.social_activity, city.expat_exp, city.ethics, city.equality, city.human_cap, city.smartcities, city.innovation, city.digitalGovernment, city.education,
      city.employability, city.connection, city.health, city.sustainability, city.tourism, city.urbanMobility, city.urbanPlanning, city.safety, city.netRealIncome, city.costofLife];
    let result = 0;
    for (let i = 0; i < weights.length; i++) {
      result += weights[i] * attributes[i];
    }
    console.log("social",city.social_activity);
    result = Number(result.toFixed(1)); // Round to 1 decimal place
    return result;
}

}
