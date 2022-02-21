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
const routes: Routes = [

  { path: 'members', pathMatch: 'full', component: MembreListComponent },
  { path: 'articles', pathMatch: 'full', component: ArtilcesComponent },

  { path: 'FormMembre', pathMatch: 'full', component: MemberFormComponent },
  { path: 'FormEnseignant', pathMatch: 'full', component: EnseignantFormComponent },


  { path: 'FormPub', pathMatch: 'full', component: ArticleFormComponent },
  //pour créer une variable dynamique fil path naamlou :im il variable
  { path: 'members/:id/edit', pathMatch: 'full', component: MemberFormComponent },
  { path: 'articles/:id/edit', pathMatch: 'full', component: ArticleFormComponent },
 


  { path: 'members/:id/formationsDetail', pathMatch: 'full', component: EmploueFormationDetailComponent },
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
