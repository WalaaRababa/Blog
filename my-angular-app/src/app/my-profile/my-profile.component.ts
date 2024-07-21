import { Component, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleServiceService } from '../services/article-service.service';
import Article from '../../interface/article';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from '../shared-components/article/article.component'
import { AuthServiceService } from '../services/auth-service.service';
import User from '../../interface/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule,ArticleComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnDestroy {
  private subscription = new Subscription();

  id: string | null = ''
  errorMessage = signal<string>('')
  articles=signal<Article[]>([])
  user=signal<User>({firstName:'',lastName:'',email:'',password:''})
  constructor(private articleService: ArticleServiceService, private act: ActivatedRoute,private auth:AuthServiceService) { }
  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id')
    this.getMyArticle()
    if (this.id !== null) {
      this.getMyInfo(this.id);
  } 
  }
  getMyArticle() {
    const articlesSubscription = this.articleService.getMyArticle(this.id).subscribe((res) => {
      console.log(res);
      const articles = (res as any).articles
      this.articles.set(articles)
    }, error => {
      console.log(error);
      this.errorMessage.set(error.message)
    })
    this.subscription.add(articlesSubscription);

  }
  getMyInfo(userId:string)
  {
    this.auth.getInfo(userId).subscribe((res) => {
      console.log(res);
      this.user.set(res.user)
    }, error => {
      console.log(error);
      this.errorMessage.set(error.message)
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
