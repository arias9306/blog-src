import { AsyncPipe } from '@angular/common';
import {
  Component,
  computed,
  effect,
  OnInit,
  Signal,
  signal,
  untracked,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ChildComponent } from './child/child.component';
import { AppOutputComponent } from './output.component';
import { SignalComponent } from './signal.component';
import { ParentIntevalComponent } from './takeuntildestroy2.component';

@Component({
    selector: 'app-root',
    imports: [ChildComponent, SignalComponent, AsyncPipe, AppOutputComponent, ParentIntevalComponent],
    template: `<div>
    <p>Counter Value: {{ counter() }}</p>
    <button (click)="setNewValue()">Set New Value</button>
    <button (click)="updateValue()">Update Value</button>
    <button (click)="changeName()">Change Name</button>
    <br />
    <app-child
      [(selected)]="userSelected"
      (selectedChange)="selectedChanged($event)"
      (nameChange)="nameChanged($event)"
      (intervalChange)="log($event)"
    />
    <h1>IntervalChange {{ logInterval$ | async }}</h1>
    <br />

    @if (destroySignal) {
    <app-signal />
    }
    <hr />
    <button (click)="toggle()">Signal Component Show/Hide</button>
    <hr />
    <h1>output</h1>
    <app-root-output />

    <hr />
    <h1>Take Until</h1>
    <app-parent-interval />
  </div>`
})
export class AppComponent implements OnInit {
  childComponent = viewChild.required(ChildComponent);
  counter: WritableSignal<number> = signal(0);
  userSelected: WritableSignal<boolean> = signal(false);

  logInterval$!: Observable<string | undefined>;

  ngOnInit(): void {
    this.logInterval$ = outputToObservable(this.childComponent().nameChange);
  }

  destroySignal = true;

  toggle() {
    this.destroySignal = !this.destroySignal;
  }

  // Computed
  temperature: WritableSignal<number> = signal(20);
  temperatureInFahrenheit: Signal<number> = computed(() => (this.temperature() * 9) / 5 + 32);

  // Dynamic Tracking
  isActive: WritableSignal<boolean> = signal(false);
  value: WritableSignal<number> = signal(10);
  displayMessage: Signal<string> = computed(() => {
    if (this.isActive()) {
      return `The value is ${this.value()}.`;
    } else {
      return 'No data to display.';
    }
  });

  // Effects
  userName: WritableSignal<string> = signal('andres');
  private logUserName = effect(() => {
    console.log(`User set to ${this.userName()} and the counter is ${this.counter()}`);
  });

  private logUserNameCleanUp = effect((onCleanup) => {
    const user = this.userName();
    const timer = setTimeout(() => {
      console.log(`1 second ago, the user became ${user}`);
    }, 1000);

    onCleanup(() => {
      clearTimeout(timer);
    });
  });

  private logUserNameUntracked = effect(() => {
    console.log(`User set to ${this.userName()} and the counter is ${untracked(this.counter)}`);
  });

  setNewValue() {
    this.counter.set(150);
  }

  updateValue() {
    this.counter.update((currentValue) => currentValue + 1);
  }

  changeName() {
    this.userName.set('Andres ' + new Date().toLocaleString());
  }

  selectedChanged(selected: boolean | undefined) {
    console.log(selected);
  }

  nameChanged(name: string) {
    console.log({ name });
  }

  log(log: number) {
    console.log({ log });
  }
}
