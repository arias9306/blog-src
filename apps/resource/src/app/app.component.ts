import { JsonPipe } from '@angular/common';
import { Component, resource } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule, JsonPipe],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'resource';

  jsonResource = resource({
    loader: () => {
      return fetch(`https://jsonplaceholder.typicode.com/todos?_limit=10`).then((res) => res.json());
    },
  });
}
