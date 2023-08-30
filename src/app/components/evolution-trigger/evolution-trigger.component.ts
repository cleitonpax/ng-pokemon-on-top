import { Component, Input, OnInit } from '@angular/core';

import { EvolutionTrigger } from 'pokenode-ts';
import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-evolution-trigger',
  templateUrl: './evolution-trigger.component.html',
  styleUrls: ['./evolution-trigger.component.scss']
})
export class EvolutionTriggerComponent implements OnInit {
  @Input() trigger!: string;

  labels$?: Observable<EvolutionTrigger>;

  constructor(private api: PokemonService) { }

  ngOnInit(): void {
    this.labels$ = this.api.getEvolutionTriggerByName(this.trigger);
  }

  getLabel(trigger: EvolutionTrigger): string {
    const en = trigger.names.find(translation => translation.language.name === 'en');
    return en?.name || '';
  }

}
