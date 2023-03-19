import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { City } from 'src/app/models/city';
import { Flow } from 'src/app/models/flow';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle, NgApexchartsModule, ApexFill} from "ng-apexcharts";
import { CityService } from '../services/city.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, elementAt } from 'rxjs';

export interface KeyCard {
  metric :string,
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
  selector: 'app-thirdcompetitor-tab',
  templateUrl: './thirdcompetitor-tab.component.html',
  styleUrls: ['./thirdcompetitor-tab.component.css']
})
export class ThirdcompetitorTabComponent {


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
  competitorsName : string[] = []; //list of competitors
  //Cards
  keyCards: KeyCard[] = [];

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
      .getCity(competitors[3]).
      subscribe((result: City[]) => {
        this.flow = result;
        let competitorValues = Object.values(result[0]);
        this.competitorsName[0] = competitorValues[1];
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
      text: 'Comparison of characteristics',
      align: 'center',
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'Arial',
        color: '#333'
      }
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

    for (let i = 0; i < 5; i++) {
      let sum1: number= this.competitor.slice(startIndex[i], endIndex[i] + 1).reduce((a, b) => a + b, 0);
      let sum2: number= this.targetcity.slice(startIndex[i], endIndex[i] + 1).reduce((a, b) => a + b, 0);
      let average1: number = (sum1 / (endIndex[i] - startIndex[i] + 1));
      let average2: number = (sum2 / (endIndex[i] - startIndex[i] + 1));
      let metrica =  (average2 -average1);
      let metric = metrica.toFixed(2);
      this.keyCards[i] = { metric: metric, label: labels[i] };
    }
  }

}














