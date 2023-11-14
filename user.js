const root = document.querySelector('#root')
console.log(root);


const urlParams = new URLSearchParams(window.location.search)
const userId = urlParams.get('userId')

const fetchUserDataAndPosts = async (userId, callback) => {
    try{
        const [userResponse, postResponse]= await Promise.all([
            fetch(`https://dummyjson.com/users/${userId}`),
            fetch(`https://dummyjson.com/posts/user/${userId}`)
        ])
        if (!userResponse.ok){
            throw Error("Этого юзера не существует")
        };

        const userData = await userResponse.json()
        const postData = await postResponse.json()

        console.log('userData', userData.firstName, userData.email)
        console.log('postData', postData)

        showUser(userData.firstName, userData.email, postData.posts)

    } catch (error) { 
        console.log(error);
        root.innerHTML = `<h1>${error.message}</h1>`;
    } 
};
fetchUserDataAndPosts(userId, (firstName, mail, posts) => console.log(firstName, mail, posts));

const userContainer = document.createElement('ul')
root.append(userContainer)

let currentUserId = 1

const showUser = (userName, userEmail, posts) => {
    userContainer.innerHTML = ''
        const user = document.createElement('li')
        const name = document.createElement('h1')
        name.innerText = userName
        const email = document.createElement('h2')
        email.innerText = userEmail
        user.append(name, email)
        userContainer.append(user)

        posts.forEach((product) => {
            const post = document.createElement('li')
            const title = document.createElement('h4')
            title.innerText = product.title
            const body = document.createElement('p')
            body.innertext = product.body
            post.append(title, body)
            userContainer.append(post)
        })
}








// async function getUserAndPosts(userId) {
//   try {
      
//       const [userData, postData] = await Promise.all([
//           fetch(`https://dummyjson.com/users/${userId}`)
//           .then(response => response.json()),

//           fetch(`https://dummyjson.com/posts/user/${userId}`)
//           .then(response => response.json())
//       ])
    
//         console.log('userData', userData.firstName, userData.email)
//         console.log('postData', postData)
//   } catch (error) {
//     console.log(error);
//   }
// }

// getUserAndPosts(10);