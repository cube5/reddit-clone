import { Component, OnInit } from "@angular/core";

import { Article } from "../models/article";
import { ArticleService } from "../services/article/article.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.css"]
})
export class ArticleListComponent implements OnInit {
  articles: Observable<Article[]>;

  constructor(private articleService: ArticleService) {
    this.articles = articleService.articles;
  }

  ngOnInit() {
    this.articleService.fetchArticles();
  }
}
