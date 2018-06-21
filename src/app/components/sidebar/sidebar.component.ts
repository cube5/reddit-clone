import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { ArticleService } from "../../services/article/article.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  public sources: Observable<any>;

  constructor(private articleService: ArticleService) {
    this.sources = articleService.sources;
  }

  ngOnInit() {
    this.articleService.fetchSources();
  }
}
