import { JsonPipe } from '@angular/common';
import { Component, effect, linkedSignal, signal } from '@angular/core';

@Component({
  imports: [JsonPipe],
  selector: 'app-linked-signal',
  template: `
    <ul>
      @for (characterClass of availableClasses(); track $index) {
      <li (click)="changeClass($index)">{{ characterClass }}</li>
      }
    </ul>

    <button (click)="removeWarriorClass()">Remove Worrior</button>

    <button (click)="changeNpcName()">Change NPC</button>

    <h2>Your Character</h2>
    <h3>Selected Class</h3>
    {{ selectedClass() }}
    <h3>Weapon</h3>

    {{ selectedWeapon() }}

    <h3>active NPC</h3>
    <pre>
      {{ activeNPC() | json }}
    </pre
    >
    <h3>npc Backup</h3>
    <pre>
      {{ npcBackup() | json }}
    </pre
    >
  `,
})
export class CharacterCreatorComponent {
  availableClasses = signal<string[]>(['Warrior', 'Mage', 'Rogue']);
  defaultWeapons = signal<Record<string, string>>({
    Warrior: 'Sword',
    Mage: 'Staff',
    Rogue: 'Dagger',
  });

  // selectedClass = linkedSignal(() => this.availableClasses()[0]);

  activeNPC = signal({ id: 42, name: 'Eldrin', role: 'Merchant' });
  npcBackup = linkedSignal(() => this.activeNPC(), {
    equal: (a, b) => a.id === b.id,
  });

  selectedClass = linkedSignal<{ availableClasses: string[]; npc: { id: number; name: string; role: string } }, string>(
    {
      source: () => ({ availableClasses: this.availableClasses(), npc: this.npcBackup() }),
      computation: (newClasses, previous) => {
        //
        console.log(newClasses, previous);
        return previous && newClasses.availableClasses.includes(previous.value)
          ? previous.value
          : newClasses.availableClasses[0];
      },
    }
  );
  selectedWeapon = linkedSignal(() => this.defaultWeapons()[this.selectedClass()]);

  // selectedClass = signal(this.availableClasses()[0]);
  // selectedWeapon = signal(this.defaultWeapons()[this.selectedClass()]);

  activeNpcEffect = effect(() => {
    console.log(this.npcBackup());
  });

  changeClass(newClassIndex: number) {
    this.selectedClass.set(this.availableClasses()[newClassIndex]);
    this.selectedWeapon.set(this.defaultWeapons()[this.selectedClass()]);
  }

  removeWarriorClass() {
    this.availableClasses.set(['Mage', 'Rogue', 'Warrior']);
  }

  changeNpcName() {
    this.activeNPC.set({ id: 42, name: 'Eldrin2', role: 'Merchant2' });
  }
}
