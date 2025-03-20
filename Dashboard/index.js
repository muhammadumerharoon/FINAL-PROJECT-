document.addEventListener("DOMContentLoaded", () => {
      const signupButton = document.querySelector("button");
      const inputs = {
        name: document.querySelector("input[placeholder='Your Full Name']"),
        email: document.querySelector("input[placeholder='Your Email Address']"),
        password: document.querySelector("input[placeholder='Create a Strong Password']")
      };

      const showError = (message) => {
        let errorMsg = document.getElementById("error-msg");
        console.log(errorMsg);
        errorMsg.className = "text-red-500 text-sm mt-2";
       
        
        errorMsg.textContent = message;
        inputs.password.parentNode.appendChild(errorMsg);
      };

    
      signupButton.addEventListener("click", async (event) => {
        event.preventDefault();
        
        const user = {
          id: Date.now(),
          username: inputs.name.value,
          email: inputs.email.value,
          password: inputs.password.value,
        };
        
        try {
          const response = await fetch("https://fakestoreapi.com/users",  {
            method : "post",
            headers : {
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)

          });
          const result = await response.json();
          if (response.ok) {
            localStorage.setItem("username", user.username);
            localStorage.setItem("password", user.password);
            alert("Signup successful.");
          } else {
            showError("Signup failed. Please try again.");
          }
        } catch {
          showError("An error occurred. Please try again later.");
        }
      });
    });
    