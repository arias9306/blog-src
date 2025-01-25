import { Component, effect, signal } from '@angular/core';
import { AppNewComponent } from './new/new.component';
import { TimerComponent } from './new/timer.component';
import { AppOldComponent } from './old/old.component';

@Component({
    imports: [AppNewComponent, AppOldComponent, TimerComponent],
    selector: 'app-root',
    template: `
    <h1>New</h1>
    <app-new-component />
    <br />
    <br />
    @if(showTimer()) {
    <h1>Timer</h1>
    <app-timer-component (timer)="fn($event)" />
    }
    <p>Timer Output Value {{ timer() }}</p>
    <br />
    <button (click)="hideTimerClick()">{{ timerLabel }}</button>

    <h1>Old</h1>
    <app-old-component />
  `,
    styles: ``
})
export class AppComponent {
  title = 'output';
  timer = signal(0);
  showTimer = signal(false);
  timerLabel = 'Show Timer';

  timeLabelEffect = effect(() => {
    if (this.showTimer()) {
      this.timerLabel = 'Hide Timer';
    } else {
      this.timerLabel = 'Show Timer';
    }
  });

  fn(event: number) {
    console.log(event);
    this.timer.set(event);
  }

  hideTimerClick() {
    this.showTimer.update((curr) => !curr);
  }
}
