import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShoppingCarComponent } from './shopping-list/shopping-list.component';

@Component({
    imports: [RouterModule, ShoppingCarComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngrx-signals-shopping';
}
