# Task 3 – Backend Logic (Axios + TypeScript)

This task demonstrates how to use **Axios** with **TypeScript** to integrate with a public API, applying proper typing and a clean structure.
The goal was to write the code in a way that another developer could easily understand, reuse, or extend.

---

## Objective
- Use Axios to fetch and send data
- Define TypeScript interfaces/types for request and response payloads
- Keep async logic clean and organized in a `services/` folder
- Use a public API (using JSONPlaceholder here)
- No UI implemented — results are logged in the console

---

## Project Structure

task3-Axios/
├── services/
│ ├── api.ts # Centralized Axios instance with baseURL and timeout
│ └── apiService.ts # API calls for posts (uses api.ts)
├── types/
│ └── post.ts # Request & response TypeScript models
├── index.ts # Entry point for running the demo
├── package.json
└── tsconfig.json

---

## API Functions Implemented

**`getPosts(): Promise<Post[]>`**  
-> Fetches all posts.

**`getPostById(id: number): Promise<Post>`**  
-> Fetches a single post by ID.

**`createPost(data: CreatePostRequest): Promise<Post>`**  
-> Creates a new post with a title, body, and userId.

---
## Running the Project

### 1. Install dependencies
```bash
npm install 
    Required packages:
        axios (HTTP client)
        typescript, ts-node (TypeScript compilation and execution)
```
### 2. Run the code
npm run start

### 3. Sample output

Fetching posts...
Fetched 100 posts and showing first 2 posts:
[
  {
    userId: 1,
    id: 1,
    title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\n' +
      'suscipit recusandae consequuntur expedita et cum\n' +
      'reprehenderit molestiae ut ut quas totam\n' +
      'nostrum rerum est autem sunt rem eveniet architecto'
  },
  {
    userId: 1,
    id: 2,
    title: 'qui est esse',
    body: 'est rerum tempore vitae\n' +
      'sequi sint nihil reprehenderit dolor beatae ea dolores neque\n' +
      'fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\n' +
      'qui aperiam non debitis possimus qui neque nisi nulla'
  }
]

Fetching post with ID 5...
Fetched Post by ID given:  {
  userId: 1,
  id: 5,
  title: 'nesciunt quas odio',
  body: 'repudiandae veniam quaerat sunt sed\n' +
    'alias aut fugiat sit autem sed est\n' +
    'voluptatem omnis possimus esse voluptatibus quis\n' +
    'est aut tenetur dolor neque'
}

Creating a new post...
Created post: {
  userId: 1,
  title: 'My test post',
  body: 'This is a test post created during the coding challenge.',
  id: 101
}

---

# Notes
    api.ts contains a single Axios instance with:
        baseURL pointing to JSONPlaceholder
        timeout set to 5 seconds
        All requests share the same baseURL and timeout
        Updating headers, interceptors, or timeouts happens in one place
        Other services can reuse this
    All API calls in apiService.ts import this instance to ensure consistency.
    TypeScript types ensure data safety and clarity.
    This structure can easily be extended for more endpoints or other APIs.

---