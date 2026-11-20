import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { PostsService } from '../../../../core/services/posts.service';
import { CommentPostComponent } from './comment-post/comment-post.component';
import { Post } from '../../../../core/models/post.interface';

@Component({
  selector: 'app-feed-content',
  imports: [
    ReactiveFormsModule,
    CommentPostComponent,
    DatePipe
  ],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit, OnDestroy {

  private readonly postsService = inject(PostsService);

  content: FormControl = new FormControl('');

  // =====================================================
  // POSTS
  // =====================================================

  postList: Post[] = [];

  userId: string = '';

  // =====================================================
  // CREATE POST
  // =====================================================

  saveFile!: File;

  imgUrl: string | ArrayBuffer | null | undefined;

  fileType: 'image' | 'video' | null = null;

  // =====================================================
  // STORIES
  // =====================================================

  storyGroups: {
    user: any;
    stories: Post[];
  }[] = [];

  selectedStoryGroup: {
    user: any;
    stories: Post[];
  } | null = null;

  selectedStoryIndex: number = 0;

  storyInterval: ReturnType<typeof setInterval> | null = null;

  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {
    this.getAllPostsData();

    const user = localStorage.getItem('socialUser');

    if (user) {
      this.userId = JSON.parse(user)?._id ?? '';
    }
  }

  // =====================================================
  // GET ALL POSTS
  // =====================================================

  getAllPostsData(): void {
    this.postsService.getAllposts().subscribe({
      next: (res) => {
        console.log('Posts:', res.data.posts);

        this.postList = res.data.posts;

        this.createStoryGroups();
      },

      error: (error) => {
        console.error('Get Posts Error:', error);
      }
    });
  }

  // =====================================================
  // GROUP STORIES BY USER
  // =====================================================

  createStoryGroups(): void {
    const groups = new Map<
      string,
      {
        user: any;
        stories: Post[];
      }
    >();

    this.postList.forEach((post) => {

      const userId = post.user._id;

      if (!groups.has(userId)) {
        groups.set(userId, {
          user: post.user,
          stories: [],
        });
      }

      groups.get(userId)!.stories.push(post);
    });

    this.storyGroups = Array.from(groups.values());
  }

  // =====================================================
  // OPEN STORY
  // =====================================================

  openStory(
    group: {
      user: any;
      stories: Post[];
    },
    index: number = 0
  ): void {

    this.selectedStoryGroup = group;

    this.selectedStoryIndex = index;

    document.body.style.overflow = 'hidden';

    this.startStoryTimer();
  }

  // =====================================================
  // CLOSE STORY
  // =====================================================

  closeStory(): void {

    this.selectedStoryGroup = null;

    this.selectedStoryIndex = 0;

    this.stopStoryTimer();

    document.body.style.overflow = '';
  }

  // =====================================================
  // NEXT STORY
  // =====================================================

  nextStory(): void {

    if (!this.selectedStoryGroup) {
      return;
    }

    const stories = this.selectedStoryGroup.stories;

    if (this.selectedStoryIndex < stories.length - 1) {

      this.selectedStoryIndex++;

      this.startStoryTimer();

    } else {

      this.closeStory();

    }
  }

  // =====================================================
  // PREVIOUS STORY
  // =====================================================

  previousStory(): void {

    if (!this.selectedStoryGroup) {
      return;
    }

    if (this.selectedStoryIndex > 0) {

      this.selectedStoryIndex--;

      this.startStoryTimer();

    }
  }

  // =====================================================
  // STORY TIMER
  // =====================================================

  startStoryTimer(): void {

    this.stopStoryTimer();

    this.storyInterval = setInterval(() => {
      this.nextStory();
    }, 5000);
  }

  // =====================================================
  // STOP STORY TIMER
  // =====================================================

  stopStoryTimer(): void {

    if (this.storyInterval) {

      clearInterval(this.storyInterval);

      this.storyInterval = null;
    }
  }

  // =====================================================
  // SELECT IMAGE / VIDEO
  // =====================================================

  changeImg(
    e: Event,
    type: 'image' | 'video'
  ): void {

    const input = e.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.saveFile = input.files[0];

      this.fileType = type;

      console.log('Selected File:', this.saveFile);
      console.log('File Type:', this.fileType);

      const fileReader = new FileReader();

      fileReader.readAsDataURL(this.saveFile);

      fileReader.onload = (event: ProgressEvent<FileReader>) => {

        this.imgUrl = event.target?.result;

      };
    }
  }

  // =====================================================
  // SUBMIT POST
  // =====================================================

  submitForm(
    e: Event,
    form: HTMLFormElement
  ): void {

    e.preventDefault();

    const formData = new FormData();

    if (this.content.value?.trim()) {

      formData.append(
        'body',
        this.content.value.trim()
      );

    }

    if (this.saveFile) {

      formData.append(
        'image',
        this.saveFile
      );

    }

    this.postsService.createPosts(formData).subscribe({

      next: (res) => {

        console.log('Create Post:', res);

        if (res.success) {

          form.reset();

          this.content.reset();

          this.saveFile = undefined as any;

          this.imgUrl = null;

          this.fileType = null;

          this.getAllPostsData();
        }

      },

      error: (error) => {
        console.error('Create Post Error:', error);
      }

    });
  }

  // =====================================================
  // DELETE POST
  // =====================================================

  deletePostItem(postId: string): void {

    this.postsService.deletePost(postId).subscribe({

      next: (res) => {

        console.log('Delete Post:', res);

        if (res.success) {

          this.getAllPostsData();

        }
      },

      error: (error) => {
        console.error('Delete Post Error:', error);
      }

    });
  }

  // =====================================================
  // REMOVE IMAGE / VIDEO
  // =====================================================

  removeImage(): void {

    this.saveFile = undefined as any;

    this.imgUrl = null;

    this.fileType = null;
  }

  // =====================================================
  // COMMENTS
  // =====================================================

  commentPostId: string | null = null;

  toggleComments(postId: string): void {

    if (this.commentPostId === postId) {

      this.commentPostId = null;

    } else {

      this.commentPostId = postId;

    }
  }

  // =====================================================
  // LIKE
  // =====================================================

  likePost(postId: string): void {

    console.log('Post ID:', postId);

    this.postsService.likePost(postId).subscribe({

      next: (response) => {

        console.log('Like Success:', response);

        const post = this.postList.find(
          (p) => p._id === postId
        );

        if (post) {

          post.liked = response.data.liked;

          post.likesCount = response.data.likesCount;

        }
      },

      error: (error) => {
        console.error('Like Error:', error);
      }

    });
  }

  // =====================================================
  // SHARE
  // =====================================================

  sharePost(postId: string): void {

    const post = this.postList.find(
      (p) => p._id === postId
    );

    if (!post) {
      return;
    }

    this.postsService.sharePost(postId).subscribe({

      next: (res) => {

        console.log('Share Success:', res);

        post.isShare = true;

        if (res.data?.post) {

          post.sharesCount =
            res.data.post.sharesCount;

        } else {

          post.sharesCount++;

        }
      },

      error: (error) => {
        console.error('Share Error:', error);
      }

    });
  }

  // =====================================================
  // BOOKMARK
  // =====================================================

  bookmarkPost(postId: string): void {

    this.postsService.bookmarkPost(postId).subscribe({

      next: (res) => {

        console.log('Bookmark Success:', res);

        const post = this.postList.find(
          (p: Post) => p._id === postId
        );

        if (post) {

          post.bookmarked =
            res.data.bookmarked;

          post.bookmarksCount =
            res.data.bookmarksCount;

          if (res.data.bookmarked) {

            this.postsService.addBookmarkedPost(post);

          } else {

            this.postsService.removeBookmarkedPost(postId);

          }
        }
      },

      error: (error) => {
        console.error('Bookmark Error:', error);
      }

    });
  }

  // =====================================================
  // REFRESH POSTS AFTER LIKE
  // =====================================================

  refreshPostsAfterLike(): void {

    this.postsService.getAllposts().subscribe({

      next: (res) => {

        this.postList = res.data.posts;

        this.createStoryGroups();

      },

      error: (error) => {
        console.error('Refresh Posts Error:', error);
      }

    });
  }

  // =====================================================
  // DESTROY
  // =====================================================

  ngOnDestroy(): void {

    this.stopStoryTimer();

    document.body.style.overflow = '';

  }
}