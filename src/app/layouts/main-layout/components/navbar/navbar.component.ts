import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly postsService = inject(PostsService);

  unreadNotificationsCount = signal(0);

  ngOnInit(): void {
    this.getUnreadNotificationsCount();
  }

  getUnreadNotificationsCount(): void {
    this.postsService.getUnreadNotificationsCount().subscribe({
      next: (res) => {
        console.log('Navbar Unread Count:', res);

        this.unreadNotificationsCount.set(res.data.unreadCount);
      },

      error: (err) => {
        console.log('Navbar Unread Count Error:', err);
      },
    });
  }
}
