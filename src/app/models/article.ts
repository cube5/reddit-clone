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
    public author: string,
    public url: string,
    public urlToImage: string,
    public publishedAt: Date,
    public votes?: number
  ) {
    this.votes = votes || 0;
  }

  static fromJSON(json: ArticleJSON): Article {
    const article = Object.create(Article.prototype);

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
