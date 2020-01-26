import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsArray, ID } from './newsInterface';
import { Observable } from 'rxjs';

const urlnews = 'http://127.0.0.1:4000/news';
const urlnews1 = 'http://192.168.99.100:4000/news';
const urldelete = 'http://127.0.0.1:4000/delete';
const urldelete1 = 'http://192.168.99.100:4000/delete/';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getnewsdata(): Observable<NewsArray[]> {
   return this.http.get<NewsArray[]>(urlnews);
}

  deleteObject(id: string): Observable<ID> {
    return this.http.get<ID>(urldelete + id);
  }
}
