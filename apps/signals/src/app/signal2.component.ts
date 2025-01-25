import { AsyncPipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-signal2',
    imports: [AsyncPipe],
    template: `
    <div>Couter Observable: {{ counter$ | async }}</div>
    <div>Couter Signal: {{ counter() }}</div>
  `
})
export class Signal2Component implements OnInit {
  counter = signal(42);
  counter$ = toObservable(this.counter);
  ngOnInit(): void {
    this.counter.set(1);
    this.counter.set(2);
    this.counter.set(3);
    // Only the final value (3)
  }
}
