export interface Share {
  _id: string;

  body?: string;
  image?: string;

  likes: any[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;

  user: any;
  privacy: string;
  createdAt: string;

  isShared: boolean;
}
