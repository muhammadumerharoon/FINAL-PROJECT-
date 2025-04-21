document.addEventListener('DOMContentLoaded', function () {
      const loginForm = document.getElementById('loginForm');
      if (!loginForm) return;

      checkExistingSession();

      loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const rememberMe = document.getElementById('remember').checked;

            let isValid = true;

            if (!username) {
                  showError('usernameError', 'Username is required');
                  isValid = false;
            }

            if (!password) {
                  showError('passwordError', 'Password is required');
                  isValid = false;
            } else if (password.length < 4) {
                  showError('passwordError', 'Password must be at least 4 characters');
                  isValid = false;
            }

            if (isValid) {
                  loginUser(username, password, rememberMe);
            }
      });
});


function checkExistingSession() {
      const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      const currentPage = window.location.pathname;

      if (token) {
            if (currentPage.includes('Login.html')) {
                  window.location.href = 'index.html';
            }
      } else {
            if (!currentPage.includes('login.html')) {
                  window.location.href = 'login.html';
            }
      }
}




function loginUser(username, password, rememberMe) {
      const correctUser = {
            username: "johnd",
            password: "m38rmF$"

      };

      if (username === correctUser.username && password === correctUser.password) {
            const token = 'fake-jwt-token';
            if (rememberMe) {
                  localStorage.setItem('authToken', token);
            } else {
                  sessionStorage.setItem('authToken', token);
            }
            window.location.href = 'index.html';
      } else {
            showError('apiError', 'Invalid username or password');
      }
}

function showError(id, message) {
      const element = document.getElementById(id);
      if (element) {
            element.textContent = message;
            element.classList.remove('hidden');
      }
}

function clearErrors() {
      ['usernameError', 'passwordError', 'apiError'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
      });
}
