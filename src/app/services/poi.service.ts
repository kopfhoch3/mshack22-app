import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Point } from '../model/point';
import { Tree } from '../model/tree';

@Injectable({
  providedIn: 'root',
})
export class PoiService {
  private readonly url = `${environment.apiUrl}/points`;
  constructor(private readonly http: HttpClient) {}

  getAll$(): Observable<Point[]> {
    return this.http.get<Point[]>(this.url);
  }
}
