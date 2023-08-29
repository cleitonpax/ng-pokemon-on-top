import { Component, Input } from '@angular/core';

import { Item } from 'pokenode-ts';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-evolution-item',
  templateUrl: './evolution-item.component.html',
  styleUrls: ['./evolution-item.component.scss']
})
export class EvolutionItemComponent {
  @Input() item!: string;

  labels$?: Observable<Item>;

  constructor(private api: PokemonService) { }

  ngOnInit(): void {
    this.labels$ = this.api.getItemByName(this.item);
  }

  getLabel(trigger: Item): string {
    const en = trigger.names.find(translation => translation.language.name === 'en');
    return en!.name;
  }
}
