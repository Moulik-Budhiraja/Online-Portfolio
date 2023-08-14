import { codeCopyButton } from "./components/codeCopy.js";

export function applyBlurLoad(img) {
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
}

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
  applyBlurLoad(img);
});

document.querySelectorAll("pre").forEach((pre) => {
  pre.insertAdjacentHTML("afterbegin", codeCopyButton());

  pre.querySelector(".code-copy").addEventListener("click", (e) => {
    const code = pre.querySelector("code").innerText;
    navigator.clipboard.writeText(code);

    pre.querySelector(".code-copy").classList.add("copied");
    setTimeout(() => {
      pre.querySelector(".code-copy").classList.remove("copied");
    }, 2000);
  });
});
