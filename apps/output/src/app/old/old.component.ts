/* eslint-disable @angular-eslint/no-output-rename */
import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-old-child-component',
  standalone: true,
  template: `<button (click)="emitClick($event)">Click here</button>`,
})
export class AppOldChildComponent {
  @Output() deletedClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output('deletedElement') elementDeleted = new EventEmitter<MouseEvent>();
  emitClick(event: MouseEvent): void {
    this.deletedClick.emit(event);
    this.elementDeleted.emit(event);
  }
}

@Component({
  selector: 'app-old-component',
  standalone: true,
  imports: [AppOldChildComponent],
  template: `<app-old-child-component (deletedClick)="fn($event)" (deletedElement)="fn($event)" />`,
})
export class AppOldComponent implements AfterViewInit {
  @ViewChild(AppOldChildComponent) myComponentRef!: AppOldChildComponent;
  fn(event: MouseEvent) {
    console.log(event);
  }

  ngAfterViewInit() {
    this.myComponentRef.deletedClick.subscribe((event: MouseEvent) => {
      console.log('Event received: ', event);
    });
  }
}
