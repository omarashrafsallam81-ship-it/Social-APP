
export interface ProfileUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo: string;
  cover: string;
  bookmarks: string[];
  followers: string[];
  following: string[];
  createdAt: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: ProfileUser;
  };
}

export interface UploadPhotoResponse {
  success: boolean;
  message: string;
  data: {
    photo: string;
    postId: string;
  };
}

export interface SuggestionUser {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface SuggestionsResponse {
  success: boolean;
  message: string;
  data: SuggestionUser[];
}