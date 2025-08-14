import { Post, CreatePostRequest } from '../types/post';
import api from './api';

// Get posts list function
export async function getPosts(): Promise<Post[]> {
  const response = await api.get<Post[]>('/posts');
  return response.data;
}

// Create post list function
export async function createPost(data: CreatePostRequest): Promise<Post> {
  const response = await api.post<Post>('/posts', data);
  return response.data;
}

// Get single post by ID function, id is passed as parameter from component
export async function getPostById(id: number): Promise<Post> {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
}