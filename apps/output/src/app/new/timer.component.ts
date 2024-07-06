import { Component, OutputRef } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-timer-component',
  standalone: true,
  template: ``,
})
export class TimerComponent {
  timer: OutputRef<number> = outputFromObservable(interval(1000));
  timerAlias = outputFromObservable(interval(1000), { alias: 'timerChange' });
}
