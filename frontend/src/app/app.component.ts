import { Component } from '@angular/core';
import { NameListComponent } from './name-list/name-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NameListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Helloworld App';
}
