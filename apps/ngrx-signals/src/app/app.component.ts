import { Component } from '@angular/core';
import {} from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
    imports: [RouterModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngrx-signals';
}
