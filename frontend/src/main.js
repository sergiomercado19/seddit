/*
   COMP2041 Assignment - Seddit
   Written by Sergio Mercado Ruiz - z5161191
   Completed on 2019-08-13

 */

//////////
// IMPORTS
//////////
import {getUser} from './apiCallers/user.js';
import {chooseFeed, closeModals} from './helpers.js'
import {createNavBar, createMainPage, createFeed} from './create.js';
import {setupLogin, setupLogout, setupSignup} from './pageElements/authentication.js'
import {setupProfile, setupUserPages, createUserPage} from './pageElements/user.js'
import {setupFeedType, setupVoting} from './pageElements/feed.js'
import {setupUpvotes, setupComments, setupImages} from './pageElements/feed.js'
import {setupNewPost, setupEditPost, setupDeletePost} from './pageElements/posting.js'

/////////////////////
// INIT LOCAL STORAGE
/////////////////////
localStorage.clear();
localStorage.setItem('userLoggedIn', 'false');
localStorage.setItem('userToken', '');
localStorage.setItem('userName', '');
localStorage.setItem('selectedFeed', 'Trending');

// Valid URL fragments
const validFeedFragments = ["#Trending", "#Curated", "#Mine"];
const validProfileFragments = /^#profile=([0-9]+)$/;

function initApp(apiUrl) {
   // Save apiUrl
   localStorage.setItem('apiUrl', apiUrl);
   
   ///////////////////////////
   // HANDLE URL FRAGMENTATION
   ///////////////////////////
   window.onhashchange = () => {
      const hash = window.location.hash;
      if (validFeedFragments.includes(hash)) {
         // FEED TYPE
         localStorage.setItem('selectedFeed', hash.substring(1));
         initApp(apiUrl);
      } else if (validProfileFragments.test(hash) 
                 && localStorage.getItem('userLoggedIn') == 'true') {
         // USER PAGES
         const userId = hash.match(validProfileFragments)[1];
         getUser(userId).then(data => {
            // Check if userId is valid
            if (data != "failure") {
               closeModals();
               createUserPage(userId, data.username);
            } else {
               alert("Invalid userId from URL fragment");
            }
         });
      }
   }
   
   // Feed page info
   let pageData = {
      feedPage: 0,
      pageLoaded: false
   };

   // Clear page contents
   const root = document.getElementById("root");
   while (root.lastChild) root.removeChild(root.lastChild);

   // Get main page elements
   const pageElements = [createNavBar(), createMainPage()];
   Promise.all(pageElements).then(([createdNavBar, createdFeed]) => {
      
      ///////////////////////
      // MAIN PAGE COMPONENTS
      ///////////////////////

      // CREATE HEADER
      const header = createdNavBar;
      root.appendChild(header);
      
      // CREATE MAIN
      const main = document.createElement('main');
      main.setAttribute('role', 'main');
      const feed = createdFeed;
      main.append(feed);
      root.appendChild(main);
   
      // CREATE FOOTER
      const footer = document.createElement('footer');
      root.appendChild(footer);
      
      /////////////////////
      // DYNAMIC COMPONENTS
      /////////////////////

      // IMAGES
      setupImages();
      
      if (localStorage.getItem('userLoggedIn') == 'true') {

         // AUTHENTICATION
         /////////////////
         setupLogout(initApp);

         // USER
         ///////
         setupProfile(initApp);
         setupUserPages();

         // FEED
         ///////
         setupFeedType();
         setupInfiniteScroll(pageData);
         setupVoting();
         setupUpvotes();
         setupComments();

         // POSTING
         //////////
         setupNewPost(initApp);
         setupEditPost(initApp);
         setupDeletePost(initApp);

      } else {

         // AUTHENTICATION
         /////////////////
         setupLogin(initApp);
         setupSignup();

      }
   });
}

//////////////////
// INFINITE SCROLL
//////////////////
function setupInfiniteScroll(pageData) {
   window.onscroll = () => {
      const feed = document.getElementById('feed');
      if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight
         && localStorage.getItem('selectedFeed') != "Trending"
         && !pageData.pageLoaded) {
         pageData.feedPage++;
         createFeed(chooseFeed(), pageData.feedPage*10)
         .then(f => {
            if (f.length == 0) {
               pageData.pageLoaded = true;
            } else {
               f.forEach(post => feed.appendChild(post));
               // Update listeners of dynamic components
               setupUserPages();
               setupVoting();
               setupUpvotes();
               setupComments();
               setupImages();
               setupEditPost(initApp);
               setupDeletePost(initApp);
            }
         });
      }
   };
}

export default initApp;
