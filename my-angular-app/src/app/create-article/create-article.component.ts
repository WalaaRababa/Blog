import { Component, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticleServiceService } from '../services/article-service.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
type ArticleDto = {
  title: string;
  content: string;
};
@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnDestroy {
  newArticle: ArticleDto = {
    title: '',
    content: '',
  };
  private subscription = new Subscription();

  image: File | null = null;
  message = signal<string>('')
  constructor(private articleService: ArticleServiceService) { }

  select(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  addArticle(event: any) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', this.newArticle.title);
    formData.append('content', this.newArticle.content);
    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const articlesSubscription = this.articleService.createArticle(formData, headers).subscribe(
      res => {
        console.log(res);
        this.message.set(res.message)
      },
      error => {
        console.log(error);
      }
    );

    this.subscription.add(articlesSubscription);
  }

  hidePopup() {
    this.message.set('')
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();

  }
}
