import {getPost} from './apiCallers/post.js'
import {getUser} from './apiCallers/user.js'

export function chooseFeed() {
   const userLoggedIn = localStorage.getItem('userLoggedIn') == 'true';
   const selectedFeed = localStorage.getItem('selectedFeed');

   if (userLoggedIn && selectedFeed === "Curated") return "Curated";
   else if (userLoggedIn && selectedFeed === "Mine") return "Mine";
   else return "Trending";
}

export async function fetchFeed(fetchType, start=0) {
   const apiUrl = localStorage.getItem('apiUrl');

   if (fetchType === "Curated") {
      const options = {
         headers: {
            'accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('userToken')}`
         }
      }
      return await fetch(`${apiUrl}/user/feed?p=${start}&n=10`, options)
                   .then(res => res.json());
   } else if (fetchType === "Mine") {
      const user =  await getUser();
      const postsAll = await Promise.all(user.posts.map(postId => getPost(postId)));
      postsAll.sort((a, b) => b.meta.published - a.meta.published);
      let data = {posts: []};
      for (let i = start; i < start + 10; i++) {
         if (!postsAll[i]) break;
         data.posts.push(postsAll[i]);
      }
      return data;
   } else if (fetchType.substring(0, 8) === "UserPage") {
      const user = await getUser(fetchType.substring(9));
      const postsAll = await Promise.all(user.posts.map(postId => getPost(postId)));
      postsAll.sort((a, b) => b.meta.published - a.meta.published);
      let data = {posts: []};
      for (let i = start; i < start + 10; i++) {
         if (!postsAll[i]) break;
         data.posts.push(postsAll[i]);
      }
      return data;
   } else {
      return await fetch(`${apiUrl}/post/public`)
                   .then(res => res.json());
   }
}

export function getTime(epochTime) {
   let t = new Date(0);
   t.setUTCSeconds(epochTime);

   let date = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}`;
   let hours = (t.getHours() < 10) ? `0${t.getHours()}`:`${t.getHours()}`;
   let minutes = (t.getMinutes() < 10) ? `0${t.getMinutes()}`:`${t.getMinutes()}`;

   return `${date} ${hours}:${minutes}`;
}

export function toBase64(blob) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
   });
}

export function closeModals() {
   document.getElementsByName("closeModal").forEach(cm => cm.click());
}