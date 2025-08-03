import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExcersisesComponent } from './components/excersises/excersises.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { url } from 'inspector';
import { OpenaiAnalysisComponent } from './components/openai-analysis/openai-analysis.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'exercises', component:ExcersisesComponent,data: { breadcrumb: 'Home' ,URL:'' }},
  {path:'analysis', component:AnalysisComponent,data: { breadcrumb: 'Exercise', URL:'exercises' }},
  {path:'openai-analysis', component:OpenaiAnalysisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
