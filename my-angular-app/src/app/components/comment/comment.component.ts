import { Component, Input, signal } from '@angular/core';
import Comment from '../../../interface/comment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleServiceService } from '../../services/article-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: Comment[];
  @Input({ required: true }) idArticle!: string;
  replies = signal<Comment[]>([])
  newComment: string = ''
  newReply:string=''
  constructor(private articleService: ArticleServiceService) { }
  expandedCommentId: string | null = null;

  toggleExpanding(commentId: string) {
    this.expandedCommentId = this.expandedCommentId === commentId ? null : commentId;
this.showReplies(commentId)
  }
  showReplies(parentId: string) {
    console.log(parentId);
    this.articleService.showRepliesOnComment(parentId).subscribe((res) => {
      console.log(res);
      this.replies.set(res.parentComment)
    }, error => {
      console.log(error);
    })
  }
  createComment(event: any) {
    event.preventDefault()
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.articleService.createCommentByArticle(this.idArticle, this.newComment, headers).subscribe((res) => {
      console.log(res);
      this.comment.push(res.comment)
      this.newComment = ''
    }, error => {
      console.log(error);

    })
  }
  createReply(commentId: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.articleService.createReplyOnComment(commentId, this.newReply, headers).subscribe((res) => {
      console.log(res);
      this.replies.set([res.populatedReply,...this.replies()])
this.newReply=''
    }, error => {
      console.log(error);

    })
  }
}
