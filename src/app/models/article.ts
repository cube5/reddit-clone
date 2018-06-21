interface ArticleJSON {
  title: string;
  description: string;
  author: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
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
    return Object.assign(article, json, {
      votes: json.votes ? json.votes : 0
    });
  }

  public upvote(): void {
    this.votes += 1;
  }

  public downvote(): void {
    this.votes -= 1;
  }
}
