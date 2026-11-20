import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { CommentsResponse } from './comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getPostComment(postId: string): Observable<CommentsResponse> {
    return this.httpClient.get<CommentsResponse>(
      environment.baseUrl + `/posts/${postId}/comments?page=1&limit=10`,
    );
  }

  createComment(postId: string, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/posts/${postId}/comments`, data);
  }
}
