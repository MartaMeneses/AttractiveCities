import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { City } from 'src/app/models/city';
import { Flow } from 'src/app/models/flow';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle, NgApexchartsModule, ApexFill} from "ng-apexcharts";
import { CityService } from '../services/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, elementAt } from 'rxjs';
import { LinkService } from '../services/link.service';
import { CountryService } from '../services/country.service';

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
  competitorsName : string[] = []; //list of competitors
  competitors1Values : number[] =[];
  competitors2Values : number[] =[];
  competitors3Values : number[] =[];
  competitorsValues : number[] =[];
  competitorValues : number[] =[];

  buttonClicked: number =0;
  constructor(private cityService: CityService, private countryService: CountryService, private route: ActivatedRoute, private router : Router,private assService : LinkService){}

ngOnInit(): void {
this.fetchCaracteristics();
}


emitReport(city : City[]) {
 this.assService.emitReportEvent(city);
}



 fetchCaracteristics(): void{
  let route$ = this.route.params;
  route$.subscribe((route) => {
    this.slug = route['slug']
  });


  this.cityService
  .getCity(this.slug).
  subscribe((result: City[]) => {
    let resultValues : number[] =[]; 
    resultValues = Object.values(result[0]);
    this.targetcity = resultValues.slice(3);

    //TAKE DATA OF THE COMPETITORS NAMES
    this.cityService
    .getCompetitor(this.slug).
    subscribe((result: Flow[]) => {
      let competitors= Object.values(result[0]);
      this.cityService
      .getCity(competitors[1]).
      subscribe((result: City[]) => {
        let competitorValues = Object.values(result[0]);
        this.competitorsName[0] = competitorValues[1];
        this.competitors1Values = competitorValues.slice(3);
      });
      this.cityService
      .getCity(competitors[2]).
      subscribe((result: City[]) => {
        let competitorValues = Object.values(result[0]);
        this.competitorsName[1] = competitorValues[1];
        this.competitors2Values = competitorValues.slice(3);
        
      });
      this.cityService
      .getCity(competitors[3]).
      subscribe((result: City[]) => {
        let competitorValues = Object.values(result[0]);
        this.competitorsName[2] = competitorValues[1];
        this.competitors3Values = competitorValues.slice(3);
        this.competitorsValues =sumLists(this.competitors1Values,this.competitors2Values,this.competitors3Values);
        console.log( this.competitorsValues);
      });
      this.cityService
      .getCity(179).
      subscribe((result: City[]) => {
        let competitorValues = Object.values(result[0]);
        this.competitor = competitorValues.slice(3);
         //CREATE GRAPH
        this.createGraph();
      } );
    } );
  } );

  function sumLists(list1: number[], list2: number[],  list3: number[]): number[] {
    let result: number[] = [];
    let media: number  =0;
    for (let i = 0; i < list1.length; i++) {
      media = Math.round(((list1[i] + list2[i] + list3[i])/3));
      result.push(media);
    }
    return result;
  }
  
}

createGraph():void{
  this.comparativa = {
    series: [
      {
        name: "TARGET CITY",
        data: this.targetcity
      },
      {
        name: "COMPETITOR CITIES",
        data: this.competitorsValues
      },
      {
        name: "OVERALL REGION CITIES",
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
      text: "Comparative Graph with the overall scores of the 175 cities",
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
    "Innovation", "Digital Government", "Education", "Employability", "Connectivity", "Health", "Sustainability",
  "Culture & Tourism", "Urban Mobility", "Urban Planning", "Safety", "Income", "Net Purchase Power"]
    }
  };
  }

}


