import { AfterViewInit, Component,OnInit ,Input, ViewChild} from '@angular/core';
import { City} from 'src/app/models/city';
import { ActivatedRoute, Router} from '@angular/router';
import { CityService } from '../services/city.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-seleccion-ciudades',
  templateUrl: './seleccion-ciudades.component.html',
  styleUrls: ['./seleccion-ciudades.component.css']
})
export class SeleccionCiudadesComponent implements OnInit, AfterViewInit{
  
  @Input() city !: City;
  
  slug: string = "";
  // Table vars
    dataSource$ !: any;
    dataSource !: any;
    countryAcronym : string = "Country"

    displayedColumns = ['name'];

    constructor(private cityService :CityService, private route: ActivatedRoute, private router : Router) { }
    
    ngOnInit() : void{
      this.fetchCities();
      }

    ngAfterViewInit(): void {
      
    }
    navigate(city : string){
      this.router.navigate(['/Profile', city]); 
    }
      fetchCities(): void{
        let route$ = this.route.params;
        route$.subscribe((route) => {
          this.slug = route['slug']
        });
        this.cityService
        .getCities(this.slug).
        subscribe((result: City[]) => (this.dataSource = result));

        this.dataSource = new MatTableDataSource<City>(this.dataSource);
      }
  }
  
 
