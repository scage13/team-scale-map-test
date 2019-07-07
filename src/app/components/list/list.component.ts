import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Types
import { Apartment, CollectionData } from 'src/app/core/types/apartment.type';

// Services
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.pug',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();
  list: Apartment[] = [];
  selectedItem: Apartment = null;

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
          this.selectedItem = result.selectedItem;
        },
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCheck(id: number): void {
    this.dataService.pickFromList(id, this.list);
  }

}
