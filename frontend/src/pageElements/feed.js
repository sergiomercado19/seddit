import {createUpvotesModal, createCommentsModal, createImageModal} from '../modals/feed.js';
import {vote, comment} from '../apiCallers/post.js'

////////////
// FEED TYPE
////////////
export function setupFeedType() {
   document.getElementById('selectedFeedButton').addEventListener('click', () => {
      document.getElementById("selectedFeedOptions").classList.toggle("dropdown-show");
   });
}

/////////
// VOTING
/////////
export function setupVoting() {
   document.getElementsByName("voteUp").forEach(v => {
      const eventFunction = (e) => {
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
      };
      if (v.dataset.listening == 'no') {
         v.addEventListener('click', eventFunction);
         v.dataset.listening = 'yes';
      }
   });
}

//////////
// UPVOTES
//////////
export function setupUpvotes() {
   document.getElementsByName("upvotesCount").forEach(u => {
      const eventFunction = (e) => {
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
      };
      if (u.dataset.listening == 'no') {
         u.addEventListener('click', eventFunction);
         u.dataset.listening = 'yes';
      }
   });
}

///////////
// COMMENTS
///////////
export function setupComments() {
   document.getElementsByName("postComment").forEach(pc => {
      const eventFunction = (openEvent) => {
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
                     // Increment commentCounter
                     pc.dataset.commentCount++;
                     pc.textContent =`Show ${pc.dataset.commentCount} comments`;
                     // Clear text field
                     commentForm.reset();
                  }
               });
            });
         });
      };
      if (pc.dataset.listening == 'no') {
         pc.addEventListener('click', eventFunction);
         pc.dataset.listening = 'yes';
      }
   });
}

/////////
// IMAGES
/////////
export function setupImages() {
   document.getElementsByName("thumbnail").forEach(t => {
      const eventFunction = (e) => {
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
      };
      if (t.dataset.listening == 'no') {
         t.addEventListener('click', eventFunction);
         t.dataset.listening = 'yes';
      }
   });
}
