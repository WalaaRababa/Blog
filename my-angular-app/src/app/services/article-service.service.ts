import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
getMyArticle(authorId:string|null){
  return this.http.get<Article[]>(this.url+'searchBy/'+authorId)
}
createArticle(article:FormData,headers:HttpHeaders):Observable<any>{
  return this.http.post(this.url,article,{headers})
}
createCommentByArticle(id:string,comment:string,headers:HttpHeaders):Observable<any>{
  return this.http.post(this.url+`${id}/comments`,{comment},{headers})
}
createReplyOnComment(commentId:string,comment:string,headers:HttpHeaders):Observable<any>{
  return this.http.patch(this.url+`reply/comments/${commentId}`,{comment},{headers})
}
showRepliesOnComment(parentId:string):Observable<any>{
  return this.http.get(this.url+`all/reply/${parentId}`)
}
}
