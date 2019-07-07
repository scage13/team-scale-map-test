import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { find, filter, includes } from 'lodash-es';

// Types
import { Apartment, CollectionData } from '../types/apartment.type';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private collection$ = new BehaviorSubject<CollectionData>({ selectedItem: null, list: [] });
  collection = this.collection$.asObservable();

  defaultData: any = [];

  constructor(
    private http: HttpClient,
  ) {
    this.getApartments().subscribe(
      (response: Apartment[]) => {
        this.defaultData = response;
        this.collection$.next({ selectedItem: null, list: response });
      }
    );

  }

  getApartments(): Observable<Apartment[]> {
    return this
      .http
      .get<Apartment[]>('http://team-scale.com/TestData/ng_text_v15/api')
      .pipe(
        map(response => {
          const data = response.map((item: Apartment) => {
            item.selected = false;
            return item;
          });
          return data;
        }),
      );
  }

  pickFromList(id: number, collection: Apartment[], selected?: Apartment) {
    let pickItem: Apartment;
    const list: Apartment[] = collection.map(
      (item: Apartment) => {
        if (item.id === id) {
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }
        return item;
      }
    );
    if (selected && selected.selected) {
      pickItem = find(collection, selected);
    }

    this.collection$.next({
      selectedItem: pickItem ? pickItem : null,
      list,
    });
  }

  emitSearch(terms: string) {
    const payload = filter(this.defaultData, (item: Apartment) => {
      if (includes(item.name, terms)) {
        return item;
      }
    });

    this.collection$.next({
      selectedItem: null,
      list: payload,
    });
  }
 }
