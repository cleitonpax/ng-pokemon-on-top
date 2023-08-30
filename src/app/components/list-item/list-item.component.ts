import { Component, Input } from '@angular/core';

import { NamedAPIResource } from 'pokenode-ts';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() item?: NamedAPIResource;
}
