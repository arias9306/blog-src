import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';

@Component({
    imports: [RouterModule, TopbarComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngrx-feature';
}
