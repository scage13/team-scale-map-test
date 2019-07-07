import { Component, Input } from '@angular/core';

// Types
import { Apartment } from 'src/app/core/types/apartment.type';

@Component({
  selector: 'list-item',
  templateUrl: './list-item.component.pug',
  styleUrls: ['./list-item.component.sass'],
})
export class ListItemComponent {

  @Input() item: Apartment;

  constructor() { }

}
