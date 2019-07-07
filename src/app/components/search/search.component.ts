import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, takeUntil } from 'rxjs/operators';

// Services
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.pug',
  styleUrls: ['./search.component.sass'],
})
export class SearchComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();
  private search: BehaviorSubject<string> = new BehaviorSubject<string>('');
  search$ = this.search.asObservable().pipe(
    map((query: string) => query ? query.trim() : ''),
    distinctUntilChanged(),
    debounceTime(500),
  );

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this
      .search$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (term: string) => {
          this.dataService.emitSearch(term);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
