import {createNavBar, createMainPage, getFeed} from './create.js';
import {toBase64} from './helpers.js';
import {createLogInModal, createSignUpModal} from './modals.js';
import {createUpvotesModal, createCommentsModal, 
        createImageModal, createProfileModal, createNewPostModal} from './modals.js';

/////////////////
// AUTH VARIABLES
/////////////////
localStorage.clear();
localStorage.setItem('userLoggedIn', 'false');
localStorage.setItem('userToken', '');
localStorage.setItem('userName', '');

function initApp(apiUrl) {
   // Save apiUrl
   localStorage.setItem('apiUrl', apiUrl);

   // Feed page number
   let feedPage = 0;
   let pageLoaded = false;

   document.getElementById("root").innerHTML = "";

   //////////////////////////////
   // CREATE MAIN PAGE COMPONENTS
   //////////////////////////////

   const pageElements = [createNavBar(), createMainPage()];

   Promise.all(pageElements).then(([createdNavBar, createdFeed]) => {

      // CREATE HEADER
      const header = createdNavBar;
      document.getElementById("root").appendChild(header);
      
      // CREATE MAIN
      const main = document.createElement('main');
      main.setAttribute('role', 'main');
      const feed = createdFeed;
      main.append(feed);
      document.getElementById("root").appendChild(main);
   
      // CREATE FOOTER
      const footer = document.createElement('footer');
      document.getElementById("root").appendChild(footer);
      

      /////////
      // IMAGES
      /////////
      document.getElementsByName("thumbnail").forEach(t => {
         t.addEventListener('click', (e) => {
            const postId = e.target.parentNode.parentNode.dataset.idPost;
            createImageModal(postId)
            .then(imageModal => {
               document.getElementById("root").appendChild(imageModal);
               document.body.style.overflow = "hidden";

               document.getElementById("closeImageModal").addEventListener('click', () => {
                  imageModal.remove();
                  document.body.style.overflow = "visible";
               });
               // Close when grey area is clicked
               imageModal.onclick = (e) => {
                  if (e.target == imageModal) {
                     imageModal.remove();
                     document.body.style.overflow = "visible";
                  }
               };
            });
         });
      });

      
      if (localStorage.getItem('userLoggedIn') == 'true') {
         /////////
         // LOGOUT
         /////////
         document.getElementById("logoutButton").addEventListener('click', () => {
            localStorage.setItem('userLoggedIn', 'false')
            localStorage.setItem('userToken', '');
            localStorage.setItem('userName', '');
            initApp(apiUrl);
         });
         
         //////////////////
         // INFINITE SCROLL
         //////////////////
         window.onscroll = () => {
            const feed = document.getElementById('feed');
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !pageLoaded) {
               feedPage++;
               getFeed(feedPage*10)
               .then(f => {
                  if (f.length == 0) pageLoaded = true;
                  else f.forEach(post => feed.appendChild(post));
               });
            }
         };

         /////////
         // VOTING
         /////////
         document.getElementsByName("voteUp").forEach(v => {
            v.addEventListener('click', (e) => {
               // Get post id
               let votes;
               if (e.target.nodeName == 'I') votes = e.target.parentNode.parentNode;
               else votes = e.target.parentNode;
               const id = votes.parentNode.dataset.idPost;
               const currVotes = Number(votes.childNodes[1].dataset.idUpvotes);

               if (v.dataset.voted === 'yes') {
                  vote(id, 'DELETE')
                  .then(outcome => {
                     if (outcome == 'success') {
                        // Toggle
                        v.setAttribute('data-voted', 'no');
                        v.classList.remove('vote-toggled');
                        v.classList.add('vote-element');
                        // Decrease votes
                        votes.childNodes[1].setAttribute('data-id-upvotes', currVotes-1);
                        votes.childNodes[1].textContent = currVotes-1;
                     }
                  });
               } else {
                  vote(id, 'PUT')
                  .then(outcome => {
                     if (outcome == 'success') {
                        // Toggle
                        v.setAttribute('data-voted', 'yes');
                        v.classList.remove('vote-element');
                        v.classList.add('vote-toggled');
                        // Increment votes
                        votes.childNodes[1].setAttribute('data-id-upvotes', currVotes+1);
                        votes.childNodes[1].textContent = currVotes+1;
                     }
                  });
               }
            });
         });

         //////////
         // UPVOTES
         //////////
         document.getElementsByName("upvotesCount").forEach(u => {
            u.addEventListener('click', (e) => {
               const postId = e.target.parentNode.parentNode.dataset.idPost;
               createUpvotesModal(postId)
               .then(upvotesModal => {
                  document.getElementById("root").appendChild(upvotesModal);
                  document.body.style.overflow = "hidden";
   
                  document.getElementById("closeUpvotesModal").addEventListener('click', () => {
                     upvotesModal.remove();
                     document.body.style.overflow = "visible";
                  });
                  // Close when grey area is clicked
                  upvotesModal.onclick = (e) => {
                     if (e.target == upvotesModal) {
                        upvotesModal.remove();
                        document.body.style.overflow = "visible";
                     }
                  };
               });
            });
         });

         ///////////
         // COMMENTS
         ///////////
         document.getElementsByName("comments").forEach(c => {
            c.addEventListener('click', (e) => {
               const postId = e.target.parentNode.parentNode.parentNode.dataset.idPost;
               createCommentsModal(postId)
               .then(commentsModal => {
                  document.getElementById("root").appendChild(commentsModal);
                  document.body.style.overflow = "hidden";
   
                  document.getElementById("closeUpvotesModal").addEventListener('click', () => {
                     commentsModal.remove();
                     document.body.style.overflow = "visible";
                  });
                  // Close when grey area is clicked
                  commentsModal.onclick = (e) => {
                     if (e.target == commentsModal) {
                        commentsModal.remove();
                        document.body.style.overflow = "visible";
                     }
                  };
                  // Send comment
                  const commentForm = document.getElementById('commentForm');
                  commentForm.addEventListener('submit', (e) => {
                     e.preventDefault();

                     comment(postId, commentForm.text.value)
                     .then(outcome => {
                        if (outcome == 'success') {
                           // Create list item with comment
                           const item = document.createElement('li');
                           item.classList.add('modal-item');
                           const itemAuthor = document.createElement('b');
                           itemAuthor.textContent = `${localStorage.getItem('userName')}: `;
                           item.appendChild(itemAuthor);
                           const itemComment = document.createTextNode(commentForm.text.value);
                           item.appendChild(itemComment);
                           // Append to modal
                           document.getElementById('commentsList').appendChild(item);
                           // Clear text field
                           commentForm.reset();
                        }
                     });
                  });
               });
            });
         });

         //////////
         // PROFILE
         //////////
         document.getElementById('profile').addEventListener('click', () => {
            createProfileModal()
            .then(profileModal => {
               document.getElementById("root").appendChild(profileModal);
               document.body.style.overflow = "hidden";

               document.getElementById("closeProfileModal").addEventListener('click', () => {
                  profileModal.remove();
                  document.body.style.overflow = "visible";
               });
               // Close when grey area is clicked
               profileModal.onclick = (e) => {
                  if (e.target == profileModal) {
                     profileModal.remove();
                     document.body.style.overflow = "visible";
                  }
               };
            });
         });

         ///////
         // POST
         ///////
         const newPostModal = createNewPostModal();
         document.getElementById("root").appendChild(newPostModal);
         document.getElementById("closeNewPostModal").addEventListener('click', () => {
            newPostModal.style.display = 'none';
            document.getElementById("newPostForm").reset();
            document.getElementById("newPostError").textContent = "";
            document.body.style.overflow = "visible";
         });
         document.getElementById("postButton").addEventListener('click', () => {
            newPostModal.style.display = 'block';
            document.body.style.overflow = "hidden";
         });

         // Close when grey area is clicked
         newPostModal.onclick = (e) => {
            if (e.target == newPostModal) {
               newPostModal.style.display = "none";
               document.getElementById("newPostForm").reset();
               document.getElementById('newPostError').textContent = "";
               document.body.style.overflow = "visible";
            }
         };

         // Submit login
         const newPostForm = document.getElementById('newPostForm');
         newPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            sendNewPost(newPostForm);
         });

      } else {
         /////////
         // LOG IN
         /////////
         const loginModal = createLogInModal();
         document.getElementById("root").appendChild(loginModal);
         document.getElementById("closeLoginModal").addEventListener('click', () => {
            loginModal.style.display = 'none';
            document.getElementById("loginForm").reset();
            document.getElementById("loginError").textContent = "";
            document.body.style.overflow = "visible";
         });
         document.getElementById("loginButton").addEventListener('click', () => {
            loginModal.style.display = 'block';
            document.body.style.overflow = "hidden";
         });
   
         // Close when grey area is clicked
         loginModal.onclick = (e) => {
            if (e.target == loginModal) {
               loginModal.style.display = "none";
               document.getElementById("loginForm").reset();
               document.getElementById('loginError').textContent = "";
               document.body.style.overflow = "visible";
            }
         };
   
         // Submit login
         const loginForm = document.getElementById('loginForm');
         loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            authLogin(loginForm);
         });
   
         //////////
         // SIGN UP
         //////////
         const signupModal = createSignUpModal();
         document.getElementById("root").appendChild(signupModal);
         document.getElementById("closeSignupModal").addEventListener('click', () => {
            signupModal.style.display = 'none';
            document.getElementById("signupForm").reset();
            document.getElementById('signupError').textContent = "";
            document.body.style.overflow = "visible";
         });
         document.getElementById("signupButton").addEventListener('click', () => {
            signupModal.style.display = 'block';
            document.body.style.overflow = "hidden";
         });
   
         // Close when grey area is clicked
         signupModal.onclick = (e) => {
            if (e.target == signupModal) {
               signupModal.style.display = "none";
               document.getElementById("signupForm").reset();
               document.getElementById('signupError').textContent = "";
               document.body.style.overflow = "visible";
            }
         };
   
         // Submit signup
         const signupForm = document.getElementById('signupForm');
         signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            authSignup(signupForm);
         });
      }
   });
}

function authLogin(form) {
   const apiUrl = localStorage.getItem('apiUrl');

   const payload = {
      username: form.username.value,
      password: form.password.value
   }
   const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
   }

   fetch(`${apiUrl}/auth/login`, options)
   .then(res => {
      const errorMessage = document.getElementById('loginError');
      errorMessage.textContent = '';
      switch (res.status) {
         case 200:
            document.getElementById("closeLoginModal").click();
            res.json()
            .then(t => {
               localStorage.setItem('userLoggedIn', 'true');
               localStorage.setItem('userToken', t.token);
               localStorage.setItem('userName', payload.username);
               // Refresh feed
               initApp(apiUrl);
            });
            break;
         case 400:
            errorMessage.textContent = "Missing Username/Password";
            break;
         case 403:
            errorMessage.textContent = "Invalid Username/Password";
            break;
      }

   });
}

function authSignup(form) {
   const apiUrl = localStorage.getItem('apiUrl');

   const payload = {
      username: form.username.value,
      password: form.password.value,
      email: form.email.value,
      name: form.name.value
   }
   const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
   }

   fetch(`${apiUrl}/auth/signup`, options)
   .then(res => {
      const errorMessage = document.getElementById('loginError');
      errorMessage.textContent = '';
      switch (res.status) {
         case 200:
            document.getElementById("closeSignupModal").click();
            break;
         case 400:
            console.error("Malformed Request:" + res);
            break;
         case 409:
            errorMessage.textContent = "Username Taken";
            break;
      }
   });
}

function sendNewPost(form) {
   const apiUrl = localStorage.getItem('apiUrl');

   let getImage = new Promise((resolve, reject) => {
      const pic = form.image.files[0];
      if (pic) {
         toBase64(pic).then(pic64 => resolve(pic64.substr(22)));
      } else {
         resolve(null);
      }
   });

   getImage.then(pic => {
      let payload = {
         title: form.title.value,
         text: form.text.value,
         subseddit: form.subseddit.value,
         image: pic
      }
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('userToken')}`
         },
         body: JSON.stringify(payload)
      }

      fetch(`${apiUrl}/post/`, options)
      .then(res => {
         const errorMessage = document.getElementById('newPostError');
         errorMessage.textContent = '';
         switch (res.status) {
            case 200:
               document.getElementById("closeNewPostModal").click();
               initApp(apiUrl);
               break;
            case 400:
               console.error("Malformed Request / Image could not be processed:" + res);
               break;
         }
      });
   });
}

function vote(postId, method) {
   const apiUrl = localStorage.getItem('apiUrl');
   const options = {
      method: method,
      headers: {
         'accept': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      }
   }

   return new Promise(resolve => {
      fetch(`${apiUrl}/post/vote?id=${postId}`, options)
      .then(res => {
         switch (res.status) {
            case 200:
               resolve('success');
               break;
            case 400:
               console.error("Malformed Request:" + res);
               resolve('failure');
               break;
            case 403:
               console.error("Invalid Auth Token" + res);
               resolve('failure');
               break;
         }
         resolve('failure');
      });
   });
}

function comment(postId, comment) {
   const apiUrl = localStorage.getItem('apiUrl');
   let payload = {
      comment: comment
   }
   const options = {
      method: 'PUT',
      headers: {
         'accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify(payload)
   }

   return new Promise(resolve => {
      fetch(`${apiUrl}/post/comment?id=${postId}`, options)
      .then(res => {
         switch (res.status) {
            case 200:
               resolve('success');
               break;
            case 400:
               console.error("Malformed Request:" + res);
               resolve('failure');
               break;
            case 403:
               console.error("Invalid Auth Token" + res);
               resolve('failure');
               break;
         }
         resolve('failure');
      });
   });
}

export default initApp;
