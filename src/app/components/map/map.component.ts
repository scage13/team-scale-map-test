import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Types
import { Apartment, CollectionData } from 'src/app/core/types/apartment.type';

// Service
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.pug',
  styleUrls: ['./map.component.sass'],
})
export class MapComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();
  readonly mapIcons = {
    default: 'http://team-scale.com/TestData/ng_text_v15/blue_marker.png',
    active: 'http://team-scale.com/TestData/ng_text_v15/orange_marker.png',
  };
  list: Apartment[] = [];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this
      .dataService
      .collection
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: CollectionData) => {
          this.list = result.list;
        },
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClick(id: number, item: Apartment) {
    this.dataService.pickFromList(id, this.list, item);
  }
}
