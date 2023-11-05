const root = document.querySelector("#root");
const form = document.querySelector("#postForm");
const commentInput = document.querySelector("#comment");
const wrapper = document.querySelector("#wrapper")



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

      const postElement = document.createElement('div');
      postElement.innerHTML = `<p>User: ${userName}</p>
                               <p>Comment: ${newPost.title}</p>`;
      wrapper.appendChild(postElement);
      
      document.getElementById('comment').value = ''; // Очищаем поле ввода
            }
        });


getPosts()
.then(async (data) => {
  if (Array.isArray(data.posts)) {
    for (const post of data.posts) {
      if (post.userId) {
        const userName = await getUserName(post.userId);
        const postElement = document.createElement('div');
        postElement.innerHTML = `<p>User: ${userName}</p><p>Comment: ${post.title}</p>`;
        wrapper.appendChild(postElement);
      }
    }
  }
})
.catch((error) => {
  console.error(error);
});

// Загрузка постов при запуске страницы
// window.addEventListener('DOMContentLoaded', async () => {
//   const posts = await getPosts();
//   displayPosts(posts);
// });
// //=================

//  новый пост на странице
// const postElement = document.createElement('div');
//     postElement.innerHTML = `<p>User: ${userName}</p><p>Comment: ${newPost.comment}</p>`;
//     document.body.appendChild(postElement);
    

// очист поле ввода комментария
// document.getElementById('comment').value = '';
//   }
// });



// // Функция для добавления нового поста
// async function addPost(comment) {
//   try {
//       const response = await fetch('https://dummyjson.com/posts/add', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//               comment: comment
//               // Другие данные для отправки, если есть
//           })
//       });

//       if (response.ok) {
//           const newPost = await response.json();
//           return newPost;
//       } else {
//           throw new Error('Не удалось добавить новый пост');
//       }
//   } catch (error) {
//       console.error(error);
//   }
// }

// // Обработчик отправки формы
// document.getElementById('postForm').addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const comment = document.getElementById('comment').value;
//   if (comment) {
//       const newPost = await addPost(comment);
//       const posts = await getPosts();
//       displayPosts(posts);
//       document.getElementById('comment').value = ''; // Очищаем поле ввода
//   }
// });

// // Загрузка постов при запуске страницы
// window.addEventListener('DOMContentLoaded', async () => {
//   const posts = await getPosts();
//   displayPosts(posts);
// });

 // Функция для отображения постов
//  function displayPosts(posts) {
//   const postList = document.getElementById('postList');
//   postList.innerHTML = ''; // Очищаем содержимое для обновления

//   posts.forEach(async (post) => {
//       const userName = await getUserName(post.userId);
//       const postElement = document.createElement('div');
//       postElement.innerHTML = `
//           <p>User: ${userName}</p>
//           <p>Comment: ${post.title}</p>
//           <hr>
//       `;
//       postList.appendChild(postElement);
//   });
// }

