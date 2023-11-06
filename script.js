const root = document.querySelector("#root");
const form = document.querySelector("#postForm");
const comment = document.querySelector("#comment");
const wrapper = document.querySelector("#wrapper")

let countLike = ""

const renderPost = (comment, user) => {
     const postList = document.createElement('div')
     postList.classList.add('postElement')

     const postMain = document.createElement('div')
     postMain.classList.add('postMain')
    //  postMain.append(avatar, boxAvatar)

     const postText = document.createElement('p')
     postText.innerText = comment.body //post.body
     

     const image = document.createElement('img')
     image.classList.add('image_post')
     image.src = 'media/image 1.svg'

     const reaction = document.createElement('img')
     reaction.classList.add('reaction')
    //  reaction.innerText = post.reactions;
     reaction.src = 'media/heart-regular.svg'

     const countLike = document.createElement('span')
     countLike.innerText = countLike

     const likeMain = document.createElement('div')
     likeMain.classList.add('likeMain')
     likeMain.append(reaction, countLike)

     const userName = document.createElement('p')
     userName.innerText = `@ ${user.firstName}`

     const avatar = document.createElement('img')
     avatar.classList.add('avatar')
     avatar.src = user.image
     
     const boxAvatar = document.createElement('div')
     boxAvatar.classList.add('boxAvatar')
     boxAvatar.append(userName, postText)

     postList.append(postMain, image, likeMain)
     wrapper.append(postList)

      reaction.addEventListener('click', () => {
        countLike++
        countLike.innerText = countLike
        reaction.src = 'media/heart-regular.svg'
      })

} 


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


async function getUserName(userId) {
    const response = await fetch(`https://dummyjson.com/users/${userId}`);
    const userData = await response.json();
    return userData;
  }

getPosts()
.then(async (data) => {
  if (Array.isArray(data.posts)) {
    for (const post of data.posts) {
      if (post.userId) {
        const userInfo = await getUserName(post.userId);

        const postElement = document.createElement('div');
        postElement.classList.add('postElement');

        const reaction = document.createElement('p');
        reaction.classList.add('reaction')
        reaction.innerText = post.reactions;
        reaction.src = 'media/heart-regular.svg'

        const userImage = document.createElement('img');
        userImage.classList.add('userImage');
        userImage.src = userInfo.image;

        postElement.innerHTML = `<p> @ ${userInfo.firstName}</p>
                                 <p> ${post.body}</p>`;
        postElement.append(userImage, reaction);                         
        wrapper.append(postElement);
      }
    }
  }
})
.catch((error) => {
  console.error(error);
});



async function addPost(post) {
    try {
        const response = await fetch('https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
              
            })
          
  const postData = await response.json();
  const userResponse = await fetch ('https://dummyjson.com/user/1');
  const userInfo = await userResponse.json();
  console.log(userInfo);
  renderPost (postData, userInfo);  
    } catch (error) {
        console.error(error);
    }
  }
  
form.addEventListener('submit', async (event) => {
  event.preventDefault();
    const newPost = {
      body: comment.value,
      userId: 1
    }
    console.log(newPost);
    addPost(newPost)
    comment.value = ''
  }
)
console.log('hello AnnA!');
console.log('hello');



