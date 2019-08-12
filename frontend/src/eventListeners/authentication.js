/////////
// LOG IN
/////////
export function setLoginListeners() {
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
}

//////////
// SIGN UP
//////////
export function setSignupListeners() {
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
}