export interface Post {
  _id: string;

  body?: string;
  image?: string;

  likes: any[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;

  liked: boolean;
  bookmarked: boolean;
  bookmarksCount: number;

  isShare: boolean;

  user: User;
  privacy: string;
  createdAt: string;
}
export interface User {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
export interface TopComment {
  _id: string;
  content: string;

  commentCreator: User;

  post: string;
  parentComment: null;

  likes: any[];

  createdAt: string;
}
