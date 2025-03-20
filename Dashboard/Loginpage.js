document.addEventListener("DOMContentLoaded", () => {
      const loginButton = document.querySelector("button");
      const usernameInput = document.getElementById("Username");
      const passwordInput = document.getElementById("password");

      const showError = (message) => {
        let errorMsg = document.getElementById("error-msg");
        errorMsg.textContent = message;
      };
    
      loginButton.addEventListener("click", async () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        const data = {
            username: username,
            password: password
          }
        
        try {
          const response = await fetch("https://fakestoreapi.com/auth/login", {
            method : "POST",
            headers : {
                  "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)
          });
            const result = await response.json();
          
          if (response.ok) {
            alert("Login successful!");
          } else {
            showError("Invalid username or password.");
          }
        } catch (error) {
          showError("Account Does Not Exist");
        }
      });
    });
    