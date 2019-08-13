import {getPost} from '../apiCallers/post.js'

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
   close.setAttribute('name', 'closeModal');
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
   close.setAttribute('name', 'closeModal');
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
