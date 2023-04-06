import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { City } from 'src/app/models/city';
import { Flow } from 'src/app/models/flow';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexTitleSubtitle, NgApexchartsModule, ApexFill} from "ng-apexcharts";
import { CityService } from '../services/city.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, elementAt } from 'rxjs';

export interface KeyCard {
  colorFont: string,
  metric :string,
  label : string,
  icon:string
}

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart ;
  xaxis: ApexXAxis ;
  title: ApexTitleSubtitle ;
  fill : ApexFill;
};

@Component({
  selector: 'app-secondcompetitor-tab',
  templateUrl: './secondcompetitor-tab.component.html',
  styleUrls: ['./secondcompetitor-tab.component.css']
})
export class SecondcompetitorTabComponent {


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
      .getCity(competitors[2]).
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
        name: "TARGET CITY",
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
      categories: ["I-History", "I-Governance", "I-Reputation", "I-Space", "I-Climate", "I-Georisk", "I-Geoeconomics",
      "I-Gastronomy", "I-Branding", "D-Social Activity", "D-Expat", "D-Ethics", "D-Equality", "ST-Human Capital", "ST-Smart Cities Plan",
      "ST-Innovation", "SE-Digital Government", "SE-Education", "SE-Employability", "SE-Connectivity", "SE-Health/Social Services", "SE-Sustainability",
    "SE-Culture & Tourism", "SE-Urban Mobility", "SE-Urban Planning", "SE-Safety", "NPP-Income", "NPP-Net Purchase Power"]
    }
  };
  }

  createCards(){
    const startIndex = [0,9,13,16,27];
    const endIndex = [8,12,15,25,27];
    const labels = ["Identity (I)", "Dynamism (D)", "Strategy (ST)", "Services (SE)", "Net Purchase Power (NPP)"]
    let color = "";
    let icono= "";
    for (let i = 0; i < 5; i++) {
      let sum1: number= this.competitor.slice(startIndex[i], endIndex[i] + 1).reduce((a, b) => a + b, 0);
      let sum2: number= this.targetcity.slice(startIndex[i], endIndex[i] + 1).reduce((a, b) => a + b, 0);
      let average1: number = (sum1 / (endIndex[i] - startIndex[i] + 1));
      let average2: number = (sum2 / (endIndex[i] - startIndex[i] + 1));
      let metrica =  (average2 -average1);
      let metric = metrica.toFixed(2);
      if(metrica < 0) {
        color= "red",
        icono= "error_circle"
      }
     else if(metrica == 0) {
      color= "yellow",
      icono= "help_circle"
    } else if(metrica > 0) {
      color= "green",
      icono= "check_circle"
    };
      this.keyCards[i] = { metric: metric, label: labels[i], colorFont: color,icon:icono };
    }
  }

}














