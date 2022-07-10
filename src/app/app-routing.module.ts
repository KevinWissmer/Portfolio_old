import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { PortfolioWrapperComponent } from './portfolio-wrapper/portfolio-wrapper.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'portfolio', component: PortfolioWrapperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
