import { Component, inject } from '@angular/core';

import { NavbarComponent } from '../../layouts/main-layout/components/navbar/navbar.component';
import { PostsService } from '../../core/services/posts.service';

@Component({
  selector: 'app-bookmarks',
  imports: [NavbarComponent],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css',
})
export class BookmarksComponent {
  private readonly postsService = inject(PostsService);

  bookmarkedPosts = this.postsService.bookmarkedPosts;
  removeBookmark(postId: string): void {
    this.postsService.bookmarkPost(postId).subscribe({
      next: (res) => {
        console.log('Bookmark removed:', res);

        if (res.data.bookmarked === false) {
          this.postsService.removeBookmarkedPost(postId);
        }
      },
      error: (err) => {
        console.log('Remove Bookmark Error:', err);
      },
    });
  }
}
