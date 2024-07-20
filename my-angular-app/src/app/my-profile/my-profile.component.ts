import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleServiceService } from '../services/article-service.service';
import Article from '../../interface/article';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../components/article/article.component';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule,ArticleComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  id: string | null = ''
  errorMessage = signal<string>('')
  articles=signal<Article[]>([])
  constructor(private articleService: ArticleServiceService, private act: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id')
    this.getMyArticle()
  }
  getMyArticle() {
    this.articleService.getMyArticle(this.id).subscribe((res) => {
      console.log(res);
      const articles = (res as any).articles
      this.articles.set(articles)
    }, error => {
      console.log(error);
      this.errorMessage.set(error.message)
    })
  }
}
