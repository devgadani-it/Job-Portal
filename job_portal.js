function signup(event) {

    event.preventDefault();

    const name = document.getElementById("signup_name").value.trim();
    const email = document.getElementById("signup_email").value.trim();
    const password = document.getElementById("signup_pswd").value.trim();
    const confirmPassword = document.getElementById("signup_cpswd").value.trim();

    const namePattern = /^[A-Za-z ]+$/;
    const passwordPattern = /^[1-9][0-9]{3}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !namePattern.test(name)) {
        alert("Name must contain only alphabets.");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!passwordPattern.test(password)) {
        alert("Password must be exactly 4 digits and should not start with 0.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("isLoggedIn", "false");

    alert("Account created successfully!");

    window.location.href = "login.html";
}

function login(event) {

    event.preventDefault();

    const username = document.getElementById("login_name").value.trim();
    const password = document.getElementById("pswd").value.trim();

    const usernamePattern = /^[A-Za-z ]+$/;
    const passwordPattern = /^[1-9][0-9]{3}$/;

    if (!username || !usernamePattern.test(username)) {
        alert("Name must contain only alphabets.");
        return;
    }

    if (!password || !passwordPattern.test(password)) {
        alert("Password must be exactly 4 digits and should not start with 0.");
        return;
    }

    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (savedUsername && savedPassword) {

        if (username !== savedUsername || password !== savedPassword) {
            alert("Invalid username or password.");
            return;
        }

    } else {
        alert("No account found. Please sign up first.");
        window.location.href = "signup.html";
        return;
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);

    alert("Welcome " + username + "! Login successful.");

    window.location.href = "job_portal.html";
}

function logout() {

    localStorage.removeItem("isLoggedIn");


    alert("Logout successful!");

    window.location.href = "login.html";
}

function searchJob() {
    
    const input = document.getElementById("searchInput").value.toLowerCase();
    const jobs = document.querySelectorAll(".company_details");

    jobs.forEach(job => {
        const title = job.querySelector("h3").innerText.toLowerCase();
        
        job.style.display = title.includes(input) ? "inline" : "none";
    });
}

function filterJobs(type) {
    const jobs = document.querySelectorAll(".company_details");

    jobs.forEach(job => {
        const jobType = job.querySelector("span").innerText.trim();

        if (type === "All" || jobType === type) {
            job.style.display = "inline";
        } else {
            job.style.display = "none";
        }
    });
}


function saveData(e) {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const dob = document.getElementById("dob").value;
  const city = document.getElementById("city").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const degree = document.getElementById("degree").value.trim();
  const university = document.getElementById("university").value.trim();

 if (name.toLowerCase() === "null"||name === "" || !/^[A-Za-z ]+$/.test(name)) {
    alert("Please enter valid name");
    return;
  }

  if (!/^\w+@\w+(\.\w{2,3})+$/.test(email)) {
    alert("Please enter a valid email address");
    return;
  }

  if (!/^[1-9][0-9]{9}$/.test(mobile)) {
    alert("Mobile number must be 10 digits");
    return;
  }

  if (gender === null) {
    alert("Please select gender");
    return;
  }

  if (degree.toLowerCase() === "null" ||degree === "" || !/^[A-Za-z ]+$/.test(degree)) {
    alert("Please enter valid degree");
    return;
  }

  if (university.toLowerCase() === "null" ||university === "" || !/^[A-Za-z ]+$/.test(university)) {
    alert("Please enter valid university");
    return;
  }
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("email", email);
  sessionStorage.setItem("mobile", mobile);
  sessionStorage.setItem("dob", dob);
  sessionStorage.setItem("city", city);
  sessionStorage.setItem("gender", gender.value);
  sessionStorage.setItem("degree", degree);
  sessionStorage.setItem("university", university);

  alert("Application Submitted Successfully!");

  window.location.href = "../job_portal.html"; 
  e.target.reset();
  
}

 
function checkLogin(event) {
    if (localStorage.getItem("isLoggedIn") !== "true") {
        event.preventDefault();
        alert("Please login first!");
        window.location.href = "../login.html";
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const userName = document.getElementById("userName");
    const userSection = document.getElementById("userSection");
    const logoutSection = document.getElementById("logoutSection");
    const loginSection = document.getElementById("loginSection");
    const signupSection = document.getElementById("signupSection");

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = localStorage.getItem("username");

    if (isLoggedIn === "true" && username) {

        if (userName) {
            userName.textContent = "Hello, " + username;
        }

        if (userSection) {
            userSection.style.display = "block";
        }

        if (logoutSection) {
            logoutSection.style.display = "block";
        }

        if (loginSection) {
            loginSection.style.display = "none";
        }

        if (signupSection) {
            signupSection.style.display = "none";
        }

    }
});

