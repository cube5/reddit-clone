import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Article } from "../../models/article";
import { environment } from "../../../environments/environment.prod";

const { baseUrl, newsApiKey } = environment;

interface ArticleSortFn {
  (a: Article, b: Article): number;
}

interface ArticleSortOrderFn {
  (direction: number): ArticleSortFn;
}

const sortByTime: ArticleSortOrderFn = (direction: number) => (
  a: Article,
  b: Article
) => direction * (b.publishedAt.getTime() - a.publishedAt.getTime());

const sortTypes = {
  Time: sortByTime
};

@Injectable({
  providedIn: "root"
})
export class ArticleService {
  private articlesSubject: BehaviorSubject<Article[]> = new BehaviorSubject<
    Article[]
  >([]);

  private sortByDirectionSubject: BehaviorSubject<number> = new BehaviorSubject<
    number
  >(1);

  private sortByFilterSubject: BehaviorSubject<
    ArticleSortOrderFn
  > = new BehaviorSubject<ArticleSortOrderFn>(sortByTime);

  public articles: Observable<Article[]> = this.articlesSubject.asObservable();
  public orderedArticles: Observable<Article[]>;

  constructor(private http: Http) {}

  public sortBy(filter: string, direction: number): void {
    this.sortByFilterSubject.next(sortTypes[filter]);
    this.sortByDirectionSubject.next(direction);
  }

  public fetchArticles(): void {
    this.makeHttpRequest("/v2/top-headlines", "reddit-r-all")
      .pipe(map(json => json.articles))
      .subscribe(articlesJSON => {
        const articles = articlesJSON.map(json => Article.fromJSON(json));
        this.articlesSubject.next(articles);
      });
  }

  private makeHttpRequest(path: string, sources: string): Observable<any> {
    const params = new URLSearchParams();
    params.set("apiKey", newsApiKey);
    params.set("sources", sources);

    return this.http
      .get(`${baseUrl}${path}`, {
        search: params
      })
      .pipe(map(resp => resp.json()));
  }
}
