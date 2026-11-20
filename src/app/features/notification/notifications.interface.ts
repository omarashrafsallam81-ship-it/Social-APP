export interface Notification {
  _id: string;
  recipient: {
    _id: string;
    name: string;
    photo: string;
  };
  actor: {
    _id: string;
    name: string;
    photo: string;
  };
  type: 'comment_post' | 'like_post';
  entityType: 'post';
  entityId: string;
  isRead: boolean;
  createdAt: string;
  entity: {
    _id: string;
    body: string;
    image: string;
    user: string;
    commentsCount: number;
    topComment: {
      _id: string;
      content: string;
      commentCreator: {
        _id: string;
        name: string;
        username: string;
        photo: string;
      };
      post: string;
      parentComment: string | null;
      likes: unknown[];
      createdAt: string;
    } | null;
    sharesCount: number;
    likesCount: number;
    isShare: boolean;
    id: string;
  };
}
