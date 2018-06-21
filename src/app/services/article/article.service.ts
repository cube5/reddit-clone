import { Injectable } from "@angular/core";
import { Http, URLSearchParams } from "@angular/http";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { map, filter } from "rxjs/operators";

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

const sortByVotes: ArticleSortOrderFn = (direction: number) => (
  a: Article,
  b: Article
) => direction * (b.votes - a.votes);

const sortTypes = {
  Time: sortByTime,
  Votes: sortByVotes
};

@Injectable({
  providedIn: "root"
})
export class ArticleService {
  private articlesSubject: BehaviorSubject<Article[]> = new BehaviorSubject<
    Article[]
  >([]);

  private sourcesSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  private refreshSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    "reddit-r-all"
  );

  private sortByDirectionSubject: BehaviorSubject<number> = new BehaviorSubject<
    number
  >(1);

  private sortByFilterSubject: BehaviorSubject<
    ArticleSortOrderFn
  > = new BehaviorSubject<ArticleSortOrderFn>(sortByTime);

  private filterBySubject: BehaviorSubject<string> = new BehaviorSubject<
    string
  >("");

  public sources: Observable<any> = this.sourcesSubject.asObservable();
  public articles: Observable<Article[]> = this.articlesSubject.asObservable();
  public orderedArticles: Observable<Article[]>;

  constructor(private http: Http) {
    this.refreshSubject.subscribe(this.fetchArticles.bind(this));
    this.orderedArticles = combineLatest<any>(
      this.articlesSubject,
      this.sortByFilterSubject,
      this.sortByDirectionSubject,
      this.filterBySubject
    ).pipe(
      map(([articles, sorter, direction, filter]) => {
        const regx = new RegExp(filter, "gi");
        return articles
          .filter(article => regx.exec(article.title))
          .sort(sorter(direction));
      })
    );
  }

  public sortBy(filter: string, direction: number): void {
    this.sortByFilterSubject.next(sortTypes[filter]);
    this.sortByDirectionSubject.next(direction);
  }

  public filterBy(filter: string) {
    this.filterBySubject.next(filter);
  }

  public updateArticles(sources: string): void {
    this.refreshSubject.next(sources);
  }

  public fetchArticles(sources = "reddit-r-all"): void {
    this.makeHttpRequest("/v2/everything", sources)
      .pipe(map(json => json.articles))
      .subscribe(articlesJSON => {
        const articles = articlesJSON.map(json => Article.fromJSON(json));
        this.articlesSubject.next(articles);
      });
  }

  public fetchSources(): void {
    this.makeHttpRequest("/v2/sources")
      .pipe(
        map(json => json.sources),
        filter(arr => arr.length > 0)
      )
      .subscribe(this.sourcesSubject);
  }

  private makeHttpRequest(path: string, sources?: string): Observable<any> {
    const params = new URLSearchParams();
    params.set("apiKey", newsApiKey);
    if (sources) {
      params.set("sources", sources);
    }

    return this.http
      .get(`${baseUrl}${path}`, {
        search: params
      })
      .pipe(map(resp => resp.json()));
  }
}
