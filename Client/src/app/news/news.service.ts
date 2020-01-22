import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsArray } from './newsInterface';
import { Observable } from 'rxjs';

const urlnews = 'http://server:4000/news';
const urlnews1 = 'http://192.168.99.100:4000/news';
const urlnews2 = 'http://localhost:4000/news';
const urldelete = 'http://server:4000/delete';
const urldelete1 = 'http://192.168.99.100:4000/delete';
const urldelete2 = 'http://localhost:4000/delete';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getnewsdata(): Observable<NewsArray[]> {
    return this.http.get<NewsArray[]>(urlnews1);
}

  deleteObject(objectID: string) {
    this.http.post(urldelete1, objectID);
  }
}

