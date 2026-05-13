const signinBtn = document.getElementById("signinBtn");
console.log(signinBtn);

signinBtn.addEventListener("click", ()=>{
      const emailInputValue = document.getElementById("emailInput")
      .value
      const passwordInputValue = document.getElementById("passwordInput").value
   

     if(!emailInputValue || !passwordInputValue){
          alert("Please provide the email and password");
     } else if(emailInputValue === "admin" && passwordInputValue === "admin123"){
          window.location.href = "./home.html"
     } else{
         alert("Invalid Email and Password");
     }
})