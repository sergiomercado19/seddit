import {createFeed} from '../create.js'
import {getPost} from '../apiCallers/post.js'
import {getUser} from '../apiCallers/user.js'

////////////////
// PROFILE MODAL
////////////////
export async function createProfileModal() {
   const profileModal = document.createElement('div');
   profileModal.classList.add('modal');
   profileModal.id = "profileModal";
   profileModal.style.display = 'block';

   const content = document.createElement('div');
   content.classList.add('modal-content');

   /// Get user
   const user = await getUser();

   // Header
   const modalHeader = document.createElement('div');
   modalHeader.classList.add('container');
   const close = document.createElement('span');
   close.id = "closeProfileModal";
   close.setAttribute('name', 'closeModal');
   close.classList.add('close');
   close.textContent = "×";
   modalHeader.appendChild(close);
   const heading = document.createElement('h2');
   heading.textContent = user.name.toUpperCase();
   modalHeader.appendChild(heading);
   const edit = document.createElement('button');
   edit.id = "editProfileButton"
   edit.textContent = "Edit ✎";
   edit.classList.add('button');
   edit.classList.add('button-primary');
   edit.style.position = "absolute";
   modalHeader.appendChild(edit);
   content.appendChild(modalHeader);

   // Body
   const modalBody = document.createElement('div');
   modalBody.classList.add('container');
   /// Username
   const username = document.createElement('h4');
   username.textContent = `Username: ${user.username}`;
   modalBody.appendChild(username);
   /// Email
   const email = document.createElement('h4');
   email.textContent = `Email: ${user.email}`;
   modalBody.appendChild(email);
   /// Stats
   const stats = document.createElement('h4');
   stats.textContent = "Stats:";
   stats.style.marginBottom = "0px";
   modalBody.appendChild(stats);
   const statsList = document.createElement('ul');
   statsList.classList.add('modal-list');
   //// # of Posts
   const statsPosts = document.createElement('li');
   statsPosts.classList.add('modal-item');
   const statsPostsLabel = document.createElement('b');
   statsPostsLabel.textContent = "Posts: ";
   statsPosts.appendChild(statsPostsLabel);
   const statsPostsValue = document.createTextNode(user.posts.length);
   statsPosts.appendChild(statsPostsValue);
   statsList.appendChild(statsPosts);
   //// # of Upvotes
   const statsUpvotes = document.createElement('li');
   statsUpvotes.classList.add('modal-item');
   const statsUpvotesLabel = document.createElement('b');
   statsUpvotesLabel.textContent = "Upvotes: ";
   statsUpvotes.appendChild(statsUpvotesLabel);
   let upvotesCounter = 0;
   for (const postId of user.posts) {
      const post = await getPost(postId);
      upvotesCounter += post.meta.upvotes.length;
   }
   const statsUpvotesValue = document.createTextNode(upvotesCounter);
   statsUpvotes.appendChild(statsUpvotesValue);
   statsList.appendChild(statsUpvotes);
   //// # of Followers
   const statsFollowers = document.createElement('li');
   statsFollowers.classList.add('modal-item');
   const statsFollowersLabel = document.createElement('b');
   statsFollowersLabel.textContent = "Followers: ";
   statsFollowers.appendChild(statsFollowersLabel);
   const statsFollowersValue = document.createTextNode(user.followed_num);
   statsFollowers.appendChild(statsFollowersValue);
   statsList.appendChild(statsFollowers);
   modalBody.appendChild(statsList);
   /// Following
   const following = document.createElement('h4');
   following.textContent = "Following:";
   following.style.marginBottom = "0px";
   modalBody.appendChild(following);
   const overflowContainer = document.createElement('div');
   overflowContainer.classList.add('modal-overflow');
   const followingList = document.createElement('ul');
   followingList.classList.add('modal-list');
   for (const userId of user.following) {
      const item = document.createElement('li');
      item.classList.add('modal-item');
      const followedUser = await getUser(userId);
      item.textContent = followedUser.username;
      followingList.appendChild(item);
   }
   overflowContainer.appendChild(followingList);
   modalBody.appendChild(overflowContainer);
   content.appendChild(modalBody);
   profileModal.appendChild(content);

   return profileModal;
}

/////////////////////
// EDIT PROFILE MODAL
/////////////////////
export async function createEditProfileModal() {
   const user = await getUser();

   const editProfileModal = document.createElement('div');
   editProfileModal.classList.add('modal');
   editProfileModal.id = "editProfileModal";
   editProfileModal.style.display = 'block';

   const content = document.createElement('div');
   content.classList.add('modal-content');

   const form = document.createElement('form');
   form.style.paddingRight = "25%";
   form.id = "editProfileForm";
   
   // Header
   const modalHeader = document.createElement('div');
   modalHeader.classList.add('container');
   const close = document.createElement('span');
   close.id = "closeEditProfileModal";
   close.setAttribute('name', 'closeModal');
   close.classList.add('close');
   close.textContent = "×";
   modalHeader.appendChild(close);
   const heading = document.createElement('h2');
   heading.textContent = "EDIT PROFILE";
   modalHeader.appendChild(heading);
   form.appendChild(modalHeader);

   // Body
   const modalBody = document.createElement('div');
   modalBody.classList.add('container');
   /// Name
   const nameLabel = document.createElement('label');
   nameLabel.style.fontWeight = "bold";
   nameLabel.textContent = "Name";
   const nameInput = document.createElement('input');
   nameInput.setAttribute('required', '');
   nameInput.classList.add('text');
   nameInput.type = "text";
   nameInput.placeholder = "Enter Name";
   nameInput.value = user.name;
   nameInput.name = "name";
   /// Email
   const emailLabel = document.createElement('label');
   emailLabel.style.fontWeight = "bold";
   emailLabel.textContent = "Email";
   const emailInput = document.createElement('input');
   emailInput.setAttribute('required', '');
   emailInput.classList.add('text');
   emailInput.type = "text";
   emailInput.placeholder = "Enter Email";
   emailInput.value = user.email;
   emailInput.name = "email";
   /// Password
   const pwdLabel = document.createElement('label')
   pwdLabel.style.fontWeight = "bold";
   pwdLabel.textContent = "Password";
   const pwdInput = document.createElement('input');
   pwdInput.classList.add('text');
   pwdInput.type = "password";
   pwdInput.placeholder = "Unchanged";
   pwdInput.name = "password";
   /// Submit
   const space = document.createElement('div');
   space.style.height = "15px";
   const edit = document.createElement('button');
   edit.classList.add('button');
   edit.classList.add('button-secondary');
   edit.type = "submit";
   edit.textContent = "EDIT ✎";

   modalBody.appendChild(nameLabel);
   modalBody.appendChild(nameInput);
   modalBody.appendChild(emailLabel);
   modalBody.appendChild(emailInput);
   modalBody.appendChild(pwdLabel);
   modalBody.appendChild(pwdInput);
   modalBody.appendChild(space);
   modalBody.appendChild(edit);

   form.appendChild(modalBody);
   content.appendChild(form);
   editProfileModal.appendChild(content);

   return editProfileModal;
}

//////////////////
// USER PAGE MODAL
//////////////////
export async function createUserPageModal(id, username) {
   /// Get user
   const pageUser = await getUser(id, username);

   const userPageModal = document.createElement('div');
   userPageModal.classList.add('modal');
   userPageModal.id = "userPageModal";
   userPageModal.style.display = 'block';
   userPageModal.setAttribute('data-id-page-user', pageUser.id);

   const content = document.createElement('div');
   content.classList.add('modal-content');
   content.style.width = "1000px";

   // Header
   const modalHeader = document.createElement('div');
   modalHeader.classList.add('container');
   const close = document.createElement('span');
   close.id = "closeUserPageModal";
   close.setAttribute('name', 'closeModal');
   close.classList.add('close');
   close.textContent = "×";
   modalHeader.appendChild(close);
   const heading = document.createElement('h2');
   heading.textContent = pageUser.name.toUpperCase();
   modalHeader.appendChild(heading);
   /// Info
   const info = document.createElement('div');
   info.classList.add('feed-header');
   const stats = document.createElement('div');
   const followers = document.createElement('button');
   followers.classList.add('button');
   followers.classList.add('button-primary');
   followers.classList.add('button-disabled');
   followers.textContent = `Followers: ${pageUser.followed_num}`;
   stats.appendChild(followers);
   const following = document.createElement('button');
   following.classList.add('button');
   following.classList.add('button-primary');
   following.classList.add('button-disabled');
   following.textContent = `Following: ${pageUser.following.length}`;
   stats.appendChild(following);
   info.appendChild(stats);
   //// Follow toggle button
   if (username !== localStorage.getItem('userName')) {
      const follow = document.createElement('button');
      follow.classList.add('button');
      follow.id = "followButton"
      // Choose toggle
      const user = await getUser();
      if (user.following.includes(pageUser.id)) {
         follow.textContent = "Following ✔️";
         follow.classList.add('button-primary');
         follow.setAttribute('data-following', 'true');
      } else {
         follow.textContent = "Follow";
         follow.classList.add('button-secondary');
         follow.setAttribute('data-following', 'false');
      }
      info.appendChild(follow);
   }
   modalHeader.appendChild(info);
   content.appendChild(modalHeader);

   // Body
   const modalBody = document.createElement('div');
   modalBody.classList.add('container');
   modalBody.classList.add('modal-overflow');
   modalBody.id = "userPagePosts";
   modalBody.style.maxHeight = "500px";

   const main = document.createElement('ul');
   main.id = "userPageFeed";
   main.classList.add('feed');
   main.setAttribute('data-id-feed', '');
   
   await createFeed(`UserPage=${pageUser.id}`, 0).then(f => {
      f.forEach(post => main.appendChild(post));
   });

   modalBody.appendChild(main);
   content.appendChild(modalBody);
   userPageModal.appendChild(content);

   return userPageModal;
}
