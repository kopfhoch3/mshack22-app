import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tree } from '../model/tree';

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  private readonly url = `${environment.apiUrl}/tree`;
  constructor(private readonly http: HttpClient) {}

  getAll$(): Observable<Tree[]> {
    //return this.http.get<Tree[]>(this.url + '/all');
    return of([]);
  }
}
