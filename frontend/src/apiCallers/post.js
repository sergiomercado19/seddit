import {toBase64} from '../helpers.js'

export async function getPost(postId) {
   const apiUrl = localStorage.getItem('apiUrl');

   const options = {
      headers: {
         'accept': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      }
   }

   return await fetch(`${apiUrl}/post/?id=${postId}`, options).then(res => res.json());
}

export async function newPost(form) {
   const apiUrl = localStorage.getItem('apiUrl');

   const inputPic = form.image.files[0];
   let pic = null;
   if (inputPic) pic = await toBase64(inputPic).then(pic64 => pic64.substr(22));

   let payload = {
      title: form.title.value,
      text: form.text.value,
      subseddit: form.subseddit.value,
      image: pic
   }
   const options = {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify(payload)
   }

   const errorMessage = document.getElementById('newPostError');
   errorMessage.textContent = '';

   const res = await fetch(`${apiUrl}/post/`, options);
   switch (res.status) {
      case 200:
         document.getElementById("closeNewPostModal").click();
         // Refresh feed
         return "success";
      case 400:
         console.error("Malformed Request / Image could not be processed:" + res);
         return "failure";
      default:
         return "failure";
   }
}

export async function editPost(postId, form) {
   const apiUrl = localStorage.getItem('apiUrl');

   const inputPic = form.image.files[0];
   let pic = null;
   if (inputPic) pic = await toBase64(inputPic).then(pic64 => pic64.substr(22));

   const payload = {
      title: form.title.value,
      text: form.text.value,
      image: pic
   }
   const options = {
      method: 'PUT',
      headers: {
         'accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify(payload)
   }

   const res = await fetch(`${apiUrl}/post/?id=${postId}`, options);
   switch (res.status) {
      case 200:
         document.getElementById("closeEditPostModal").click();
         return "success";
      case 400:
         console.error("Malformed user object:" + res);
         return "failure";
      case 403:
         console.error("Invalid Auth Token" + res);
         return "failure";
      default:
         return "failure";
   }
}

export async function deletePost(postId) {
   const apiUrl = localStorage.getItem('apiUrl');

   const options = {
      method: 'DELETE',
      headers: {
         'accept': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      },
   }

   const res = await fetch(`${apiUrl}/post/?id=${postId}`, options);
   switch (res.status) {
      case 200:
         return "success";
      case 400:
         console.error("Malformed user object:" + res);
         return "failure";
      case 403:
         console.error("Invalid Auth Token" + res);
         return "failure";
      default:
         return "failure";
   }
}

export async function vote(postId, method) {
   const apiUrl = localStorage.getItem('apiUrl');

   const options = {
      method: method,
      headers: {
         'accept': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      }
   }

   const res = await fetch(`${apiUrl}/post/vote?id=${postId}`, options);
   switch (res.status) {
      case 200:
         return "success";
      case 400:
         console.error("Malformed Request:" + res);
         return "failure";
      case 403:
         console.error("Invalid Auth Token" + res);
         return "failure";
      default:
         return "failure";
   }
}

export async function comment(postId, comment) {
   const apiUrl = localStorage.getItem('apiUrl');

   let payload = {
      comment: comment
   }
   const options = {
      method: 'PUT',
      headers: {
         'accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify(payload)
   }

   const res = await fetch(`${apiUrl}/post/comment?id=${postId}`, options);
   switch (res.status) {
      case 200:
         return "success";
      case 400:
         console.error("Malformed Request:" + res);
         return "failure";
      case 403:
         console.error("Invalid Auth Token" + res);
         return "failure";
      default:
         return "failure";
   }
}
