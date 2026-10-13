import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';



/**
 * Home view, reachable from the /home route.
 *
 * @remarks
 * Shows the title, the description of the application and the section
 * with the registered research items.
 *
 * @author Carla Gallardo
 */
@Component({
  selector: 'app-home',
  //imports: [TranslatePipe, NewReservation],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
