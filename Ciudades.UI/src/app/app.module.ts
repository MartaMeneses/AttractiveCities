import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryCardComponent } from './componentes/country-card/country-card.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassesPipe } from './pipes/classes.pipe';
import { SeleccionCiudadesComponent } from './seleccion-ciudades/seleccion-ciudades.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { GeneralTabComponent } from './general-tab/general-tab.component';
import { FirstcompetitorTabComponent } from './firstcompetitor-tab/firstcompetitor-tab.component';
import { SecondcompetitorTabComponent } from './secondcompetitor-tab/secondcompetitor-tab.component';
import { ThirdcompetitorTabComponent } from './thirdcompetitor-tab/thirdcompetitor-tab.component';
import { ArticleTabComponent } from './article-tab/article-tab.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimulatorComponent } from './simulator/simulator.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryCardComponent,
    FooterComponent,
    SidenavComponent,
    ClassesPipe,
    SeleccionCiudadesComponent,
    HomeComponent,
    ProfileComponent,
    GeneralTabComponent,
    FirstcompetitorTabComponent,
    SecondcompetitorTabComponent,
    ThirdcompetitorTabComponent,
    ArticleTabComponent,
    SimulatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
