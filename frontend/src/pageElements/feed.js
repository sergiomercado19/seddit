import {createUpvotesModal, createCommentsModal, createImageModal} from '../modals/feed.js';
import {vote, comment} from '../apiCallers/post.js'
import {chooseFeed} from '../helpers.js';
import {createFeed} from '../create.js';

////////////
// FEED TYPE
////////////
export function setupFeedType() {
   document.getElementById('selectedFeedButton').addEventListener('click', () => {
      document.getElementById("selectedFeedOptions").classList.toggle("dropdown-show");
   });
}

//////////////////
// INFINITE SCROLL
//////////////////
export function setupInfiniteScroll(pageData) {
   window.onscroll = () => {
      const feed = document.getElementById('feed');
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight
         && localStorage.getItem('selectedFeed') != "Trending"
         && !pageData.pageLoaded) {
         pageData.feedPage++;
         createFeed(chooseFeed(), pageData.feedPage*10)
         .then(f => {
            if (f.length == 0) pageData.pageLoaded = true;
            else f.forEach(post => feed.appendChild(post));
         });
      }
   };
}

/////////
// VOTING
/////////
export function setupVoting() {
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
}

//////////
// UPVOTES
//////////
export function setupUpvotes() {
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
}

///////////
// COMMENTS
///////////
export function setupComments() {
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
                     // Increment commentCounter
                     pc.dataset.commentCount++;
                     pc.textContent =`Show ${pc.dataset.commentCount} comments`;
                     // Clear text field
                     commentForm.reset();
                  }
               });
            });
         });
      });
   });
}

/////////
// IMAGES
/////////
export function setupImages() {
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
}
