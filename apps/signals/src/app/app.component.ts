import { Component, computed, effect, Signal, signal, untracked, WritableSignal } from '@angular/core';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChildComponent],
  template: `<div>
    <p>Counter Value: {{ counter() }}</p>
    <button (click)="setNewValue()">Set New Value</button>
    <button (click)="updateValue()">Update Value</button>
    <button (click)="changeName()">Change Name</button>
    <br />
    <app-child [(selected)]="userSelected" (selectedChange)="selectedChanged($event)" />
  </div>`,
})
export class AppComponent {
  counter: WritableSignal<number> = signal(0);
  userSelected: WritableSignal<boolean> = signal(false);

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

  selectedChanged(selected: boolean) {
    console.log(selected);
  }
}
