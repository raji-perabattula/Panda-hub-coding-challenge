import { getPosts, createPost, getPostById } from './services/apiService';

async function main() {
    // Fetch and log posts start
  console.log('Fetching posts...');
  const posts = await getPosts();
  console.log(`Fetched ${posts.length} posts and showing first 2 posts:`);
  console.log(posts.slice(0, 2)); // showing first 2 posts
    // Fetch and log posts end

    // Fetch single post by ID and log it start
  console.log('\nFetching post with ID 5...');
  const post = await getPostById(5);
  console.log(`Post of ID 5 is: ${post}`);
    // Fetch single post by ID and log it end

    // Create a new post and log the response start
  console.log('\nCreating a new post...');
  const newPost = await createPost({
    userId: 1,
    title: 'My test post',
    body: 'This is a test post created during the coding challenge.',
  });
  console.log('Created post:', newPost);
    // Create a new post and log the response end
}

main().catch((err) => console.error(err)); // log any unhandled errors
