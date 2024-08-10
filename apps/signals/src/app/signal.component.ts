import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, effect, inject, Injector, OnInit, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, fromEvent, interval, map, Subject, takeUntil } from 'rxjs';
import { Signal2Component } from './signal2.component';

@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, Signal2Component],
  template: `
    <hr />
    <div>Signal {{ counter() }}</div>
    @if (show) {
    <div>Observable {{ counterObservable$ | async }}</div>
    }

    <button (click)="toggle()">Show/Hide</button>
    <button (click)="logSignal()">Log</button>
    <button (click)="stopCouter()">Stop</button>

    <hr />

    <div>Click ClientX Observable: {{ clickEvent$ | async | json }}</div>
    <div>Click ClientX Signal: {{ clickSignal() | json }}</div>

    <hr />
    <h2>Require Sync</h2>
    <div>New Couter Observable: {{ newCounter$ | async }}</div>
    <div>New Couter Signal: {{ newCounterSignal() | json }}</div>
    <div>New New Couter Observable: {{ newNewCounter$ | async }}</div>
    <button (click)="increaseCounter()">Increase Counter</button>

    <hr />
    <h2>Injector</h2>
    <div>New Couter Observable: {{ counter2$ | async }}</div>
    <div>New Couter Signal: {{ counter2() | json }}</div>

    <hr />
    <app-signal2 />
  `,
})
export class SignalComponent implements OnInit {
  show = true;
  stop = new Subject();
  counterObservable$ = interval(1000).pipe(
    map((value) => {
      // if (value > 10) {
      //   throw new Error('Ups');
      // }
      return value;
    }),
    takeUntil(this.stop)
  );

  clickEvent$ = fromEvent(window, 'click').pipe(
    map((click) => {
      const pointerEvent: PointerEvent = click as PointerEvent;
      return {
        x: pointerEvent.clientX,
        y: pointerEvent.clientY,
      };
    })
  );

  clickSignal = toSignal(this.clickEvent$, { initialValue: null });

  counter = toSignal(this.counterObservable$, {
    initialValue: 0,
    rejectErrors: true,
  });

  couterEffect = effect(() => {
    console.log(this.counter());
  });

  newCounter = new BehaviorSubject(1);
  newCounter$ = this.newCounter.asObservable();
  newCounterSignal = toSignal(this.newCounter$, { requireSync: true });

  newNewCounter$ = toObservable(this.newCounterSignal);

  counter2$ = interval(1000);
  private injector = inject(Injector);
  counter2!: Signal<number | undefined>;

  logCounter2 = effect(() => {
    console.log(2, this.counter2());
  });

  ngOnInit(): void {
    this.counter2 = toSignal(this.counter2$, { injector: this.injector });
  }

  increaseCounter() {
    this.newCounter.next(this.newCounter.value + 1);
  }

  toggle() {
    this.show = !this.show;
  }

  logSignal() {
    console.log({ signal: this.counter() });
  }

  stopCouter() {
    this.stop.next(true);
  }
}
