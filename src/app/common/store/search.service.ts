import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private search = new BehaviorSubject(null);
  searchChanged$;

  constructor() {
    this.searchChanged$ = this.search.asObservable();
  }

  newSearchData(search) {
    this.search.next(search);
  }
}
