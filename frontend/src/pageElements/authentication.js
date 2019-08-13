import {createLogInModal, createSignUpModal} from '../modals/authentication.js';
import {authLogin, authSignup} from '../apiCallers/auth.js'

/////////
// LOG IN
/////////
export function setupLogin(initApp) {
   // Setup
   const loginModal = createLogInModal();
   document.getElementById("root").appendChild(loginModal);
   // Add listeners
   document.getElementById("closeLoginModal").addEventListener('click', () => {
      loginModal.style.display = 'none';
      document.getElementById("loginForm").reset();
      document.getElementById("loginError").textContent = "";
      document.body.style.overflow = "visible";
   });
   document.getElementById("loginButton").addEventListener('click', () => {
      loginModal.style.display = 'block';
      document.body.style.overflow = "hidden";
   });
   // Close when grey area is clicked
   loginModal.onclick = (e) => {
      if (e.target == loginModal) {
         loginModal.style.display = "none";
         document.getElementById("loginForm").reset();
         document.getElementById('loginError').textContent = "";
         document.body.style.overflow = "visible";
      }
   };
   // Submit login
   const loginForm = document.getElementById('loginForm');
   loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      authLogin(loginForm).then(outcome => {
         if (outcome == 'success') initApp(localStorage.getItem('apiUrl'));
      });
   });
}

/////////
// LOGOUT
/////////
export function setupLogout(initApp) {
   document.getElementById("logoutButton").addEventListener('click', () => {
      localStorage.setItem('userLoggedIn', 'false')
      localStorage.setItem('userToken', '');
      localStorage.setItem('userName', '');
      localStorage.setItem('selectedFeed', 'Trending');
      initApp(localStorage.getItem('apiUrl'));
   });
}

//////////
// SIGN UP
//////////
export function setupSignup() {
   // Setup
   const signupModal = createSignUpModal();
   document.getElementById("root").appendChild(signupModal);
   // Add listeners
   document.getElementById("closeSignupModal").addEventListener('click', () => {
      signupModal.style.display = 'none';
      document.getElementById("signupForm").reset();
      document.getElementById('signupError').textContent = "";
      document.body.style.overflow = "visible";
   });
   document.getElementById("signupButton").addEventListener('click', () => {
      signupModal.style.display = 'block';
      document.body.style.overflow = "hidden";
   });
   // Close when grey area is clicked
   signupModal.onclick = (e) => {
      if (e.target == signupModal) {
         signupModal.style.display = "none";
         document.getElementById("signupForm").reset();
         document.getElementById('signupError').textContent = "";
         document.body.style.overflow = "visible";
      }
   };
   // Submit signup
   const signupForm = document.getElementById('signupForm');
   signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      authSignup(signupForm);
   });
}