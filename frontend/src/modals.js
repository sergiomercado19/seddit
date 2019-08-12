import {getPost, getUser, fetchFeed} from './helpers.js';

//////////////
// LOGIN MODAL
//////////////
export function createLogInModal() {
   const loginModal = document.createElement('div');
   loginModal.classList.add('modal');
   loginModal.id = "loginModal";
   loginModal.style.display='none';

   const content = document.createElement('div');
   content.classList.add('modal-content');

   const form = document.createElement('form');
   form.style.paddingRight = "25%";
   form.id = "loginForm";

   // Header
   const modalHeader = document.createElement('div');
   modalHeader.classList.add('container');
   const close = document.createElement('span');
   close.id = "closeLoginModal";
   close.classList.add('close');
   close.textContent = "×";
   modalHeader.appendChild(close);
   modalHeader.appendChild(document.getElementById('logo').cloneNode(true));
   const heading = document.createElement('h2');
   heading.textContent = "LOG IN";
   modalHeader.appendChild(heading);
   form.appendChild(modalHeader);

   // Body
   const modalBody = document.createElement('div');
   modalBody.classList.add('container');
   /// Username
   const usrLabel = document.createElement('label');
   usrLabel.style.fontWeight = "bold";
   usrLabel.textContent = "Username";
   const usrInput = document.createElement('input');
   usrInput.setAttribute('required', '');
   usrInput.classList.add('text');
   usrInput.type = "text";
   usrInput.placeholder = "Enter Username";
   usrInput.name = "username";
   /// Password
   const pwdLabel = document.createElement('label')
   pwdLabel.style.fontWeight = "bold";
   pwdLabel.textContent = "Password";
   const pwdInput = document.createElement('input');
   pwdInput.setAttribute('required', '');
   pwdInput.classList.add('text');
   pwdInput.type = "password";
   pwdInput.placeholder = "Enter Password";
   pwdInput.name = "password";
   /// Error box
   const loginError = document.createElement('div');
   loginError.id = "loginError";
   loginError.style.color = "red";
   /// Submit
   const space = document.createElement('div');
   space.style.height = "15px";
   const submit = document.createElement('button');
   submit.classList.add('button');
   submit.classList.add('button-secondary');
   submit.type = "submit";
   submit.textContent = "LOG IN";

   modalBody.appendChild(usrLabel);
   modalBody.appendChild(usrInput);
   modalBody.appendChild(pwdLabel);
   modalBody.appendChild(pwdInput);
   modalBody.appendChild(loginError);
   modalBody.appendChild(space);
   modalBody.appendChild(submit);

   form.appendChild(modalBody);
   content.appendChild(form);
   loginModal.appendChild(content);

   return loginModal;
}

///////////////
// SIGNUP MODAL
///////////////
export function createSignUpModal() {
   const signupModal = document.createElement('div');
   signupModal.classList.add('modal');
   signupModal.id = "signupModal";
   signupModal.style.display = 'none';

   const content = document.createElement('div');
   content.classList.add('modal-content');

   const form = document.createElement('form');
   form.style.paddingRight = "25%";
   form.id = "signupForm";
   
   // Header
   const modalHeader = document.createElement('div');
   modalHeader.classList.add('container');
   const close = document.createElement('span');
   close.id = "closeSignupModal";
   close.classList.add('close');
   close.textContent = "×";
   modalHeader.appendChild(close);
   modalHeader.appendChild(document.getElementById('logo').cloneNode(true));
   const heading = document.createElement('h2');
   heading.textContent = "SIGN UP";
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
   emailInput.name = "email";
   /// Username
   const usrLabel = document.createElement('label');
   usrLabel.style.fontWeight = "bold";
   usrLabel.textContent = "Username";
   const usrInput = document.createElement('input');
   usrInput.setAttribute('required', '');
   usrInput.classList.add('text');
   usrInput.type = "text";
   usrInput.placeholder = "Enter Username";
   usrInput.name = "username";
   /// Password
   const pwdLabel = document.createElement('label')
   pwdLabel.style.fontWeight = "bold";
   pwdLabel.textContent = "Password";
   const pwdInput = document.createElement('input');
   pwdInput.setAttribute('required', '');
   pwdInput.classList.add('text');
   pwdInput.type = "password";
   pwdInput.placeholder = "Enter Password";
   pwdInput.name = "password";
   /// Error box
   const signupError = document.createElement('div');
   signupError.id = "signupError";
   signupError.style.color = "red";
   /// Submit
   const space = document.createElement('div');
   space.style.height = "15px";
   const submit = document.createElement('button');
   submit.classList.add('button');
   submit.classList.add('button-secondary');
   submit.type = "submit";
   submit.textContent = "SIGN UP";

   modalBody.appendChild(nameLabel);
   modalBody.appendChild(nameInput);
   modalBody.appendChild(emailLabel);
   modalBody.appendChild(emailInput);
   modalBody.appendChild(usrLabel);
   modalBody.appendChild(usrInput);
   modalBody.appendChild(pwdLabel);
   modalBody.appendChild(pwdInput);
   modalBody.appendChild(signupError);
   modalBody.appendChild(space);
   modalBody.appendChild(submit);

   form.appendChild(modalBody);
   content.appendChild(form);
   signupModal.appendChild(content);

   return signupModal;
}

/////////////
// POST MODAL
/////////////
export function createNewPostModal() {
   const newPostModal = document.createElement('div');
   newPostModal.classList.add('modal');
   newPostModal.id = "newPostModal";
   newPostModal.style.display = 'none';

   const content = document.createElement('div');
   content.classList.add('modal-content');

   const form = document.createElement('form');
   form.style.paddingRight = "25%";
   form.id = "newPostForm";
   
   // Header
   const modalHeader = document.createElement('div');
   modalHeader.classList.add('container');
   const close = document.createElement('span');
   close.id = "closeNewPostModal";
   close.classList.add('close');
   close.textContent = "×";
   modalHeader.appendChild(close);
   const heading = document.createElement('h2');
   heading.textContent = "CREATE NEW POST";
   modalHeader.appendChild(heading);
   form.appendChild(modalHeader);

   // Body
   const modalBody = document.createElement('div');
   modalBody.classList.add('container');
   /// Title
   const titleLabel = document.createElement('label');
   titleLabel.style.fontWeight = "bold";
   titleLabel.textContent = "Title";
   const titleInput = document.createElement('input');
   titleInput.setAttribute('required', '');
   titleInput.classList.add('text');
   titleInput.type = "text";
   titleInput.placeholder = "Enter Title";
   titleInput.name = "title";
   /// Text
   const textLabel = document.createElement('label');
   textLabel.style.fontWeight = "bold";
   textLabel.textContent = "Text";
   const textInput = document.createElement('textarea');
   textInput.setAttribute('required', '');
   textInput.classList.add('text');
   textInput.style.resize = "vertical";
   textInput.placeholder = "Enter Text";
   textInput.name = "text";
   textInput.rows = "6";
   /// Subseddit
   const subsedditLabel = document.createElement('label');
   subsedditLabel.style.fontWeight = "bold";
   subsedditLabel.textContent = "Subseddit";
   const subsedditInput = document.createElement('input');
   subsedditInput.setAttribute('required', '');
   subsedditInput.classList.add('text');
   subsedditInput.type = "text";
   subsedditInput.placeholder = "Enter Subseddit";
   subsedditInput.name = "subseddit";
   /// Image
   const imageLabel = document.createElement('label')
   imageLabel.style.fontWeight = "bold";
   imageLabel.textContent = "Image ";
   const imageInput = document.createElement('input');
   imageInput.id = "uploadedImage";
   imageInput.style.margin = "8px 0px";
   imageInput.type = "file";
   imageInput.placeholder = "Upload Image";
   imageInput.name = "image";
   imageInput.accept = "image/png";
   /// Error box
   const newPostError = document.createElement('div');
   newPostError.id = "newPostError";
   newPostError.style.color = "red";
   /// Submit
   const space = document.createElement('div');
   space.style.height = "15px";
   const submit = document.createElement('button');
   submit.classList.add('button');
   submit.classList.add('button-secondary');
   submit.type = "submit";
   submit.textContent = "POST";

   modalBody.appendChild(titleLabel);
   modalBody.appendChild(titleInput);
   modalBody.appendChild(textLabel);
   modalBody.appendChild(textInput);
   modalBody.appendChild(subsedditLabel);
   modalBody.appendChild(subsedditInput);
   modalBody.appendChild(imageLabel);
   modalBody.appendChild(imageInput);
   modalBody.appendChild(newPostError);
   modalBody.appendChild(space);
   modalBody.appendChild(submit);

   form.appendChild(modalBody);
   content.appendChild(form);
   newPostModal.appendChild(content);

   return newPostModal;
}

//////////////////
// EDIT POST MODAL
//////////////////
export async function createEditPostModal(postId) {
   const post = await getPost(postId);

   const editPostModal = document.createElement('div');
   editPostModal.classList.add('modal');
   editPostModal.id = "editPostModal";
   editPostModal.style.display = 'block';

   const content = document.createElement('div');
   content.classList.add('modal-content');

   const form = document.createElement('form');
   form.style.paddingRight = "25%";
   form.id = "editPostForm";
   
   // Header
   const modalHeader = document.createElement('div');
   modalHeader.classList.add('container');
   const close = document.createElement('span');
   close.id = "closeEditPostModal";
   close.classList.add('close');
   close.textContent = "×";
   modalHeader.appendChild(close);
   const heading = document.createElement('h2');
   heading.textContent = "EDIT POST";
   modalHeader.appendChild(heading);
   form.appendChild(modalHeader);

   // Body
   const modalBody = document.createElement('div');
   modalBody.classList.add('container');
   /// Title
   const titleLabel = document.createElement('label');
   titleLabel.style.fontWeight = "bold";
   titleLabel.textContent = "Title";
   const titleInput = document.createElement('input');
   titleInput.setAttribute('required', '');
   titleInput.classList.add('text');
   titleInput.type = "text";
   titleInput.placeholder = "Enter Title";
   titleInput.value = post.title;
   titleInput.name = "title";
   /// Text
   const textLabel = document.createElement('label');
   textLabel.style.fontWeight = "bold";
   textLabel.textContent = "Text";
   const textInput = document.createElement('textarea');
   textInput.setAttribute('required', '');
   textInput.classList.add('text');
   textInput.style.resize = "vertical";
   textInput.placeholder = "Enter Text";
   textInput.value = post.text;
   textInput.name = "text";
   /// Image
   const imageLabel = document.createElement('label')
   imageLabel.style.fontWeight = "bold";
   imageLabel.textContent = "Image ";
   const imageInput = document.createElement('input');
   imageInput.id = "uploadedImage";
   imageInput.style.margin = "8px 0px";
   imageInput.type = "file";
   imageInput.placeholder = "Upload Image";
   imageInput.name = "image";
   imageInput.accept = "image/png";
   /// Submit
   const space = document.createElement('div');
   space.style.height = "15px";
   const submit = document.createElement('button');
   submit.classList.add('button');
   submit.classList.add('button-secondary');
   submit.type = "submit";
   submit.textContent = "EDIT ✎";

   modalBody.appendChild(titleLabel);
   modalBody.appendChild(titleInput);
   modalBody.appendChild(textLabel);
   modalBody.appendChild(textInput);
   modalBody.appendChild(imageLabel);
   modalBody.appendChild(imageInput);
   modalBody.appendChild(space);
   modalBody.appendChild(submit);

   form.appendChild(modalBody);
   content.appendChild(form);
   editPostModal.appendChild(content);

   return editPostModal;
}

//////////////
// IMAGE MODAL
//////////////
export async function createImageModal(postId) {
   const imageModal = document.createElement('div');
   imageModal.id = "imageModal";
   imageModal.classList.add('modal');
   imageModal.style.display = 'block';

   const close = document.createElement('span');
   close.id = "closeImageModal";
   close.classList.add('close');
   close.textContent = "×";
   imageModal.appendChild(close);

   // Get full image
   let post;
   if (localStorage.getItem('userLoggedIn') == 'true') {
      post = await getPost(postId);
   } else {
      post = await new Promise(resolve => {
         fetchFeed()
         .then(res => res.json())
         .then(data => {
            const p = data.posts.find(p => p.id == postId);
            resolve(p);
         });
      });
   }

   const image = document.createElement('img');
   image.classList.add('modal-content');
   image.classList.add('modal-image');
   image.style.width = "auto";
   image.src = `data:image/png;base64,${post.image}`;
   imageModal.appendChild(image);

   return imageModal;
}

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

////////////////
// UPVOTES MODAL
////////////////
export async function createUpvotesModal(postId) {
   const upvotesModal = document.createElement('div');
   upvotesModal.classList.add('modal');
   upvotesModal.id = "upvotesModal";
   upvotesModal.style.display = 'block';

   const content = document.createElement('div');
   content.classList.add('modal-content');

   // Header
   const modalHeader = document.createElement('div');
   modalHeader.classList.add('container');
   const close = document.createElement('span');
   close.id = "closeUpvotesModal";
   close.classList.add('close');
   close.textContent = "×";
   modalHeader.appendChild(close);
   const heading = document.createElement('h2');
   heading.textContent = "UPVOTES";
   modalHeader.appendChild(heading);
   content.appendChild(modalHeader);

   // Body
   const modalBody = document.createElement('div');
   modalBody.classList.add('container');
   const list = document.createElement('ul');
   list.classList.add('modal-list');
   /// Get post
   const post = await getPost(postId);
   for (const id of post.meta.upvotes) {
      const user = await getUser(id);
      const item = document.createElement('li');
      item.classList.add('modal-item');
      item.textContent = user.username;
      list.appendChild(item);
   }
   modalBody.appendChild(list);
   content.appendChild(modalBody);
   upvotesModal.appendChild(content);

   return upvotesModal;
}

/////////////////
// COMMENTS MODAL
/////////////////
export async function createCommentsModal(postId) {
   const commentsModal = document.createElement('div');
   commentsModal.classList.add('modal');
   commentsModal.id = "commentsModal";
   commentsModal.style.display = 'block';

   const content = document.createElement('div');
   content.classList.add('modal-content');

   // Header
   const modalHeader = document.createElement('div');
   modalHeader.classList.add('container');
   const close = document.createElement('span');
   close.id = "closeUpvotesModal";
   close.classList.add('close');
   close.textContent = "×";
   modalHeader.appendChild(close);
   const heading = document.createElement('h2');
   heading.textContent = "COMMENTS";
   modalHeader.appendChild(heading);
   content.appendChild(modalHeader);

   // Body
   const modalBody = document.createElement('div');
   modalBody.classList.add('container');
   const list = document.createElement('ul');
   list.id = "commentsList";
   list.classList.add('modal-list');
   /// Get post
   const post = await getPost(postId);
   /// Get post's comments
   const comments = post.comments;
   comments.sort((a, b) => a.published - b.published);
   for (const c of comments) {
      const item = document.createElement('li');
      item.classList.add('modal-item');
      const itemAuthor = document.createElement('b');
      itemAuthor.textContent = `${c.author}: `;
      item.appendChild(itemAuthor);
      const itemComment = document.createTextNode(c.comment);
      item.appendChild(itemComment);
      list.appendChild(item);
   }
   modalBody.appendChild(list);
   /// Add a comment
   const form = document.createElement('form');
   form.id = "commentForm";
   //// Text
   const commentInput = document.createElement('textarea');
   commentInput.setAttribute('required', '');
   commentInput.classList.add('text');
   commentInput.style.resize = "vertical";
   commentInput.placeholder = "Enter Comment";
   commentInput.name = "text";
   commentInput.rows = "3";
   form.appendChild(commentInput);
   //// Button
   const commentButton = document.createElement('button');
   commentButton.id = "commentButton";
   commentButton.type = "submit";
   commentButton.classList.add('button');
   commentButton.classList.add('button-secondary');
   commentButton.textContent = "COMMENT";
   form.appendChild(commentButton);

   modalBody.appendChild(form);
   content.appendChild(modalBody);
   commentsModal.appendChild(content);

   return commentsModal;
}
