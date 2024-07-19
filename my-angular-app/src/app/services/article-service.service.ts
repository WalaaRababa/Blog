import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Article from '../../interface/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleServiceService {

  constructor( private http:HttpClient) { }
  private url='http://localhost:5000/article/'

getAllArticle(){
  return this.http.get<Article[]>(this.url)
}
getMyArticle(){
  return this.http.get<Article[]>(this.url)

}
}
