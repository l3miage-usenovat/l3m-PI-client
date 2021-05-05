import { AppComponent } from './app.component';
import { CreationDefisComponent } from './creation-defis/creation-defis.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : 'chemin', component: CreationDefisComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
