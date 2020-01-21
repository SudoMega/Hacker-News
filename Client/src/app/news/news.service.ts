import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsArray } from './newsInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getnewsdata(): Observable<NewsArray[]> {
    return this.http.get<NewsArray[]>('http://localhost:4000/news');
  }

  deleteObject(objectID: string) {
    return this.http.post('http://localhost:4000/delete', objectID);
  }
}

