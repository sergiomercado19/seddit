import {chooseFeed, fetchFeed} from '../helpers.js';
import {getPost} from '../apiCallers/post.js'
import {getUser} from '../apiCallers/user.js'

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
   close.setAttribute('name', 'closeModal');
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
   close.setAttribute('name', 'closeModal');
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
   close.setAttribute('name', 'closeModal');
   close.classList.add('close');
   close.textContent = "×";
   imageModal.appendChild(close);

   // Get full image
   let post;
   if (localStorage.getItem('userLoggedIn') == 'true') {
      post = await getPost(postId);
   } else {
      const data = await fetchFeed(chooseFeed());
      post = data.posts.find(p => p.id == postId);
   }

   const image = document.createElement('img');
   image.classList.add('modal-content');
   image.classList.add('modal-image');
   image.style.width = "auto";
   image.src = `data:image/png;base64,${post.image}`;
   imageModal.appendChild(image);

   return imageModal;
}
