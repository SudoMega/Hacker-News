import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsArray, ID } from './newsInterface';
import { Observable } from 'rxjs';

const urlnews = 'http://127.0.0.1:4000/news';
const urlnews1 = 'http://192.168.99.100:4000/news';
const urldelete = 'http://127.0.0.1:4000/delete';
const urldelete1 = 'http://192.168.99.100:4000/delete/';
const url = window.location.href;
const ip = url.slice(0, -1);

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getnewsdata(): Observable<NewsArray[]> {
    console.log(url);
    return this.http.get<NewsArray[]>(ip + ':4000/news');
}

  deleteObject(id: string): Observable<ID> {
    return this.http.get<ID>(url + ':4000/delete/' + id);
  }
}
