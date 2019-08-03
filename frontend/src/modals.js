//////////////
// LOGIN MODAL
//////////////
export function createLogInModal() {
   const loginModal = document.createElement('div');
   loginModal.classList.add('modal');
   loginModal.id = "loginModal";
   loginModal.style.display='none';

   const content = document.createElement('div');
   content.classList.add('modal-content');

   const form = document.createElement('form');
   form.style.paddingRight = "25%";
   form.id = "loginForm";

   // Header
   const modalHeader = document.createElement('div');
   modalHeader.classList.add('container');
   const close = document.createElement('span');
   close.id = "closeLoginModal";
   close.classList.add('close');
   close.textContent = "×";
   modalHeader.appendChild(close);
   modalHeader.appendChild(document.getElementById('logo').cloneNode(true));
   const heading = document.createElement('h2');
   heading.textContent = "LOG IN";
   modalHeader.appendChild(heading);
   form.appendChild(modalHeader);

   // Body
   const modalBody = document.createElement('div');
   modalBody.classList.add('container');
   /// Username
   const usrLabel = document.createElement('label');
   usrLabel.style.fontWeight = "bold";
   usrLabel.textContent = "Username";
   const usrInput = document.createElement('input');
   usrInput.setAttribute('required', '');
   usrInput.classList.add('text');
   usrInput.type = "text";
   usrInput.placeholder = "Enter Username";
   usrInput.name = "username";
   /// Password
   const pwdLabel = document.createElement('label')
   pwdLabel.style.fontWeight = "bold";
   pwdLabel.textContent = "Password";
   const pwdInput = document.createElement('input');
   pwdInput.setAttribute('required', '');
   pwdInput.classList.add('text');
   pwdInput.type = "password";
   pwdInput.placeholder = "Enter Password";
   pwdInput.name = "password";
   /// Error box
   const loginError = document.createElement('div');
   loginError.id = "loginError";
   loginError.style.color = "red";
   /// Submit
   const space = document.createElement('div');
   space.style.height = "15px";
   const submit = document.createElement('button');
   submit.classList.add('button');
   submit.classList.add('button-secondary');
   submit.type = "submit";
   submit.textContent = "LOG IN";

   modalBody.appendChild(usrLabel);
   modalBody.appendChild(usrInput);
   modalBody.appendChild(pwdLabel);
   modalBody.appendChild(pwdInput);
   modalBody.appendChild(loginError);
   modalBody.appendChild(space);
   modalBody.appendChild(submit);

   form.appendChild(modalBody);
   content.appendChild(form);
   loginModal.appendChild(content);

   return loginModal;
}

///////////////
// SIGNUP MODAL
///////////////
export function createSignUpModal() {
   const signupModal = document.createElement('div');
   signupModal.classList.add('modal');
   signupModal.id = "signupModal";
   signupModal.style.display='none';

   const content = document.createElement('div');
   content.classList.add('modal-content');

   const form = document.createElement('form');
   form.style.paddingRight = "25%";
   form.id = "signupForm";
   
   // Header
   const modalHeader = document.createElement('div');
   modalHeader.classList.add('container');
   const close = document.createElement('span');
   close.id = "closeSignupModal";
   close.classList.add('close');
   close.textContent = "×";
   modalHeader.appendChild(close);
   modalHeader.appendChild(document.getElementById('logo').cloneNode(true));
   const heading = document.createElement('h2');
   heading.textContent = "SIGN UP";
   modalHeader.appendChild(heading);
   form.appendChild(modalHeader);

   // Body
   const modalBody = document.createElement('div');
   modalBody.classList.add('container');
   /// Name
   const nameLabel = document.createElement('label');
   nameLabel.style.fontWeight = "bold";
   nameLabel.textContent = "Name";
   const nameInput = document.createElement('input');
   nameInput.setAttribute('required', '');
   nameInput.classList.add('text');
   nameInput.type = "text";
   nameInput.placeholder = "Enter Name";
   nameInput.name = "name";
   /// Email
   const emailLabel = document.createElement('label');
   emailLabel.style.fontWeight = "bold";
   emailLabel.textContent = "Email";
   const emailInput = document.createElement('input');
   emailInput.setAttribute('required', '');
   emailInput.classList.add('text');
   emailInput.type = "text";
   emailInput.placeholder = "Enter Email";
   emailInput.name = "email";
   /// Username
   const usrLabel = document.createElement('label');
   usrLabel.style.fontWeight = "bold";
   usrLabel.textContent = "Username";
   const usrInput = document.createElement('input');
   usrInput.setAttribute('required', '');
   usrInput.classList.add('text');
   usrInput.type = "text";
   usrInput.placeholder = "Enter Username";
   usrInput.name = "username";
   /// Password
   const pwdLabel = document.createElement('label')
   pwdLabel.style.fontWeight = "bold";
   pwdLabel.textContent = "Password";
   const pwdInput = document.createElement('input');
   pwdInput.setAttribute('required', '');
   pwdInput.classList.add('text');
   pwdInput.type = "password";
   pwdInput.placeholder = "Enter Password";
   pwdInput.name = "password";
   /// Error box
   const signupError = document.createElement('div');
   signupError.id = "signupError";
   signupError.style.color = "red";
   /// Submit
   const space = document.createElement('div');
   space.style.height = "15px";
   const submit = document.createElement('button');
   submit.classList.add('button');
   submit.classList.add('button-secondary');
   submit.type = "submit";
   submit.textContent = "SIGN UP";

   modalBody.appendChild(nameLabel);
   modalBody.appendChild(nameInput);
   modalBody.appendChild(emailLabel);
   modalBody.appendChild(emailInput);
   modalBody.appendChild(usrLabel);
   modalBody.appendChild(usrInput);
   modalBody.appendChild(pwdLabel);
   modalBody.appendChild(pwdInput);
   modalBody.appendChild(signupError);
   modalBody.appendChild(space);
   modalBody.appendChild(submit);

   form.appendChild(modalBody);
   content.appendChild(form);
   signupModal.appendChild(content);

   return signupModal;
}

////////////////
// UPVOTES MODAL
////////////////
export function upvotesModal() {

}