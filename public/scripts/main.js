document.querySelectorAll(".logout-btn").forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      await axios.delete("/logout");
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  });
});
