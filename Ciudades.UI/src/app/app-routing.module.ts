import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ProfileComponent} from './profile/profile.component'
import {SeleccionCiudadesComponent} from './seleccion-ciudades/seleccion-ciudades.component'
import { SimulatorComponent } from './simulator/simulator.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
