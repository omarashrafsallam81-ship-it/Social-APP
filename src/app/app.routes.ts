import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { FeedComponent } from './features/feed/feed.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationComponent } from './features/notification/notification.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { SettingComponent } from './features/setting/setting.component';
import { BookmarksComponent } from './features/bookmarks/bookmarks.component';
import { MessagesComponent } from './features/messages/messages.component';
import { authGuardrd } from './core/auth/guards/auth-guard';
import { guestGuard } from './core/auth/guards/guest-guard';
import { MyPostsComponent } from './features/my-posts/my-posts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      { path: 'login', component: LoginComponent, title: 'login page ' },
      { path: 'register', component: RegisterComponent, title: 'Register page ' },
      { path: 'forget', component: ForgotPasswordComponent, title: 'Forget page ' },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuardrd],
    children: [
      { path: 'feed', component: FeedComponent, title: 'Feed page ' },
      { path: 'profile', component: ProfileComponent, title: 'Profile page ' },
      { path: 'notification', component: NotificationComponent, title: 'Notification page ' },
      { path: 'change', component: ChangePasswordComponent, title: 'Change page ' },
      { path: 'setting', component: SettingComponent, title: 'settings page ' },
      { path: 'bookmarks', component: BookmarksComponent, title: 'Bookmarks page ' },
      { path: 'Messages', component: MessagesComponent, title: 'Messages page ' },
      { path: 'my-posts', component: MyPostsComponent, title: 'my-posts ' },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'NotFound page ' },
];
