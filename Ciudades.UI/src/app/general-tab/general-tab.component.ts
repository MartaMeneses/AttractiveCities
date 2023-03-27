import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { City } from 'src/app/models/city';
import { Flow } from 'src/app/models/flow';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle, NgApexchartsModule, ApexFill} from "ng-apexcharts";
import { CityService } from '../services/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, elementAt } from 'rxjs';
import { LinkService } from '../services/link.service';
import { CountryService } from '../services/country.service';
import { Country } from '../models/country';

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

  targetcity : string[] = []; //current cities properties
  competitor : number[] = []; //cities properties of the competitor
  competitorsName : string[] = []; //list of competitors
  competitors1Values : number[] =[];
  competitors2Values : number[] =[];
  competitors3Values : number[] =[];
  competitorsValues : number[] =[];
  competitorValues : number[] =[];
  resultSum : number[] =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  resultMedia :number[] =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

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
    let resultValues : string[] =[]; 
    resultValues = Object.values(result[0]);
    this.targetcity = resultValues.slice(3);
    this.countryService
    //TAKE THE REGION OF THE CITY
    .getRegion(resultValues[2]).
    subscribe((result: Country[]) => {
      let resultValues : number[] =[]; 
      resultValues = Object.values(result[0]);
      this.countryService
      //TAKE THE COUNTRIES IN THAT REGION
        .getCountriesRegion(resultValues[2]).
        subscribe((result: Country[]) => {

          //FUNCION MEDIA
          let countryValues;
          let cityValues : number[] = [];
          let contador = 0;

          for (let i = 0; i < result.length; i++) {
            countryValues = Object.values(result[i]);
            this.cityService.
            getCities(countryValues[0]).
            subscribe((result1: City[]) => {
              for (let j = 0; j < result1.length; j++) {
                cityValues = Object.values(result1[j]); 
                cityValues = cityValues.slice(3);
                contador = contador +1;
                for (let k = 0; k < cityValues.length; k++) {
                  this.resultSum[k] = this.resultSum[k]  + cityValues[k];
                //Se calcula la media
                  if ( k== (cityValues.length -1) && j== (result1.length -1) &&i ==result.length -1){
                    for (let x = 0; x < this.resultSum.length; x++) {
                      this.resultMedia[x] = Math.round(this.resultSum[x]/contador);
                    }
                    this.competitor = this.resultMedia;
                    console.log("MEDIA", this.competitor);
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
                      
                        //CREATE GRAPH
                        this.createGraph();
                      });

                    });
                  }
                }
                console.log("SUMA", this.resultSum);
              }
            }
            );
          }
      });
    });

  });

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


function value(value: City[]): void {
  throw new Error('Function not implemented.');
}

