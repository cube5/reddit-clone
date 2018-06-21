import { Component, OnInit } from "@angular/core";

declare var jQuery: any;

@Component({
  selector: "app-article-list-header",
  templateUrl: "./article-list-header.component.html",
  styleUrls: ["./article-list-header.component.css"]
})
export class ArticleListHeaderComponent implements OnInit {
  private currentFilter: string = "Time";
  private sortDirection: number = 1;

  constructor() {}

  ngOnInit() {
    jQuery(".ui.dropdown").dropdown();
  }

  changeDirection() {
    this.sortDirection *= -1;
    this._updateSort();
  }

  changeSort(filter: string) {
    if (filter === this.currentFilter) {
      this.changeDirection();
    } else {
      this.currentFilter = filter;
      this._updateSort();
    }
  }

  private _updateSort() {}
}
