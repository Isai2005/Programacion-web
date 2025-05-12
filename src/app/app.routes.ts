import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component'; 
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TablaEnviosComponent } from './modules/tabla-envios/tabla-envios.component';
import { TablaEntregasComponent } from './modules/tabla-entregas.component';
import { CrudEntregasComponent } from './modules/crud-entregas.component';
import { CargaArchivosComponent } from './carga-archivos/carga-archivos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'dashboard', component: DashboardComponent },
  { path: 'visualizacion', component: TablaEnviosComponent },
  { path: 'tabla', component: TablaEntregasComponent },
  { path: 'crud', component: CrudEntregasComponent },
  { path: 'carga', component: CargaArchivosComponent },
{ path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige la ruta raíz al login
  
];
