import { Component, OnInit, Input, Output, ModuleWithComponentFactories } from '@angular/core';
import { NewsService } from './news.service';
import { ID } from './newsInterface';
import * as moment from 'moment';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent implements OnInit {
  public newsdata = [];
  public Id: ID;
  constructor(private newsservice: NewsService) {}

  // Loads the News data in an array
  ngOnInit() {
    this.newsservice.getnewsdata()
    .subscribe(data => this.newsdata = data);
  }
  // Deletes the Row in the browser and subscribe to the observable that send a signal to the server
  deleteNews(id: string) {
    for (let x = 0; x < this.newsdata.length; x++) {
      if (this.newsdata[x].objectID === id) {
        this.newsdata.splice(x, 1);
        this.newsservice.deleteObject(id)
        .subscribe(data => this.Id = data);
      }
    }
  }
  // Logic to open links when clicking a row
  openlink(url1: string, url2: string) {
    console.log(this.newsdata[0].created_at);
    if (url1 !== null) {
    window.open(url1, '_blank');
    } else {window.open(url2, '_blank'); }
  }

  // Displays the date using a library
  displayDate(objectdate: string) {
    const date = moment(objectdate);
    const now = moment();
    if ( date > now.subtract(1, 'days')) {
      return date.format('LT');
    } else if ((date > now.subtract(2, 'days')) ) {
      return 'Yesterday';
    } else {
      return date.format('ll');
    }
  }

  // These two functions make the the trashcan visible when you hover the mouse over
  focusTrashcan(i) {
   const trashcans = document.getElementsByClassName('trash-button') as HTMLCollectionOf<HTMLElement>;
   const rows = document.getElementsByClassName('newslist') as HTMLCollectionOf<HTMLElement>;
   trashcans[i].style.visibility = 'visible';
   rows[i].style.backgroundColor = '#fafafa';
  }
  unfocusTrashcan(i) {
    const trashcans = document.getElementsByClassName('trash-button') as HTMLCollectionOf<HTMLElement>;
    const rows = document.getElementsByClassName('newslist') as HTMLCollectionOf<HTMLElement>;
    trashcans[i].style.visibility = 'hidden';
    rows[i].style.backgroundColor = '#fff';
   }
}
