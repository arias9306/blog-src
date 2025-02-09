import { JsonPipe } from '@angular/common';
import { resource } from '@angular/core';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-mission-log',
  imports: [JsonPipe],
  template: `
    <h1>Value</h1>
    <pre>
    {{ missionResource.value() | json }}
    </pre
    >
    <h2>IsLoading</h2>
    {{ missionResource.isLoading() }}
    <h2>Error</h2>
    {{ missionResource.error() }}

    <button (click)="nextMission()">next id</button>
  `,
})
export class MissionLogComponent {
  missionId = signal(1);

  missionResource = resource({
    request: this.missionId,
    loader: ({ request: id, abortSignal }) =>
      fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { signal: abortSignal }).then((res) => res.json()),
  });

  loading = this.missionResource.isLoading;
  error = this.missionResource.error;

  nextMission() {
    this.missionId.update((id) => id + 1);
  }

  reaload() {
    this.missionResource.reload();
  }
}
