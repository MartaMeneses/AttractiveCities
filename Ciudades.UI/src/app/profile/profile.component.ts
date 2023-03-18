import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  @Input() cityList !: City[];
  slug !: number;
  city !: City[];
  cityAcronym : string = "City"

  constructor(private cityService: CityService, private route: ActivatedRoute, private router : Router){
  }

  ngOnInit() : void{
    let route$ = this.route.params;
    route$.subscribe((route) => {this.slug = route['slug']});
    this.cityService
    .getCity(this.slug).
    subscribe((result: City[]) => (this.city = result));
  }
  navigate(){
    this.router.navigate(['/Simulator', this.slug]); 
  }


  

}
