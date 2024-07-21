import { Component, Input, signal } from '@angular/core';
import Article from '../../../interface/article';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule,CommentComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input() oneArticle!: Article;
  expandedArticleId: string | null = null;

   toggleExpanding(articleId: string) {
    this.expandedArticleId = this.expandedArticleId === articleId ? null : articleId;
  }
}
