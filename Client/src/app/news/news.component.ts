import { Component, OnInit, Input, Output } from '@angular/core';
import { NewsService } from './news.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ID } from './newsInterface';
import { ReturnStatement, preserveWhitespacesDefault } from '@angular/compiler';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
  public newsdata = [];
  public Id: ID;
  constructor(private newsservice: NewsService) { }

  ngOnInit() {
    this.newsservice.getnewsdata()
    .subscribe(data => this.newsdata = data);
  }
  deleteNews(id: string) {
    for (let x = 0; x < this.newsdata.length; x++) {
      if (this.newsdata[x].objectID === id) {
        this.newsdata.splice(x, 1);
        this.newsservice.deleteObject(id)
        .subscribe(data => this.Id = data);
      }
    }
  }
  openlink(url1: string, url2: string) {
    if (url1 !== null) {
    window.open(url1, '_blank');
    } else {window.open(url2, '_blank'); }
  }
}




  // ngOnInit() {
  //   //  this.data = this.news.getTiles();
  //   //  let data = this.data;
  //   let params = new HttpParams().set('userId', '1');
  //   let headers = new HttpHeaders().set('Authorization', 'auth-token');

  //   this.posts = this.http.get<NewsArray[]>('http://localhost:3000/news', { params, headers });
  //   let metadata = this.posts;
  //   this.tiles.push({text: metadata[0].author, cols: 4, rows: 1, color: 'lightblue'});

  // }
