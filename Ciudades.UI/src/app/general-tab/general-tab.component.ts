import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { City } from 'src/app/models/city';
import { Flow } from 'src/app/models/flow';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle, NgApexchartsModule, ApexFill} from "ng-apexcharts";
import { CityService } from '../services/city.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, elementAt } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart ;
  xaxis: ApexXAxis ;
  title: ApexTitleSubtitle ;
  fill : ApexFill;
};

@Component({
  selector: 'app-general-tab',
  templateUrl: './general-tab.component.html',
  styleUrls: ['./general-tab.component.css']
})
export class GeneralTabComponent implements OnInit{

  @Input() cityList !: City[];
  @ViewChild("chart")
  flow !: City[];
  cities$ : BehaviorSubject<City[]> = new BehaviorSubject<City[]>([]);
  slug: number = 0;

  //Variables para el grafico
  chart!: ChartComponent;
  public comparativa: Partial<ChartOptions> | any;

  targetcity : number[] = []; //current cities properties
  competitor : number[] = []; //cities properties of the competitor

  constructor(private cityService: CityService, private route: ActivatedRoute){}

ngOnInit(): void {
this.fetchCaracteristics();
}

 fetchCaracteristics(): void{
  let route$ = this.route.params;
  route$.subscribe((route) => {
    this.slug = route['slug']
  });


  this.cityService
  .getCity(this.slug).
  subscribe((result: City[]) => {
    let resultValues = Object.values(result[0]);
    this.targetcity = resultValues.slice(3);

    //TAKE DATA OF THE COMPETITOR
    this.cityService
    .getCompetitor(this.slug).
    subscribe((result: Flow[]) => {
      let competitors= Object.values(result[0]);
      this.cityService
      .getCity(competitors[1]).
      subscribe((result: City[]) => {
        this.flow = result;

        let competitorValues = Object.values(result[0]);
        this.competitor = competitorValues.slice(3);
        
         //CREATE GRAPH
        this.createGraph();
      } );
    } );
  } );
  
}

createGraph():void{
  this.comparativa = {
    series: [
      {
        name: "TAREGT CITY",
        data: this.targetcity
      },
      {
        name: "COMPETITOR CITY",
        data: this.competitor
      }
    ],
    chart: {
      height: 2000,
      width: 900,
      type: "bar"
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      }
    },
    title: {
      text: "Comparative Graph with the First Competitor"
    },
    xaxis: {
      categories: ["History", "Governance", "Reputation", "Space", "Climate", "Georisk", "Geoeconomics",
    "Gastronomy", "Branding", "Social Activity", "Expat", "Ethics", "Equality", "Human Capital", "Smart Cities Plan",
    "Innovation", "Digital Government", "Education", "Employability", "Connection", "Health", "Sustainability",
  "Culture & Tourism", "Urban Mobility", "Urban Planning", "Safety", "Income", "Cost of Life"]
    }
  };
  }
}


