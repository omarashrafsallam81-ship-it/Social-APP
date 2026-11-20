import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);
  bookmarkedPosts = signal<Post[]>([]);
  getAllposts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/posts`);
  }

  createPosts(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/posts`, data);
  }

  getSinglePost(postId: string): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/posts/${postId}`);
  }

  deletePost(postId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `/posts/${postId}`);
  }

  likePost(postId: string): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}/like`, {});
  }
  sharePost(postId: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `/posts/${postId}/share`, {});
  }
  uploadPhoto(file: File) {
    const formData = new FormData();

    formData.append('photo', file);

    return this.httpClient.put(environment.baseUrl + `/users/upload-photo`, formData);
  }
  bookmarkPost(postId: string): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/posts/${postId}/bookmark`, {});
  }

  getNotifications(unread: boolean = false, page: number = 1, limit: number = 10): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/notifications?unread=${unread}&page=${page}&limit=${limit}`,
    );
  }
  getUnreadNotificationsCount(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/notifications/unread-count`);
  }
  addBookmarkedPost(post: Post): void {
    this.bookmarkedPosts.update((posts) => {
      const exists = posts.some((p) => p._id === post._id);

      if (exists) {
        return posts.map((p) => (p._id === post._id ? post : p));
      }

      return [...posts, post];
    });
  }

  removeBookmarkedPost(postId: string): void {
    this.bookmarkedPosts.update((posts) => posts.filter((p) => p._id !== postId));
  }
}
