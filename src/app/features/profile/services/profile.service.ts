import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ProfileResponse,
  SuggestionsResponse,
  UploadPhotoResponse,
} from '../upload-photo-response.interface';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly httpClient = inject(HttpClient);

  // =====================================================
  // GET PROFILE DATA
  // =====================================================

  getProfileData(): Observable<ProfileResponse> {
    return this.httpClient.get<ProfileResponse>(`${environment.baseUrl}/users/profile-data`);
  }

  // =====================================================
  // UPLOAD PROFILE PHOTO
  // =====================================================

  uploadPhoto(file: File): Observable<UploadPhotoResponse> {
    const formData = new FormData();

    formData.append('photo', file);

    return this.httpClient.put<UploadPhotoResponse>(
      `${environment.baseUrl}/users/upload-photo`,
      formData,
    );
  }

  // =====================================================
  // GET SUGGESTIONS
  // =====================================================

  getSuggestions(): Observable<SuggestionsResponse> {
    return this.httpClient.get<SuggestionsResponse>(
      `${environment.baseUrl}/users/suggestions?limit=10`,
    );
  }
}
