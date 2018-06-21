import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import { Article } from "../../models/article";
import { ArticleService } from "../../services/article/article.service";

@Component({
  selector: "app-article-list",
  templateUrl: "./article-list.component.html",
  styleUrls: ["./article-list.component.css"]
})
export class ArticleListComponent implements OnInit {
  articles: Observable<Article[]>;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute
  ) {
    this.articles = articleService.orderedArticles;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const source = params["source"];
      this.articleService.updateArticles(source);
    });
  }
}
