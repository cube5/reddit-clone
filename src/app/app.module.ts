import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { ArticleComponent } from "./article/article.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ArticleListComponent } from "./article-list/article-list.component";

import { ArticleService } from "./services/article/article.service";
import { ArticleListHeaderComponent } from './article-list-header/article-list-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    SidebarComponent,
    ArticleListComponent,
    ArticleListHeaderComponent
  ],
  imports: [BrowserModule, HttpModule],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
