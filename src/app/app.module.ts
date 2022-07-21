import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { PortfolioWrapperComponent } from './portfolio-wrapper/portfolio-wrapper.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { HomeHomeComponent } from './home-home/home-home.component';
import { HomeSkillComponent } from './home-skill/home-skill.component';
import { HomeBusinessComponent } from './home-business/home-business.component';
import { HomePrivateComponent } from './home-private/home-private.component';
import { ImprintDataprotectionComponent } from './imprint-dataprotection/imprint-dataprotection.component';

@NgModule({
  declarations: [
    AppComponent,
    
    LandingComponent,
    PortfolioWrapperComponent,
    HomeComponent,
    ProjectsComponent,
    AboutMeComponent,
    ContactComponent,
    HomeHomeComponent,
    HomeSkillComponent,
    HomeBusinessComponent,
    HomePrivateComponent,
    ImprintDataprotectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
