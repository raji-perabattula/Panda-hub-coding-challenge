// type interfaces for post object data
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// type interface for creating a new post request
export interface CreatePostRequest {
  userId: number;
  title: string;
  body: string;
}
