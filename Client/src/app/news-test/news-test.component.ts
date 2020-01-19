import { Component, OnInit } from '@angular/core';
import { NewsTestService } from './news-test.service';

@Component({
  selector: 'app-news-test',
  templateUrl: './news-test.component.html',
  styleUrls: ['./news-test.component.css']
})
export class NewsTestComponent implements OnInit {

  public newsdata = [];

  constructor(private newstestservice: NewsTestService) { }

  ngOnInit() {
    this.newstestservice.getnewsdata()
    .subscribe(data => this.newsdata = data);
  }

}
