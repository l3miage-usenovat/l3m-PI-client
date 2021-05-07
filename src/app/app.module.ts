import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { YagaModule } from '@yaga/leaflet-ng2';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

//////////////////////J'ai importé ça à cause des lignes que j'ai ajouté
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

import { AngularFireAuthModule } from '@angular/fire/auth';
 import { FormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';
import { CreationDefiComponent } from './cartographe/creation-defi/creation-defi.component';
import { CartographeComponent } from './cartographe/cartographe.component';
import { AssistantComponent } from './assistant/assistant.component';
import { DescriptionComponent } from './description/description.component';



//////////////////////J'ai importé ça à cause des lignes que j'ai ajouté

import { Routes, RouterModule } from '@angular/router';
import { VisiteComponent } from './visite/visite.component';



/*ROUTING*/
const appRoutes: Routes = [
  { path: 'cartographe', component: CartographeComponent },
  { path: 'assistant', component: AssistantComponent },
  { path: 'assistant/description', component: DescriptionComponent},
  { path: '', component: AppComponent },
  { path : 'chemin', component: CreationDefiComponent}
];




@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    CartographeComponent,
    AssistantComponent,
    DescriptionComponent,
    CreationDefiComponent,
    VisiteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatFormFieldModule,
    MatDialogModule,
    YagaModule,
    HttpClientModule,
    ReactiveFormsModule,
    /**MES AJOUTS SUIVI DE ONENOTE/ */
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
