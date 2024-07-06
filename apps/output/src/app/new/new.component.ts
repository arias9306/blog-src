import { Component, effect, output, Signal, viewChild } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-new-child-component',
  standalone: true,
  template: `<button (click)="emitClick($event)">Click here</button>`,
})
export class AppNewChildComponent {
  deletedClick = output<MouseEvent>();
  elementDeleted = output<MouseEvent>({ alias: 'deletedElement' });
  emitClick(event: MouseEvent): void {
    this.deletedClick.emit(event);
    this.elementDeleted.emit(event);
  }
}

@Component({
  selector: 'app-new-component',
  standalone: true,
  imports: [AppNewChildComponent],
  template: `<app-new-child-component (deletedClick)="fn($event)" (deletedElement)="fn($event)" />`,
})
export class AppNewComponent {
  myComponentRef: Signal<AppNewChildComponent> = viewChild.required(AppNewChildComponent);

  constructor() {
    effect(() => {
      this.myComponentRef().deletedClick.subscribe((event: MouseEvent) => {
        console.log('Event received: ', event);
      });
    });

    effect(() => {
      outputToObservable(this.myComponentRef().elementDeleted).subscribe((event: MouseEvent) => {
        console.log('Observable:', event);
      });
    });
  }

  fn(event: MouseEvent) {
    console.log(event);
  }
}
