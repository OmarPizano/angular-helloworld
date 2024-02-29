import { Component } from '@angular/core';
import { NameListComponent } from './name-list/name-list.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Helloworld App';
}
