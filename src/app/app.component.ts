import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { OSM_TILE_LAYER_URL } from '@yaga/leaflet-ng2';
import firebase from 'firebase/app';
//import { User } from './user/user.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  dataIconGoogle = 'assets/images/iconGoogle.png';
  iconMarker = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/585px-Map_marker.svg.png';
  tileLayerUrl = OSM_TILE_LAYER_URL;

  /*MON CODE SUIVI DE ONENOTE*/

  //user:Observable<User> | undefined;
  title: any;
  public donnees : any = [];

  constructor(public auth: AngularFireAuth, private http : HttpClient) {  }

    login(): void {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      this.auth.signInWithPopup(provider);
    }

    logout(): void {
      this.auth.signOut();
    }

    /*tableChamis(): void {
      fetch('http://chamis.herokuapp.com')
        .then(res => res.json)
        .then (data => console.log(data))
    }*/
    ngOnInit(): void {
      this.getLignes();
    }
    getLignes(){
      const ligne = "https://data.mobilites-m.fr/api/lines/json?types=ligne&reseaux=SEM";

      this.http.get(ligne).subscribe((semi) => {
        this.donnees = semi;
      })
    }


    rgba_to_hex_string(color: any) {
      return color.split(',').map((component: string) => parseInt(component))
      .map((component: { toString: (arg0: number) => any; }) => component.toString(16))
      .map((component: string) => component.padStart(2, '0'))
      .join('')
      .padStart(7, '#');
  }

}
