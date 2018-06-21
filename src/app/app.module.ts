import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";

import { appRoutes } from "./app.routes";
import { AppComponent } from "./app.component";
import { ArticleComponent } from "./article/article.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ArticleListComponent } from "./article-list/article-list.component";

import { ArticleService } from "./services/article/article.service";
import { ArticleListHeaderComponent } from "./article-list-header/article-list-header.component";
import { AboutComponent } from "./about/about.component";

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    SidebarComponent,
    ArticleListComponent,
    ArticleListHeaderComponent,
    AboutComponent
  ],
  imports: [BrowserModule, HttpModule, appRoutes],
  providers: [ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
