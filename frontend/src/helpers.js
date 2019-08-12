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

export function getUser(id=null, username=null) {
   const apiUrl = localStorage.getItem('apiUrl');
   const options = {
      headers: {
         'accept': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      }
   }
   
   let url;
   if (id !== null) url = `${apiUrl}/user/?id=${id}`;
   else if (username != null) url = `${apiUrl}/user/?username=${username}`;
   else url = `${apiUrl}/user/`;

   return new Promise(resolve => {
      fetch(url, options)
      .then(res => res.json())
      .then(data => resolve(data));
   }); 
}

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