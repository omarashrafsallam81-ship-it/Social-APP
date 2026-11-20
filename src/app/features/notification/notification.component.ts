import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NavbarComponent } from '../../layouts/main-layout/components/navbar/navbar.component';
import { PostsService } from '../../core/services/posts.service';

@Component({
  selector: 'app-notification',
  imports: [NavbarComponent, DatePipe],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private readonly postsService = inject(PostsService);

  notifications = signal<any[]>([]);
  isLoading = signal(false);

  ngOnInit(): void {
    this.getNotifications();
    this.getUnreadNotificationsCount();
  }

  getUnreadNotificationsCount(): void {
    this.postsService.getUnreadNotificationsCount().subscribe({
      next: (res) => {
        console.log('Unread Notifications Count:', res);
      },

      error: (err) => {
        console.log('Unread Notifications Count Error:', err);
      },
    });
  }
  getNotifications(): void {
    this.isLoading.set(true);

    this.postsService.getNotifications(false, 1, 10).subscribe({
      next: (res) => {
        console.log('Notifications:', res);

        this.notifications.set(res.data.notifications ?? []);

        this.isLoading.set(false);
      },

      error: (err) => {
        console.log('Notifications Error:', err);

        this.isLoading.set(false);
      },
    });
  }
}
