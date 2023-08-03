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

document.querySelectorAll(".blur-load img").forEach((img) => {
  const imgPath = img.src.split("/").at(-1);

  const smallImg = document.createElement("img");
  smallImg.src = `/image/small/${imgPath}`;
  smallImg.alt = img.alt;
  smallImg.classList.add("small-img");

  function loaded(img) {
    setTimeout(() => {
      img.classList.add("loaded");
    }, 800);
  }

  [smallImg, img].forEach((img) => {
    if (img.complete) {
      loaded(img);
    } else {
      img.addEventListener("load", () => {
        loaded(img);
      });
    }
  });

  img.parentNode.insertBefore(smallImg, img);
});
