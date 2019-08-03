export function createNavBar() {
   const header = document.createElement('header');
   header.id = "nav";
   header.classList.add('banner');

   /// Logo
   const logo = document.createElement('h1');
   logo.id = "logo";
   logo.classList.add('flex-center');
   logo.textContent = "Seddit";
   header.appendChild(logo);

   /// Navbar
   const navbar = document.createElement('ul');
   navbar.classList.add('nav');
   
   //// item0: searchbar
   const navItem0 = document.createElement('li');
   navItem0.classList.add('nav-item');
   const searchbar = document.createElement('input');
   searchbar.setAttribute('data-id-search', '');
   searchbar.classList.add('text');
   searchbar.id = "search";
   searchbar.type = "search";
   searchbar.placeholder = "Search Seddit";
   navItem0.appendChild(searchbar);
   navbar.appendChild(navItem0);
   
   if (localStorage.getItem('userLoggedIn') == 'true') {
      //// item3: Log Out button
      const navItem3 = document.createElement('li');
      navItem3.classList.add('nav-item');
      const logout = document.createElement('button');
      logout.setAttribute('data-id-logout', '');
      logout.classList.add('button');
      logout.classList.add('button-secondary');
      logout.id = "logoutButton";
      logout.textContent = "Log Out";
      navItem3.appendChild(logout);
      navbar.appendChild(navItem3);
   } else {
      //// item1: Log In button
      const navItem1 = document.createElement('li');
      navItem1.classList.add('nav-item');
      const login = document.createElement('button');
      login.setAttribute('data-id-login', '');
      login.classList.add('button');
      login.classList.add('button-primary');
      login.id = "loginButton";
      login.textContent = "Log In";
      navItem1.appendChild(login);
      navbar.appendChild(navItem1);
      
      //// item2: Sign Up button
      const navItem2 = document.createElement('li');
      navItem2.classList.add('nav-item');
      const signup = document.createElement('button');
      signup.setAttribute('data-id-signup', '');
      signup.classList.add('button');
      signup.classList.add('button-secondary');
      signup.id = "signupButton";
      signup.textContent = "Sign Up";
      navItem2.appendChild(signup);
      navbar.appendChild(navItem2);
   }
   
   header.appendChild(navbar);

   return header;
}

export function createFeed(apiUrl) {
   /// Feed
   const feed = document.createElement('ul');
   feed.id = "feed";
   feed.setAttribute('data-id-feed', '');

   //// Heading
   const heading = document.createElement('div');
   heading.classList.add('feed-header');
   const postPopular = document.createElement('h3');
   postPopular.classList.add('feed-title');
   postPopular.classList.add('alt-text');
   postPopular.textContent = "Popular posts";
   heading.appendChild(postPopular);
   const postButton = document.createElement('button');
   postButton.classList.add('button');
   postButton.classList.add('button-secondary');
   postButton.textContent = "Post";
   heading.appendChild(postButton);
   feed.appendChild(heading);

   //// Append posts
   getFeed(apiUrl)
   .then(res => res.json())
   .then(data => {
      // Sort posts, most recent first
      data.posts.sort((a, b) => b.meta.published - a.meta.published);
      for (const p of data.posts) {
         // Create post list element
         const post = document.createElement('li');
         post.classList.add('post');
         post.setAttribute('data-id-post', '');

         /// Votes
         const votes = document.createElement('div');
         votes.classList.add('vote');
         //// VoteUp
         const voteUp = document.createElement('span');
         voteUp.classList.add('vote-element');
         voteUp.setAttribute('name', 'voteUp');
         if (postUpvoted(apiUrl, p)) voteUp.setAttribute('data-voted', 'yes');
         else voteUp.setAttribute('data-voted', 'no');
         const arrowUp = document.createElement('i');
         arrowUp.classList.add('arrow-up');
         voteUp.appendChild(arrowUp);
         votes.appendChild(voteUp);
         //// Count
         const count = document.createElement('span');
         count.setAttribute('data-id-upvotes', '');
         count.classList.add('vote-element');
         count.textContent = p.meta.upvotes.length;
         votes.appendChild(count);
         post.appendChild(votes);

         /// Content
         const content = document.createElement('div');
         content.classList.add('content');
         //// Info
         const contentInfo = document.createElement('p');
         contentInfo.style.margin = "0px 0px 5px 0px";
         const contentSubseddit = document.createElement('label');
         contentSubseddit.classList.add('post-subseddit');
         contentSubseddit.textContent = `s/${p.meta.subseddit}`;
         contentInfo.appendChild(contentSubseddit);
         const b = document.createElement('span');
         b.classList.add('break');
         b.textContent = '•';
         contentInfo.appendChild(b);
         const contentAuthor = document.createElement('label');
         contentAuthor.classList.add('post-author');
         contentAuthor.setAttribute('data-id-author', '');
         contentAuthor.textContent = `Posted by u/${p.meta.author} on ${getTime(p.meta.published)}`;
         contentInfo.appendChild(contentAuthor);
         //// Title
         const contentTitle = document.createElement('h4');
         contentTitle.classList.add('post-title');
         contentTitle.setAttribute('data-id-title', '');
         contentTitle.textContent = p.title;
         //// Description
         const contentDescription = document.createElement('p');
         contentDescription.classList.add('post-description');
         contentDescription.classList.add('alt-text');
         contentDescription.textContent = p.text;

         content.appendChild(contentInfo);
         content.appendChild(contentTitle);
         content.appendChild(contentDescription);
         post.appendChild(content);

         /// Thumbnail
         if (p.thumbnail !== null) {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            const t = document.createElement('img');
            t.src = `data:image/png;base64,${p.thumbnail}`;
            thumbnail.appendChild(t);
            post.appendChild(thumbnail);
         }

         /// Comments
      

         feed.appendChild(post);
      }
   });

   return feed;
}

function getFeed(apiUrl) {
   if (localStorage.getItem('userLoggedIn') == 'true') {
      const options = {
         headers: {
            'accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('userToken')}`
         }
      }
      return fetch(`${apiUrl}/user/feed`, options);
   } else {
      return fetch(`${apiUrl}/post/public`);
   }
}

function getTime(epochTime) {
   let t = new Date(0);
   t.setUTCSeconds(epochTime);

   let date = `${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`;
   let hours = (t.getHours() < 10) ? `0${t.getHours()}`:`${t.getHours()}`;
   let minutes = (t.getMinutes() < 10) ? `0${t.getMinutes()}`:`${t.getMinutes()}`;

   return `${date} ${hours}:${minutes}`;
}

function postUpvoted(apiUrl, p) {
   if (localStorage.getItem('userLoggedIn') == 'true') {
      // Make api call to get user ID
      const options = {
         headers: {
            'accept': 'application/json',
            'Authorization': `Token ${localStorage.getItem('userToken')}`
         }
      }
      fetch(`${apiUrl}/user`, options)
      .then(res => res.json())
      .then(data => {
         return p.meta.upvotes.includes(data.id);
      });
   }
   return false;
}