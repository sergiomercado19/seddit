import {getTime, fetchFeed, getUser} from './helpers.js';

export function createNavBar() {
   // Check if user is logged in
   const userLoggedIn = localStorage.getItem('userLoggedIn') == 'true';
   const userName = localStorage.getItem('userName');

   return new Promise(resolve => {
      const header = document.createElement('header');
      header.id = "nav";
      header.classList.add('banner');
   
      /// Logo
      const logo = document.createElement('h1');
      logo.id = "logo";
      logo.classList.add('flex-center');
      logo.classList.add('logo');
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
      
      if (userLoggedIn) {
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

         //// item4: Profile
         const navItem4 = document.createElement('li');
         navItem4.style.paddingLeft = "3px";
         const profile = document.createElement('h1');
         profile.id = "profile";
         profile.classList.add('profile');
         profile.classList.add('flex-center');
         profile.textContent = userName.charAt(0).toUpperCase();
         navItem4.appendChild(profile);
         navbar.appendChild(navItem4);

         header.appendChild(navbar);
         resolve(header);

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

         header.appendChild(navbar);
      }

      resolve(header);
   });
}

export function createMainPage() {
   // Check if user is logged in
   const userLoggedIn = localStorage.getItem('userLoggedIn') == 'true';

   return new Promise(resolve => {
      const main = document.createElement('ul');
      main.id = "feed";
      main.setAttribute('data-id-feed', '');
   
      // Heading
      const heading = document.createElement('div');
      heading.classList.add('feed-header');
      if (!userLoggedIn) {
         const postPopular = document.createElement('h3');
         postPopular.classList.add('feed-title');
         postPopular.classList.add('alt-text');
         postPopular.textContent = "Popular posts";
         heading.appendChild(postPopular);
      }
      if (userLoggedIn) {
         /// POST button
         const postButton = document.createElement('button');
         postButton.id = "postButton";
         postButton.classList.add('button');
         postButton.classList.add('button-secondary');
         postButton.textContent = "NEW POST";
         heading.appendChild(postButton);
         /// MODE toggle
         // TODO
      }
      main.appendChild(heading);
   
      getFeed(0)
      .then(f => {
         f.forEach(post => main.appendChild(post));
         resolve(main);
      });
      
   });
}

export async function getFeed(start) {

   const userLoggedIn = localStorage.getItem('userLoggedIn') == 'true';
   let feed = [];

   //// Append posts
   await fetchFeed(start)
   .then(res => res.json())
   .then(data => {
      for (const p of data.posts) {
         // Create post list element
         const post = document.createElement('li');
         post.classList.add('post');
         post.setAttribute('data-id-post', p.id);

         /// Votes
         const votes = document.createElement('div');
         votes.classList.add('vote');
         //// VoteUp
         if (userLoggedIn) {
            const voteUp = document.createElement('span');
            voteUp.classList.add('vote-element');
            voteUp.setAttribute('name', 'voteUp');
            postUpvoted(p, voteUp);
            const arrowUp = document.createElement('i');
            arrowUp.classList.add('arrow-up');
            voteUp.appendChild(arrowUp);
            votes.appendChild(voteUp);
         }
         //// Count
         const count = document.createElement('span');
         count.setAttribute('data-id-upvotes', p.meta.upvotes.length);
         count.classList.add('vote-element');
         count.setAttribute('name', 'upvotesCount');
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
         contentAuthor.setAttribute('data-id-author', p.meta.author);
         contentAuthor.textContent = `Posted by u/${p.meta.author} on ${getTime(p.meta.published)}`;
         contentInfo.appendChild(contentAuthor);
         content.appendChild(contentInfo);
         //// Title
         const contentTitle = document.createElement('h4');
         contentTitle.classList.add('post-title');
         contentTitle.setAttribute('data-id-title', p.title);
         contentTitle.textContent = p.title;
         content.appendChild(contentTitle);
         //// Description
         const contentDescription = document.createElement('p');
         contentDescription.classList.add('post-description');
         contentDescription.classList.add('alt-text');
         contentDescription.textContent = p.text;
         content.appendChild(contentDescription);
         //// Options
         if (userLoggedIn) {
            ///// Comments
            const contentOptions = document.createElement('p');
            contentOptions.classList.add('post-options');
            const contentComments = document.createElement('label');
            contentComments.classList.add('post-comment');
            contentComments.setAttribute('name', 'comments');
            if ("comments" in p) contentComments.textContent =`Show ${p.comments.length} comments`;
            else contentComments.textContent = "Add a comment";
            contentOptions.appendChild(contentComments);
            content.appendChild(contentOptions);
         }

         post.appendChild(content);

         /// Thumbnail
         if (p.thumbnail !== null && p.thumbnail !== "") {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            const t = document.createElement('img');
            t.name = "thumbnail";
            t.src = `data:image/png;base64,${p.thumbnail}`;
            thumbnail.appendChild(t);
            post.appendChild(thumbnail);
         }

         feed.push(post);
      }
   });

   return feed;
}

function postUpvoted(p, voteUp) {
   const apiUrl = localStorage.getItem('apiUrl');
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
         if (p.meta.upvotes.includes(data.id)) {
            voteUp.setAttribute('data-voted', 'yes');
            voteUp.classList.add('vote-toggled');
         } else {
            voteUp.setAttribute('data-voted', 'no');
         }
      });
   }
   voteUp.setAttribute('data-voted', 'no')
}
