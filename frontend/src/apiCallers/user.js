export async function getUser(id=null, username=null) {
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

   const res = await fetch(url, options)
   switch (res.status) {
      case 200:
         return await res.json();
      case 400:
         console.error("Malformed Request:" + res);
         return "failure";
      case 403:
         console.error("Invalid Auth Token" + res);
         return "failure";
      default:
         return "failure";
   }

}

export async function editUser(form) {
   const apiUrl = localStorage.getItem('apiUrl');

   const payload = {
      email: form.email.value,
      name: form.name.value
   }
   if (form.password.value != "") payload["password"] = form.password.value;
   const options = {
      method: 'PUT',
      headers: {
         'accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      },
      body: JSON.stringify(payload)
   }

   const res = await fetch(`${apiUrl}/user/`, options);
   switch (res.status) {
      case 200:
         document.getElementById("closeEditProfileModal").click();
         // Refresh feed
         return "success";
      case 400:
         console.error("Malformed user object:" + res);
         return "failure";
      case 403:
         console.error("Invalid Auth Token" + res);
         return "failure";
      default:
         return "failure";
   }
}

export async function follow(username, toggle) {
   const apiUrl = localStorage.getItem('apiUrl');

   const options = {
      method: 'PUT',
      headers: {
         'accept': 'application/json',
         'Authorization': `Token ${localStorage.getItem('userToken')}`
      }
   }

   const res = await fetch(`${apiUrl}/user/${toggle}?username=${username}`, options);
   switch (res.status) {
      case 200:
         return "success";
      case 400:
         console.error("Malformed Request:" + res);
         return "failure";
      case 403:
         console.error("Invalid Auth Token" + res);
         return "failure";
      default:
         return "failure";
   }
}
