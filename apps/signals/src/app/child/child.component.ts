import { CommonModule } from '@angular/common';
import { Component, model, ModelSignal } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { interval, Subject } from 'rxjs';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css',
})
export class ChildComponent {
  // @Input({ required: true }) selected!: boolean;
  // @Output() selectedChange = new EventEmitter<boolean>();

  nameSubject = new Subject<string>();
  nameChange$ = this.nameSubject.asObservable();
  nameChange = outputFromObservable(this.nameChange$); // OutputRef<string>

  intervalChange = outputFromObservable(interval(1000));

  selected: ModelSignal<boolean | undefined> = model<boolean>();

  change() {
    this.selected.update((value) => !value);
    this.nameSubject.next('Andres');
  }
}
