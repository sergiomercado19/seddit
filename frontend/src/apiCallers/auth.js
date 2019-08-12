export async function authLogin(form) {
   const apiUrl = localStorage.getItem('apiUrl');
   // Valid URL fragments
   const validFeedFragments = ["#Trending", "#Curated", "#Mine"];

   let selectedFeed;
   if (validFeedFragments.includes(window.location.hash))
      selectedFeed = window.location.hash.substring(1);
   else
      selectedFeed = "Trending";

   const payload = {
      username: form.username.value,
      password: form.password.value
   }
   const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
   }

   const errorMessage = document.getElementById('loginError');
   errorMessage.textContent = '';

   const res = await fetch(`${apiUrl}/auth/login`, options);
   switch (res.status) {
      case 200:
         document.getElementById("closeLoginModal").click();
         const t = await res.json();
         localStorage.setItem('userLoggedIn', 'true');
         localStorage.setItem('userToken', t.token);
         localStorage.setItem('userName', payload.username);
         localStorage.setItem('selectedFeed', selectedFeed);
         // Refresh feed
         return "success";
      case 400:
         errorMessage.textContent = "Missing Username/Password";
         return "failure";
      case 403:
         errorMessage.textContent = "Invalid Username/Password";
         return "failure";
      default:
         return "failure";
   }
}

export async function authSignup(form) {
   const apiUrl = localStorage.getItem('apiUrl');

   const payload = {
      username: form.username.value,
      password: form.password.value,
      email: form.email.value,
      name: form.name.value
   }
   const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
   }

   const errorMessage = document.getElementById('signupError');
   errorMessage.textContent = '';

   const res = await fetch(`${apiUrl}/auth/signup`, options);
   switch (res.status) {
      case 200:
         document.getElementById("closeSignupModal").click();
         return;
      case 400:
         console.error("Malformed Request:" + res);
         return;
      case 409:
         errorMessage.textContent = "Username is taken";
         return;
   }
}
