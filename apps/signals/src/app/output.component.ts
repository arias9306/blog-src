import { AsyncPipe } from '@angular/common';
import { Component, OnInit, output, viewChild } from '@angular/core';
import { outputFromObservable, outputToObservable } from '@angular/core/rxjs-interop';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-interval',
  standalone: true,
  template: `<label>Interval</label> <button (click)="changeName()">Change Name</button>`,
})
export class IntervalComponent {
  intervalChange = outputFromObservable(interval(1000));
  nameChange = output<string>();

  changeName() {
    this.nameChange.emit('Andrés');
  }
}

@Component({
  selector: 'app-root-output',
  standalone: true,
  imports: [IntervalComponent, AsyncPipe],
  template: ` <div>
    <app-interval />
    <h3>IntervalChange {{ logInterval$ | async }}</h3>
    <h3>NameChange {{ nameChanged$ | async }}</h3>
  </div>`,
})
export class AppOutputComponent implements OnInit {
  childComponent = viewChild.required(IntervalComponent);
  logInterval$!: Observable<number>;
  nameChanged$!: Observable<string>;

  ngOnInit(): void {
    this.logInterval$ = outputToObservable(this.childComponent().intervalChange);
    this.nameChanged$ = outputToObservable(this.childComponent().nameChange);
  }
}
