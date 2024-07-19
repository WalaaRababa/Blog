import { Component, OnInit, signal } from '@angular/core';
import { ArticleServiceService } from '../services/article-service.service';
import Article from '../../interface/article';
import { ArticleComponent } from '../components/article/article.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ArticleComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  article = signal<Article[]>([])
  constructor(private articleService: ArticleServiceService) { }
  ngOnInit(): void {
    this.getAllArticle()
  }
  getAllArticle() {
    this.articleService.getAllArticle().subscribe((res) => {
      console.log(res);
      const articles = (res as any).articles
      this.article.set(articles)
    }, error => {
      console.log(error);

    })
  }
}
