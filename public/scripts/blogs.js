document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const searchQuery = document.querySelector(".search-bar input").value;

  if (searchQuery) {
    window.location.href = `/blog?search=${searchQuery}`;
  }
});

document.querySelector(".search-bar input").focus();
