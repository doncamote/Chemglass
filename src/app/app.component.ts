import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { rocketOutline, flaskOutline, cashOutline, bulbOutline, chatbubbleEllipsesOutline, schoolOutline } from 'ionicons/icons';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}

addIcons({
  'rocket-outline': rocketOutline,
  'flask-outline': flaskOutline,
  'cash-outline': cashOutline,
  'bulb-outline': bulbOutline,
  'chatbubble-ellipses-outline': chatbubbleEllipsesOutline,
  'school-outline': schoolOutline,
});