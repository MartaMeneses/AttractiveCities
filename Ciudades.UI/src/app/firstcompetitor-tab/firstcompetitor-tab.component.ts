import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { City } from 'src/app/models/city';
import { Flow } from 'src/app/models/flow';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle, NgApexchartsModule, ApexFill} from "ng-apexcharts";
import { CityService } from '../services/city.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, elementAt } from 'rxjs';

export interface KeyCard {
  metric :number,
  label : string
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart ;
  xaxis: ApexXAxis ;
  title: ApexTitleSubtitle ;
  fill : ApexFill;
};

@Component({
  selector: 'app-firstcompetitor-tab',
  templateUrl: './firstcompetitor-tab.component.html',
  styleUrls: ['./firstcompetitor-tab.component.css']
})
export class FirstcompetitorTabComponent {


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

  //Cards
  keyCardIdentity !: KeyCard;
  //keyCardDynamism !: KeyCard;
  //keyCardStrategy !: KeyCard;
  //keyCardServices !: KeyCard;
  //keyCardCostofLife !: KeyCard;

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
        this.createCards();
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

  createCards(){
    const startIndex = [0,9,13,16,26];
    const endIndex = [8,12,15,25,27];
    const labels = ["Identity", "Dynamism", "Strategy", "Services", "Cost of Life"]

    let sum = this.competitor.slice(startIndex[0], endIndex[0] + 1).reduce((a, b) => a + b, 0);
    let average = sum / (endIndex[0]- startIndex[0] + 1);
    this.keyCardIdentity = { metric: average, label: labels[0] };
    //console.log("Average", average);
    //sum = this.competitor.slice(startIndex[1], endIndex[1] + 1).reduce((a, b) => a + b, 0);
    //average = sum / (endIndex[1] - startIndex[1] + 1);
    //this.keyCardDynamism = { metric: average, label: labels[1] };
    //sum = this.competitor.slice(startIndex[2], endIndex[2] + 1).reduce((a, b) => a + b, 0);
    //average = sum / (endIndex[2] - startIndex[2] + 1);
    //this.keyCardStrategy = { metric: average, label: labels[2] };
    //sum = this.competitor.slice(startIndex[3], endIndex[3] + 1).reduce((a, b) => a + b, 0);
    //average = sum / (endIndex[3] - startIndex[3] + 1);
    //this.keyCardServices = { metric: average, label: labels[3] };
    //sum = this.competitor.slice(startIndex[4], endIndex[4] + 1).reduce((a, b) => a + b, 0);
    //average = sum / (endIndex[4] - startIndex[4] + 1);
    //this.keyCardCostofLife = { metric: average, label: labels[4] };
 
  }

}














