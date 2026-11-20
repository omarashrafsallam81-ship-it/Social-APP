import { Component, inject, OnInit } from '@angular/core';

import { NavbarComponent } from '../../layouts/main-layout/components/navbar/navbar.component';
import { FeedContentComponent } from './components/feed-content/feed-content.component';
import { SideRightComponent } from './components/side-right/side-right.component';

import { ProfileService } from '../profile/services/profile.service';
import {
  ProfileUser,
  SuggestionUser
} from '../profile/upload-photo-response.interface';

@Component({
  selector: 'app-feed',
  imports: [
    NavbarComponent,
    FeedContentComponent,
    SideRightComponent
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent implements OnInit {

  private readonly profileService = inject(ProfileService);

  // =====================================================
  // PROFILE DATA
  // =====================================================

  profileData: ProfileUser | null = null;

  profilePhoto = '/iamges/logo-3.jpeg';

  // =====================================================
  // SUGGESTIONS
  // =====================================================

  suggestions: SuggestionUser[] = [];

  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {
    this.getProfileData();
  }

  // =====================================================
  // GET PROFILE DATA
  // =====================================================

  getProfileData(): void {

    this.profileService.getProfileData().subscribe({

      next: (response) => {

        console.log('Profile Response:', response);

        if (response.success && response.data?.user) {

          this.profileData = response.data.user;

          console.log('Profile User:', this.profileData);
          console.log('User ID:', this.profileData._id);

          this.profilePhoto =
            this.profileData.photo || '/iamges/logo-3.jpeg';
        }

      },

      error: (error) => {

        console.error('Profile API Error:', error);

      },

    });

  }

}