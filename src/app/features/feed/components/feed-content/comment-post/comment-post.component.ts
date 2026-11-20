import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CommentsService } from './comments.service';
import { Comment } from './comment.interface';

@Component({
  selector: 'app-comment-post',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './comment-post.component.html',
  styleUrl: './comment-post.component.css',
})
export class CommentPostComponent {
  private readonly commentsService = inject(CommentsService);

  // ================= POST =================

  @Input() postId: string = '';

  // ================= COMMENTS =================

  commentsList: Comment[] = [];

  private _showComments = false;

  @Input()
  set showComments(value: boolean) {
    this._showComments = value;

    // أول ما نفتح الكومنتات
    if (value && this.postId) {
      this.getCommentPost();
    }

    // لما نقفل الكومنتات
    if (!value) {
      this.showAllComments = false;
      this.showEmojiPicker = false;
    }
  }

  get showComments(): boolean {
    return this._showComments;
  }

  // أول 3 فقط
  showAllComments = false;

  isLoadingComments = false;

  // ================= COMMENT INPUT =================

  commentContent = new FormControl('');

  // ================= EMOJI =================

  showEmojiPicker = false;

  emojis = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😂',
    '🤣',
    '😊',
    '😍',
    '🥰',
    '😘',
    '😎',
    '🤩',
    '🔥',
    '❤️',
    '👍',
    '👏',
    '🎉',
    '🙏',
    '💯',
    '✨',
    '😢',
    '😭',
    '😡',
    '🤔',
  ];

  // ================= GET COMMENTS =================

  getCommentPost(): void {
    if (!this.postId) {
      return;
    }

    this.isLoadingComments = true;

    this.commentsService.getPostComment(this.postId).subscribe({
      next: (res) => {
        console.log('Comments Response:', res);

        this.commentsList = res.data?.comments ?? [];

        this.isLoadingComments = false;
      },
    });
  }

  // ================= VIEW ALL COMMENTS =================

  viewAllComments(): void {
    this.showAllComments = true;
  }

  // ================= CREATE COMMENT =================

  createComment(): void {
    const content = this.commentContent.value?.trim() ?? '';

    // منع إرسال Comment أقل من حرفين
    if (content.length < 2) {
      return;
    }

    const data = {
      content: content,
    };

    this.commentsService.createComment(this.postId, data).subscribe({
      next: (res) => {
        console.log('Create Comment Response:', res);

        if (res.success) {
          // تنظيف الـ input
          this.commentContent.reset();

          // إغلاق Emoji Picker
          this.showEmojiPicker = false;

          // عرض كل الكومنتات بعد الإضافة
          this.showAllComments = true;

          // تحديث الكومنتات
          this.getCommentPost();
        }
      },
    });
  }

  // ================= EMOJI PICKER =================

  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  // ================= ADD EMOJI =================

  addEmoji(emoji: string): void {
    const currentValue = this.commentContent.value ?? '';

    this.commentContent.setValue(currentValue + emoji);

    this.showEmojiPicker = false;
  }
}
