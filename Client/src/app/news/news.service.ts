import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsArray, ID } from './newsInterface';
import { Observable } from 'rxjs';

const urlntest = 'http://localhost:4000';
const urlnews = 'http://server:4000/news';
const urlnews1 = 'http://192.168.99.100:4000/news';
const urlnews2 = 'http://localhost:4000/news';
const urldelete = 'http://server:4000/delete';
const urldelete1 = 'http://192.168.99.100:4000/delete/';
const urldelete2 = 'http://localhost:4000/delete';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getnewsdata(): Observable<NewsArray[]> {
    let data = this.http.get<NewsArray[]>(urlntest);
    // sortedData = data
    return data
}
  deleteObject(id: string): Observable<ID> {
    console.log(urldelete1 + id);
    return this.http.get<ID>(urldelete1 + id);
  }
}

