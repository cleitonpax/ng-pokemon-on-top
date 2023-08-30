import { ChainLink, EvolutionChain } from 'pokenode-ts';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-evolution',
  templateUrl: './detail-evolution.component.html',
  styleUrls: ['./detail-evolution.component.scss']
})
export class DetailEvolutionComponent {
  @Input() evolution?: EvolutionChain | null = null;


  get evolutionChain(): ChainLink[] {
    const chain: ChainLink[] = [];

    if (this.evolution && this.evolution.chain) {
      this.getEvolutionChainRecursive(this.evolution.chain, chain);
    }

    return chain;
  }

  private getEvolutionChainRecursive(chain: ChainLink, result: ChainLink[]) {
    result.push(chain);
    
    if (chain.evolves_to.length > 0) {
      this.getEvolutionChainRecursive(chain.evolves_to[0], result);
    }
  }
}
