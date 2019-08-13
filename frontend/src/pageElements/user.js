import { createProfileModal, createEditProfileModal, createUserPageModal } from '../modals/profile.js';
import { editUser, follow } from '../apiCallers/user.js'

//////////
// PROFILE
//////////
export function setupProfile(initApp) {
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
                     if (outcome == 'success') initApp(localStorage.getItem('apiUrl'));
                  });
               });
            });
         });
      });
   });
}

/////////////
// USER PAGES
/////////////
export function setupUserPages() {
   document.getElementsByName("postAuthor").forEach(a => {
      const eventFunction = () => {
         const username = a.dataset.idAuthor;
         createUserPage(null, username);
      };
      if (a.dataset.listening == 'no') {
         a.addEventListener('click', eventFunction);
         a.dataset.listening = 'yes';
      }
   });
}

//////////////////////////
// CREATE SINGLE USER PAGE
//////////////////////////
export function createUserPage(id, username) {
   createUserPageModal(id, username)
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
            createFeed(`UserPage=${pageUserId}`, feedUserPage * 10)
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
               follow(username, 'unfollow')
               .then(outcome => {
                  if (outcome == 'success') {
                     e.target.textContent = "Follow";
                     e.target.classList.remove('button-primary');
                     e.target.classList.add('button-secondary');
                     e.target.setAttribute('data-following', 'false');
                  }
               });
            } else {
               follow(username, 'follow')
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
}