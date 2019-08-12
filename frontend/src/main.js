//////////
// IMPORTS
//////////
import {toBase64, chooseFeed} from './helpers.js';
import {createNavBar, createMainPage, getFeed} from './create.js';
// Event listeners
import {setLoginListeners, setSignupListeners} from './eventListeners/authentication.js'
// Modals
import {createLogInModal, createSignUpModal} from './modals/authentication.js';
import {createNewPostModal, createEditPostModal} from './modals/posting.js';
import {createUpvotesModal, createCommentsModal, createImageModal} from './modals/feed.js';
import {createProfileModal, createEditProfileModal, createUserPageModal} from './modals/profile.js';
// API callers
import {authLogin, authSignup} from './apiCallers/auth.js'
import {editUser, follow} from './apiCallers/user.js'
import {newPost, editPost, deletePost, vote, comment} from './apiCallers/post.js'

/////////////////
// AUTH VARIABLES
/////////////////
localStorage.clear();
localStorage.setItem('userLoggedIn', 'false');
localStorage.setItem('userToken', '');
localStorage.setItem('userName', '');
localStorage.setItem('selectedFeed', 'Trending');
// Valid URL fragments
const validFeedFragments = ["#Trending", "#Curated", "#Mine"];
const validProfileFragments = /^#profile=([0-9]+)$/;

function initApp(apiUrl) {
   // Save apiUrl
   localStorage.setItem('apiUrl', apiUrl);
   
   ///////////////////////////
   // HANDLE URL FRAGMENTATION
   ///////////////////////////
   window.onhashchange = () => {
      const hash = window.location.hash;
      if (validFeedFragments.includes(hash)) {
         // FEED TYPE
         localStorage.setItem('selectedFeed', hash.substring(1));
         initApp(apiUrl);
      } else if (validProfileFragments.test(hash)) {
         // USER PAGES
         const userId = hash.match(validProfileFragments)[1];
         
      }
   }
   
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
            localStorage.setItem('selectedFeed', 'Trending');
            initApp(apiUrl);
         });
         
         //////////////////
         // INFINITE SCROLL
         //////////////////
         window.onscroll = () => {
            const feed = document.getElementById('feed');
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight
               && localStorage.getItem('selectedFeed') != "Trending"
               && !pageLoaded) {
               feedPage++;
               getFeed(chooseFeed(), feedPage*10)
               .then(f => {
                  if (f.length == 0) pageLoaded = true;
                  else f.forEach(post => feed.appendChild(post));
               });
            }
         };

         ////////////
         // FEED TYPE
         ////////////
         document.getElementById('selectedFeedButton').addEventListener('click', () => {
            document.getElementById("selectedFeedOptions").classList.toggle("dropdown-show");
         });

         /////////////
         // USER PAGES
         /////////////
         document.getElementsByName("postAuthor").forEach(a => {
            const pageUser = a.dataset.idAuthor;
            a.addEventListener('click', () => {
               createUserPageModal(pageUser)
               .then(userPageModal => {
                  document.getElementById("root").appendChild(userPageModal);
                  document.body.style.overflow = "hidden";

                  document.getElementById("closeUserPageModal").addEventListener('click', () => {
                     userPageModal.remove();
                     document.body.style.overflow = "visible";
                  });
                  // Close when grey area is clicked
                  userPageModal.onclick = (e) => {
                     if (e.target == userPageModal) {
                        userPageModal.remove();
                        document.body.style.overflow = "visible";
                     }
                  };
                  // Infinite scroll
                  let feedUserPage = 0;
                  let userPageLoaded = false;
                  const userPagePosts = document.getElementById('userPagePosts');
                  userPagePosts.onscroll = () => {
                     const userPageFeed = document.getElementById('userPageFeed');
                     if (userPagePosts.scrollTop === (userPagePosts.scrollHeight - userPagePosts.offsetHeight)
                        && localStorage.getItem('selectedFeed') != "Trending"
                        && !userPageLoaded) {
                        feedUserPage++;
                        const pageUserId = userPageModal.dataset.idPageUser;
                        getFeed(`UserPage=${pageUserId}`, feedUserPage*10)
                        .then(f => {
                           if (f.length == 0) userPageLoaded = true;
                           else f.forEach(post => userPageFeed.appendChild(post));
                        });
                     }
                  };
                  // Follow
                  const followButton = document.getElementById('followButton');
                  if (followButton != null) {
                     followButton.addEventListener('click', (e) => {
                        if (e.target.dataset.following === "true") {
                           follow(pageUser, 'unfollow')
                           .then(outcome => {
                              if (outcome == 'success') {
                                 e.target.textContent = "Follow";
                                 e.target.classList.remove('button-primary');
                                 e.target.classList.add('button-secondary');
                                 e.target.setAttribute('data-following', 'false');
                              }
                           });
                        } else {
                           follow(pageUser, 'follow')
                           .then(outcome => {
                              if (outcome == 'success') {
                                 e.target.textContent = "Following ✔️";
                                 e.target.classList.remove('button-secondary');
                                 e.target.classList.add('button-primary');
                                 e.target.setAttribute('data-following', 'true');
                              }
                           });
                        }
                     });
                  }
               });
            });
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

         ///////////////
         // COMMENT POST
         ///////////////
         document.getElementsByName("postComment").forEach(pc => {
            pc.addEventListener('click', (openEvent) => {
               const postId = openEvent.target.parentNode.parentNode.parentNode.dataset.idPost;
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
                  commentForm.addEventListener('submit', (sendEvent) => {
                     sendEvent.preventDefault();
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

         ////////////
         // EDIT POST
         ////////////
         document.getElementsByName("postEdit").forEach(pe => {
            pe.addEventListener('click', (openEvent) => {
               const postId = openEvent.target.parentNode.parentNode.parentNode.dataset.idPost;
               createEditPostModal(postId)
               .then(editPostModal => {
                  document.getElementById("root").appendChild(editPostModal);
                  document.body.style.overflow = "hidden";
   
                  document.getElementById("closeEditPostModal").addEventListener('click', () => {
                     editPostModal.remove();
                     document.body.style.overflow = "visible";
                  });
                  // Close when grey area is clicked
                  editPostModal.onclick = (e) => {
                     if (e.target == editPostModal) {
                        editPostModal.remove();
                        document.body.style.overflow = "visible";
                     }
                  };
                  // Send changes
                  const editPostForm = document.getElementById('editPostForm');
                  editPostForm.addEventListener('submit', (sendEvent) => {
                     sendEvent.preventDefault();
                     editPost(postId, editPostForm)
                     .then(outcome => {
                        if (outcome == 'success') {
                           // Show edited post
                           const title = openEvent.target.parentNode.parentNode.childNodes[1];
                           title.setAttribute('data-id-title', editPostForm.title.value);
                           title.textContent = editPostForm.title.value;
                           const text = openEvent.target.parentNode.parentNode.childNodes[2];
                           text.textContent = editPostForm.text.value;
                           const pic = editPostForm.image.files[0];
                           if (pic) toBase64(pic).then(pic64 => {
                              const image = openEvent.target.parentNode.parentNode.parentNode.childNodes[2].childNodes[0];
                              image.src = pic64;
                           });
                           
                        }
                     });
                  });
               });
            });
         });

         //////////////
         // DELETE POST
         //////////////
         document.getElementsByName("postDelete").forEach(pd => {
            pd.addEventListener('click', (e) => {
               const postId = e.target.parentNode.parentNode.parentNode.dataset.idPost;
               deletePost(postId)
               .then(outcome => {
                  if (outcome == 'success') {
                     // Remove deleted post by refreshing
                     initApp(apiUrl);
                  }
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
               // Edit profile
               document.getElementById("editProfileButton").addEventListener('click', () => {
                  profileModal.remove();
                  createEditProfileModal()
                  .then(editProfileModal => {
                     document.getElementById("root").appendChild(editProfileModal);

                     document.getElementById("closeEditProfileModal").addEventListener('click', () => {
                        editProfileModal.remove();
                        document.body.style.overflow = "visible";
                     });
                     // Close when grey area is clicked
                     editProfileModal.onclick = (e) => {
                        if (e.target == editProfileModal) {
                           editProfileModal.remove();
                           document.body.style.overflow = "visible";
                        }
                     };
                     // Submit update
                     const editProfileForm = document.getElementById('editProfileForm');
                     editProfileForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        editUser(editProfileForm).then(outcome => {
                           if (outcome == 'success') initApp(apiUrl);
                        });
                     });
                  });
               });
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
            newPost(newPostForm).then(outcome => {
               if (outcome == 'success') initApp(apiUrl);
            });
         });

      } else {
         // LOG IN
         /////////
         const loginModal = createLogInModal();
         document.getElementById("root").appendChild(loginModal);
         // Add listeners
         setLoginListeners();
         // Submit login
         const loginForm = document.getElementById('loginForm');
         loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            authLogin(loginForm).then(outcome => {
               if (outcome == 'success') initApp(apiUrl);
            });
         });
   
         // SIGN UP
         //////////
         const signupModal = createSignUpModal();
         document.getElementById("root").appendChild(signupModal);
         // Add listeners
         setSignupListeners();
         // Submit signup
         const signupForm = document.getElementById('signupForm');
         signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            authSignup(signupForm);
         });
      }
   });
}

export default initApp;
