interface ArticleJSON {
  title: string;
  description: string;
  author: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  votes: string;
}

export class Article {
  constructor(
    public title: string,
    public description: string,
    public publishedAt: Date,
    public urlToImage: string,
    public votes?: number
  ) {
    this.votes = votes || 0;
  }

  static fromJSON(json: ArticleJSON): Article {
    const article = Object.create(Article.prototype);
    console.log(article.publishedAt);
    return Object.assign(article, json, {
      votes: json.votes ? json.votes : 0,
      publishedAt: new Date(json.publishedAt)
    });
  }

  public upvote(): void {
    this.votes += 1;
  }

  public downvote(): void {
    this.votes -= 1;
  }
}
