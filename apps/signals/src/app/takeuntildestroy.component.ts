import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-take-until',
  standalone: true,
  template: ``,
})
export class TakeUntilDestroyedComponent implements OnInit {
  ngOnInit(): void {
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe((value) => console.log(value));
  }
}
