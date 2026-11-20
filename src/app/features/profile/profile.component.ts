import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProfileService } from './services/profile.service';

import { ProfileUser, SuggestionUser } from './upload-photo-response.interface';

@Component({
  selector: 'app-profile',
  imports: [ RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService);

  // =====================================================
  // PROFILE DATA
  // =====================================================

  profileData: ProfileUser | null = null;

  // =====================================================
  // PROFILE PHOTO
  // =====================================================

  profilePhoto = '/iamges/logo-3.jpeg';

  // =====================================================
  // COVER PHOTO
  // =====================================================

  coverPhoto = '';

  // =====================================================
  // SUGGESTIONS
  // =====================================================

  suggestions: SuggestionUser[] = [];

  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {
    this.getProfileData();
    this.getSuggestions();
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

  // =====================================================
  // GET SUGGESTIONS
  // =====================================================

  getSuggestions(): void {
    this.profileService.getSuggestions().subscribe({
      next: (response) => {
        console.log('Suggestions:', response);

        if (response.success && response.data) {
          this.suggestions = response.data;
        }
      },
    });
  }

  // =====================================================
  // UPLOAD PROFILE PHOTO
  // =====================================================

  uploadProfilePhoto(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    // Check image
    if (!file.type.startsWith('image/')) {
      console.error('Please select an image file');
      return;
    }

    // =====================================================
    // PREVIEW
    // =====================================================

    const reader = new FileReader();

    reader.onload = () => {
      this.profilePhoto = reader.result as string;
    };

    reader.readAsDataURL(file);

    // =====================================================
    // UPLOAD
    // =====================================================

    this.profileService.uploadPhoto(file).subscribe({
      next: (response) => {
        console.log('Photo uploaded successfully:', response);

        if (response.success && response.data?.photo) {
          const newPhoto = response.data.photo;


          // Update image
          this.profilePhoto = newPhoto;

          // Update profile data
          if (this.profileData) {
            this.profileData = {
              ...this.profileData,
              photo: newPhoto,
            };
          }
        }
      },
    });
  }

  // =====================================================
  // UPLOAD COVER PHOTO
  // =====================================================

  uploadCoverPhoto(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      console.error('Please select an image file');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.coverPhoto = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}
