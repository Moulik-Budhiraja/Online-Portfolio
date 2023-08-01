function showError(message) {
  document.querySelector(".error-msg").textContent = message;
}

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  showError("");

  const email = e.target.email.value;
  const password = e.target.password.value;

  if (!email || !password) {
    showError("Please enter an email and password");
    return;
  }

  if (password.length < 8) {
    showError("Password must be at least 8 characters");
    return;
  }

  try {
    const response = await axios.post("/login", {
      email,
      password,
    });

    console.log(response.data);

    if (response.data.user.role === "ADMIN") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    if (error.response.status === 401) {
      showError("Incorrect email or password");
    }
    return;
  }
});
