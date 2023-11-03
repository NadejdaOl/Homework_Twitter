const root = document.querySelector("#root");
const form = document.querySelector("postForm");
const commentInput = document.querySelector("#comment");



// Функция для получения всех постов

  async function getPosts() {
    try {
      const response = await fetch('https://dummyjson.com/posts');
      if (response.ok) {
        const posts = await response.json();
        return posts;
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (error) {
      console.error(error);
    }
  }

// Функция для получения имени пользователя по userId
async function getUserName(userId) {
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    const user = await response.json();
    return user.name;
  }
 // Функция для добавления нового поста
async function addPost(comment) {
    const response = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'I am in love with someone.',
          userId: 5,
          /* other post data */
        })
      })
    
    const newPost = await response.json();
    return newPost;
  }
 // Обработчик события отправки формы

 document.getElementById('postForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const comment = document.getElementById('comment').value;
    if (comment) {
      const newPost = await addPost(comment);
      const userName = await getUserName(newPost.userId);

//  новый пост на странице
const postElement = document.createElement('div');
    postElement.innerHTML = `<p>User: ${userName}</p><p>Comment: ${newPost.comment}</p>`;
    document.body.appendChild(postElement);
    

// очист поле ввода комментария
document.getElementById('comment').value = '';
  }
});


getPosts()
.then(async (posts) => {
  if (Array.isArray(posts)) {
    for (const post of posts) {
      if (post.userId) {
        const userName = await getUserName(post.userId);
        const postElement = document.createElement('div');
        postElement.innerHTML = `<p>User: ${userName}</p><p>Comment: ${post.comment}</p>`;
        document.body.appendChild(postElement);
      }
    }
  }
})
.catch((error) => {
  console.error(error);
});

