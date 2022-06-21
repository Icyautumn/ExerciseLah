import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatecontactComponent } from './createcontact/createcontact.component';
import { DeletecontactComponent } from './deletecontact/deletecontact.component';
import { DisplaycontactComponent } from './displaycontact/displaycontact.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { UpdatecontactComponent } from './updatecontact/updatecontact.component';
import { WorkoutComponent } from './workout/workout.component';

const routes: Routes = [
  { path: 'nav', component: NavComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'createContact', component: CreatecontactComponent},
  { path: 'displayContact', component: DisplaycontactComponent},
  { path: 'updateContact', component: UpdatecontactComponent},
  { path: 'deleteContact', component: DeletecontactComponent},
  { path: 'workout', component: WorkoutComponent},
  { path: '', component: DisplaycontactComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
