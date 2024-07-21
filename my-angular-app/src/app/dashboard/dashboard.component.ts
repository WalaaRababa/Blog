import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ArticleServiceService } from '../services/article-service.service';
import Article from '../../interface/article';
import { ArticleComponent } from '../shared-components/article/article.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ArticleComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  articles = signal<Article[]>([])
  isExpanding=signal(false)
  private subscription = new Subscription();

  constructor(private articleService: ArticleServiceService) { }
  ngOnInit(): void {
    this.getAllArticle()
  }
  getAllArticle() {
    const articlesSubscription = this.articleService.getAllArticle().subscribe((res) => {
      console.log(res);
      const articles = (res as any).articles;
      this.articles.set(articles);
    }, error => {
      console.log(error);
    });

    this.subscription.add(articlesSubscription);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
