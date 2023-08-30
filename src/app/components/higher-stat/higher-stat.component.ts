import { Component, Input } from '@angular/core';

import { Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Stat } from 'pokenode-ts';

@Component({
  selector: 'app-higher-stat',
  templateUrl: './higher-stat.component.html',
  styleUrls: ['./higher-stat.component.scss']
})
export class HigherStatComponent {
  @Input() stat!: string;

  labels$?: Observable<Stat>;

  constructor(private api: PokemonService) { }

  ngOnInit(): void {
    this.labels$ = this.api.getStatByName(this.stat);
  }

  getLabel(stat: Stat): string {
    const en = stat.names.find(translation => translation.language.name === 'en');
    return en!.name;
  }
}
