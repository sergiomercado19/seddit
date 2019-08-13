import {createNewPostModal, createEditPostModal} from '../modals/posting.js';
import {newPost, editPost, deletePost} from '../apiCallers/post.js'
import {toBase64} from '../helpers.js';

///////////
// NEW POST
///////////
export function setupNewPost(initApp) {
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
         if (outcome == 'success') initApp(localStorage.getItem('apiUrl'));
      });
   });
}

////////////
// EDIT POST
////////////
export function setupEditPost() {
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
}

//////////////
// DELETE POST
//////////////
export function setupDeletePost(initApp) {
   document.getElementsByName("postDelete").forEach(pd => {
      pd.addEventListener('click', (e) => {
         const postId = e.target.parentNode.parentNode.parentNode.dataset.idPost;
         deletePost(postId)
         .then(outcome => {
            if (outcome == 'success') {
               // Remove deleted post by refreshing
               initApp(localStorage.getItem('apiUrl'));
            }
         });
      });
   });
}