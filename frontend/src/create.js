import {getTime, chooseFeed, fetchFeed} from './helpers.js';
import {getUser} from './apiCallers/user.js'

export async function createNavBar() {
   // Check if user is logged in
   const userLoggedIn = localStorage.getItem('userLoggedIn') == 'true';

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
   
   if (userLoggedIn) {
      const user = await getUser();

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
      profile.textContent = user.name.charAt(0).toUpperCase();
      navItem4.appendChild(profile);
      navbar.appendChild(navItem4);

      header.appendChild(navbar);

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
   
   return header;
}

export async function createMainPage() {
   // Check if user is logged in
   const userLoggedIn = localStorage.getItem('userLoggedIn') == 'true';
   // Get selectedFeed
   const selectedFeed = localStorage.getItem('selectedFeed');

   const main = document.createElement('ul');
   main.id = "feed";
   main.classList.add('feed');
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
      /// MODE toggle
      const dropdown = document.createElement('div');
      dropdown.classList.add('dropdown');
      dropdown.id = "selectedFeedDropdown"
      const dropdownButton = document.createElement('button');
      dropdownButton.id = "selectedFeedButton";
      dropdownButton.classList.add('button');
      dropdownButton.classList.add('button-secondary');
      dropdownButton.textContent = `${selectedFeed} ▼`;
      dropdown.appendChild(dropdownButton);
      const dropdownOptions = document.createElement('div');
      dropdownOptions.id = "selectedFeedOptions";
      dropdownOptions.classList.add('dropdown-content');
      if (selectedFeed !== "Trending") {
         const option1 = document.createElement('a');
         option1.href = "#Trending";
         option1.textContent = "Trending";
         dropdownOptions.appendChild(option1);
      }
      if (selectedFeed !== "Curated") {
         const option2 = document.createElement('a');
         option2.href = "#Curated";
         option2.textContent = "Curated";
         dropdownOptions.appendChild(option2);
      }
      if (selectedFeed !== "Mine") {
         const option3 = document.createElement('a');
         option3.href = "#Mine";
         option3.textContent = "Mine";
         dropdownOptions.appendChild(option3);
      }
      dropdown.appendChild(dropdownOptions);
      heading.appendChild(dropdown);
      /// POST button
      const postButton = document.createElement('button');
      postButton.id = "postButton";
      postButton.classList.add('button');
      postButton.classList.add('button-secondary');
      postButton.textContent = "NEW POST";
      heading.appendChild(postButton);
   }
   main.appendChild(heading);

   await createFeed(chooseFeed(), 0).then(f => {
      f.forEach(post => main.appendChild(post));
   });
   
   return main;
}

export async function createFeed(feedType, start) {
   const userLoggedIn = localStorage.getItem('userLoggedIn') == 'true'
                        && !feedType.includes("UserPage");
   const user = (userLoggedIn) ? await getUser() : undefined;
   let feed = [];

   // Append posts
   const data = await fetchFeed(feedType, start)
   for (const p of data.posts) {
      // Create post list element
      const post = document.createElement('li');
      post.classList.add('post');
      post.setAttribute('data-id-post', p.id);

      // Votes
      const votes = document.createElement('div');
      votes.classList.add('vote');
      /// VoteUp
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
      /// Count
      const count = document.createElement('span');
      count.setAttribute('data-id-upvotes', p.meta.upvotes.length);
      count.classList.add('vote-element');
      count.setAttribute('name', 'upvotesCount');
      count.textContent = p.meta.upvotes.length;
      votes.appendChild(count);
      post.appendChild(votes);

      // Content
      const content = document.createElement('div');
      content.classList.add('content');
      /// Info
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
      const contentExtra = document.createElement('label');
      contentExtra.classList.add('post-extra');
      contentExtra.appendChild(document.createTextNode("Posted by "));
      const contentAuthor = document.createElement('a');
      contentAuthor.setAttribute('data-id-author', p.meta.author);
      if (userLoggedIn) contentAuthor.classList.add('post-author');
      contentAuthor.name = "postAuthor";
      contentAuthor.textContent = `u/${p.meta.author}`;
      contentExtra.appendChild(contentAuthor);
      contentExtra.appendChild(document.createTextNode(` on ${getTime(p.meta.published)}`));
      contentInfo.appendChild(contentExtra);
      content.appendChild(contentInfo);
      /// Title
      const contentTitle = document.createElement('h4');
      contentTitle.classList.add('post-title');
      contentTitle.setAttribute('data-id-title', p.title);
      contentTitle.textContent = p.title;
      content.appendChild(contentTitle);
      /// Description
      const contentDescription = document.createElement('p');
      contentDescription.classList.add('post-description');
      contentDescription.classList.add('alt-text');
      contentDescription.textContent = p.text;
      content.appendChild(contentDescription);
      /// Options
      if (userLoggedIn) {
         const contentOptions = document.createElement('p');
         contentOptions.classList.add('post-footer');
         //// Comments
         const optionComment = document.createElement('label');
         optionComment.classList.add('post-option');
         optionComment.setAttribute('name', 'postComment');
         if ("comments" in p && p.comments.length > 0) {
            optionComment.setAttribute('data-comment-count', p.comments.length);
            optionComment.textContent =`Show ${p.comments.length} comments`;
         } else {
            optionComment.setAttribute('data-comment-count', 0);
            optionComment.textContent = "Add a comment";
         }
         contentOptions.appendChild(optionComment);
         //// Edit/delete post
         if (user.posts.includes(p.id)) {
            const optionEdit = document.createElement('label');
            optionEdit.classList.add('post-option');
            optionEdit.setAttribute('name', 'postEdit');
            optionEdit.textContent = "Edit ✎";
            contentOptions.appendChild(optionEdit);

            const optionDelete = document.createElement('label');
            optionDelete.classList.add('post-option');
            optionDelete.setAttribute('name', 'postDelete');
            optionDelete.textContent = "Delete 🗑";
            contentOptions.appendChild(optionDelete);
         }
         content.appendChild(contentOptions);
      }
      post.appendChild(content);

      // Thumbnail
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

   return feed;
}

function postUpvoted(p, voteUp) {
   if (localStorage.getItem('userLoggedIn') == 'true') {
      getUser().then(data => {
         if (p.meta.upvotes.includes(data.id)) {
            voteUp.setAttribute('data-voted', 'yes');
            voteUp.classList.add('vote-toggled');
         } else {
            voteUp.setAttribute('data-voted', 'no');
         }
      });
   }
   voteUp.setAttribute('data-voted', 'no');
}
