import { Component, Input } from "@angular/core";
import { Article } from "../models/article";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent {
  @Input("article") article: Article;

  upvote() {
    this.article.upvote();
  }

  downvote() {
    this.article.downvote();
  }
}
