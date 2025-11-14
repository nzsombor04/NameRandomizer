import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainviewComponent } from './components/mainview/mainview.component';

const routes: Routes = [
  {path: "", redirectTo: "mainview", pathMatch: 'full'},
  {path: "**", redirectTo: "mainview", pathMatch: 'full'},
  {path: "mainview", component: MainviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
