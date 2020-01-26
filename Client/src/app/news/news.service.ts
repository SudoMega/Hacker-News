import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsArray, ID } from './newsInterface';
import { Observable } from 'rxjs';

const urlnews = 'http://localhost:4000/news';
const urlnews1 = 'http://192.168.99.100:4000/news';
const urldelete = 'http://localhost:4000/delete';
const urldelete1 = 'http://192.168.99.100:4000/delete/';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getnewsdata(): Observable<NewsArray[]> {
   return this.http.get<NewsArray[]>('http://3.83.39.191:4000/news');
}
  deleteObject(id: string): Observable<ID> {
    return this.http.get<ID>('http://3.83.39.191:4000/news' + id);
  }
}

