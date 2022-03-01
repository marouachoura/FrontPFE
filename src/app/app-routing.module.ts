import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArtilcesComponent } from './artilces/artilces.component';

//import { LoginComponent } from './logi/login.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { MembreListComponent } from './membre-list/membre-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Layoutmembre } from './layoutmembre/layoutmembre';
import { EnseignantFormComponent } from './enseignant-form/enseignant-form.component';
import { EmploueFormationDetailComponent } from './emploue-formation-detail/emploue-formation-detail.component';
import { AuthGuard } from './auth.guard';
import { SitesComponent } from './sites/sites.component';
import { SitesFormComponent } from './sites-form/sites-form.component';
const routes: Routes = [

  { path: 'members', pathMatch: 'full', component: MembreListComponent , canActivate : [AuthGuard] },
  { path: 'formations', pathMatch: 'full', component: ArtilcesComponent, canActivate : [AuthGuard]},
  { path: 'sites', pathMatch: 'full', component: SitesComponent , canActivate : [AuthGuard] },

  { path: 'FormMembre', pathMatch: 'full', component: MemberFormComponent , canActivate : [AuthGuard]},
  { path: 'FormEnseignant', pathMatch: 'full', component: EnseignantFormComponent ,canActivate : [AuthGuard] },


  { path: 'FormPub', pathMatch: 'full', component: ArticleFormComponent  ,  canActivate : [AuthGuard]},
  { path: 'FormSite', pathMatch: 'full', component: SitesFormComponent  ,  canActivate : [AuthGuard]},
  //pour créer une variable dynamique fil path naamlou :im il variable
  { path: 'members/:id/edit', pathMatch: 'full', component: MemberFormComponent ,canActivate : [AuthGuard] },
  { path: 'formations/:id/edit', pathMatch: 'full', component: ArticleFormComponent ,canActivate : [AuthGuard] },
  { path: 'sites/:id/edit', pathMatch: 'full', component: SitesFormComponent ,canActivate : [AuthGuard] },
 


  { path: 'members/:id/formationsDetail', pathMatch: 'full', component: EmploueFormationDetailComponent , canActivate : [AuthGuard] },
  //{ path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'members' },
  //{ path: '**', redirectTo: 'members' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: Layoutmembre },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
