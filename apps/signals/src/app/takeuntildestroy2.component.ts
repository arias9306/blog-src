import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, effect, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-child-interval',
  standalone: true,
  template: `<label>Child Interval</label>`,
})
export class ChildIntervalComponent {
  destroyRef = inject(DestroyRef);
}

@Component({
  selector: 'app-parent-interval',
  imports: [ChildIntervalComponent],
  template: ` <div>
    @if (visible()) {
    <app-child-interval />
    }
    <br />
    <button (click)="hideOrShow()">Destroy Child</button>
  </div>`,
})
export class ParentIntevalComponent {
  childComponent = viewChild(ChildIntervalComponent);
  visible = signal(true);

  intervalEffect = effect(() => {
    const child = this.childComponent();
    if (child) {
      interval(1000)
        .pipe(takeUntilDestroyed(child.destroyRef))
        .subscribe((value) => console.log('Parent', value));
    }
  });

  hideOrShow() {
    this.visible.update((visible) => !visible);
  }
}
