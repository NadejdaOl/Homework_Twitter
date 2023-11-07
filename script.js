const root = document.querySelector("#root");
const form = document.querySelector("#postForm");
const input = document.querySelector("input");
const header = document.querySelector("header")
const comment = document.querySelector("#comment");
const wrapper = document.querySelector("#wrapper");


let countLike = 0;

const renderPost = (comment, user) => {
  const postList = document.createElement("div");
  postList.classList.add("postList");
  const image = document.createElement("img");

  const postMain = document.createElement("div");
  postMain.classList.add("postMain");
  
  const avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = user.image;

  const boxAvatar = document.createElement("div");
  boxAvatar.classList.add("boxAvatar");

  const userName = document.createElement("p");
  userName.classList.add('userName')
  userName.innerText = `@ ${user.firstName}`;
  
  const postText = document.createElement("p");
  postText.innerText = comment.body; //post.body

  const reaction = document.createElement("img");
  reaction.classList.add("reaction");
  reaction.src = "media/heart11.png";

  const likeCounter = document.createElement("span");

  reaction.addEventListener("click", () => {
    countLike++;
    likeCounter.innerText = countLike;
    reaction.src = "media/heart1.png";
  });

  likeCounter.innerText = countLike;

  const likeMain = document.createElement("div");
  likeMain.classList.add("likeMain");

  likeMain.append(reaction, likeCounter);
  boxAvatar.append(userName, postText);
  postMain.append(avatar, boxAvatar);
  postList.append(postMain,likeMain);
  wrapper.appendChild(postList);
  
};

async function getPosts() {
  try {
    const response = await fetch("https://dummyjson.com/posts");
    if (response.ok) {
      const posts = await response.json();
      return posts;
    } else {
      throw new Error("Failed to fetch posts");
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
          
          const commentAll = document.createElement('div')
          commentAll.classList.add('commentAll')

          const likeDiv = document.createElement('div')
          likeDiv.classList.add('likeDiv')
          
          const postElement = document.createElement("div");
          postElement.classList.add("postElement");

          const userImage = document.createElement("img");
          userImage.classList.add("userImage");
          userImage.src = userInfo.image;

          const reaction = document.createElement('img');
          const likeCounter = document.createElement("p");
          reaction.classList.add("reaction");
          
          reaction.src = "media/heart11.png";
          
          let likeCount = post.reactions
            reaction.addEventListener('click', () => {
                likeCount++
                likeCounter.innerText = likeCount
                reaction.src = "media/heart1.png"
            })
            likeCounter.innerText = post.reactions;

          const userData = document.createElement('div');
          userData.classList.add("userData");

          const nikUser = document.createElement('p');
          nikUser.classList.add('nikUser')
          nikUser.innerText = `@ ${userInfo.firstName}`;

          const userPost = document.createElement('p');
          userPost.innerText = `${post.body}`;

          userData.append(nikUser, userPost);
          likeDiv.append(reaction, likeCounter);
          postElement.append(userImage, userData);
          commentAll.append(postElement, likeDiv);
          wrapper.append(commentAll);
          // form.append(commentAll);
          // wrapper.append(form);
          
        }
      }
    }
  })
  .catch((error) => {
    console.error(error);
  });

async function addPost(post) {
  try {
    const response = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    const postData = await response.json();
    const userResponse = await fetch("https://dummyjson.com/user/1");
    const userInfo = await userResponse.json();
    console.log(userInfo);

    renderPost(postData, userInfo);

  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newPost = {
    body: input.value,
    userId: 1,
  };
  console.log(newPost);
  addPost(newPost);
  input.value = "";
});

