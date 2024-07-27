import { CommonModule } from '@angular/common';
import { Component, model, ModelSignal } from '@angular/core';

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

  selected: ModelSignal<boolean> = model.required<boolean>();

  change() {
    this.selected.update((value) => !value);
  }
}
