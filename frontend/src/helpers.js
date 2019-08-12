export function getPost(postId) {
   const apiUrl = localStorage.getItem('apiUrl');
   const options = {
      headers: {
         'accept': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      }
   }
   return new Promise(resolve => {
      fetch(`${apiUrl}/post/?id=${postId}`, options)
      .then(res => res.json())
      .then(data => resolve(data));
   });
}

export function getUser(userId=null) {
   const apiUrl = localStorage.getItem('apiUrl');
   const options = {
      headers: {
         'accept': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      }
   }
   
   let url;
   if (userId === null) url = `${apiUrl}/user/`;
   else url = `${apiUrl}/user/?id=${userId}`;

   return new Promise(resolve => {
      fetch(url, options)
      .then(res => res.json())
      .then(data => resolve(data));
   }); 
}

export async function fetchFeed(start=0) {
   const apiUrl = localStorage.getItem('apiUrl');
   const userLoggedIn = localStorage.getItem('userLoggedIn') == 'true';
   const feedType = localStorage.getItem('feedType');

   if (userLoggedIn && feedType === "Curated") {
      const options = {
         headers: {
            'accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('userToken')}`
         }
      }
      return await fetch(`${apiUrl}/user/feed?p=${start}&n=10`, options)
                   .then(res => res.json());
   } else if (userLoggedIn && feedType === "Mine") {
      const user = await getUser();
      const postsAll = user.posts.reverse();
      let postsToGet = [];
      for (let i = start; i < start + 10; i++) {
         if (!postsAll[i]) break;
         postsToGet.push(postsAll[i]);
      }
      let data = {};
      data["posts"] = await Promise.all(postsToGet.map(postId => getPost(postId)));
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