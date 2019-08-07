import {createNavBar, createFeed} from './create.js';
import {createLogInModal, createSignUpModal, createUpvotesModal} from './modals.js';

/////////////////
// AUTH VARIABLES
/////////////////
localStorage.clear();
localStorage.setItem('userLoggedIn', 'false')
localStorage.setItem('userToken', '');

function initApp(apiUrl) {

   document.getElementById("root").innerHTML = "";

   //////////////////////////////
   // CREATE MAIN PAGE COMPONENTS
   //////////////////////////////

   const pageElements = [createNavBar(), createFeed(apiUrl)];

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
   
   
   
      if (localStorage.getItem('userLoggedIn') == 'true') {
         /////////
         // LOGOUT
         /////////
         document.getElementById("logoutButton").addEventListener('click', () => {
            localStorage.setItem('userLoggedIn', 'false')
            localStorage.setItem('userToken', '');
            initApp(apiUrl);
         });
   
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
                  vote(apiUrl, id, 'DELETE')
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
                  vote(apiUrl, id, 'PUT')
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
               createUpvotesModal(apiUrl, postId)
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
            authLogin(apiUrl, loginForm);
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
            authSignup(apiUrl, signupForm);
         });
   
         /////////
         // VOTING
         /////////
         document.getElementsByName('voteUp').forEach(v => {
            v.addEventListener('click', () => {
               document.getElementById('signupButton').click();
            });
         });
      }
   });
}

function authLogin(apiUrl, form) {
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

function authSignup(apiUrl, form) {
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

function vote(apiUrl, id, method) {
   const options = {
      method: method,
      headers: {
         'accept': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      }
   }

   return new Promise(resolve => {
      fetch(`${apiUrl}/post/vote?id=${id}`, options)
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
