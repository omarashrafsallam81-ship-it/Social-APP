import { User } from './post.interface';

export interface Post {
  _id: string;
  body?: string;
  image?: string;

  likes: any[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;

  liked: boolean;
  isShare: boolean;

  user: User;
  privacy: string;
  createdAt: string;
}
