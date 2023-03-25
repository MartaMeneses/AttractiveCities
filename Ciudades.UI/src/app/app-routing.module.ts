import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstcompetitorTabComponent } from './firstcompetitor-tab/firstcompetitor-tab.component';
import { HomeComponent } from './home/home.component';
import {ProfileComponent} from './profile/profile.component'
import { SecondcompetitorTabComponent } from './secondcompetitor-tab/secondcompetitor-tab.component';
import {SeleccionCiudadesComponent} from './seleccion-ciudades/seleccion-ciudades.component'
import { SimulatorComponent } from './simulator/simulator.component';
import { ThirdcompetitorTabComponent } from './thirdcompetitor-tab/thirdcompetitor-tab.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'City/:slug',
    component: SeleccionCiudadesComponent
  },
  {
    path: 'Profile/:slug',
    component: ProfileComponent
  },
  {
    path: 'Simulator/:slug',
    component: SimulatorComponent
  },
  {
    path: 'FirstCompetitor',
    component: FirstcompetitorTabComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
