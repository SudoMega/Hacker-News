import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsArray } from '../news/newsInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsTestService {

  constructor(private http: HttpClient) { }

  getnewsdata(): Observable<NewsArray[]> {
    return this.http.get<NewsArray[]>('http://localhost:3000/news');
  }
}
