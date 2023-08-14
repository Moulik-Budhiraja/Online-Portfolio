import { htmlStringToElement } from "../helpers/general.js";
import { applyBlurLoad } from "../main.js";

const blogId = document.querySelector("#blogId").value;

async function refreshImages(searchTerm = "") {
  const imageContainer = document.querySelector(".images");

  const response = await axios.get(`/api/images?filename=${searchTerm}`);

  console.log(response.data);

  imageContainer.innerHTML = "";

  for (let image of response.data) {
    const img = htmlStringToElement(/*html*/ `
      <div class="blur-load image">
        <img src="/image/${image.filename}" alt="${image.filename}"/>
      </div>
    `);

    imageContainer.insertAdjacentElement("beforeend", img);

    console.log(img);
    applyBlurLoad(img.querySelector("img"));
  }
}

let editor = ace.edit("editor");
editor.setTheme("ace/theme/one_dark");
editor.setOptions({
  fontFamily: "monospace",
  fontSize: "14px",
});
editor.session.setMode("ace/mode/markdown");
editor.session.setUseWrapMode(true);
editor.setShowPrintMargin(false);

async function saveBlog(e) {
  const data = {
    blogId: blogId,
    content: editor.getValue(),
  };

  const response = await axios.post("/api/blog/save-draft", data);

  const saveButton = document.querySelector("#save");

  if (response.status === 201) {
    saveButton.textContent = "Saved";
    saveButton.classList.add("btn-success");

    setTimeout(() => {
      saveButton.textContent = "Save";
      saveButton.classList.remove("btn-success");
    }, 1000);
  }
}

document
  .querySelector(".save-version-menu form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      blogId: blogId,
      content: editor.getValue(),
      versionName: document.querySelector("#version-name").value,
    };

    const response = await axios.post("/api/blog/save-draft", data);

    if (response.status === 201) {
      const button = document.querySelector(
        ".save-version-menu form input[type='submit']"
      );
      button.value = "Saved";
      button.classList.add("btn-success");

      setTimeout(() => {
        button.value = "Save";
        button.classList.remove("btn-success");
      }, 1000);

      setTimeout(() => {
        document
          .querySelector(".save-version-menu form input[type='submit']")
          .blur();

        document.querySelector("#version-name").value = "";
      }, 1500);
    }
  });

document.querySelector("#publish").addEventListener("click", async (e) => {
  const data = {
    blogId: blogId,
  };

  const response = await axios.post("/api/blog/publish", data);

  if (response.status === 201) {
    e.target.textContent = "Published";
    e.target.classList.add("btn-success");

    setTimeout(() => {
      e.target.textContent = "Publish";
      e.target.classList.remove("btn-success");
    }, 1000);
  }
});

document.addEventListener("keydown", function (e) {
  if (e.ctrlKey) {
    if (e.key === "s" || e.key === "S") {
      e.preventDefault();

      if (e.shiftKey) {
        document
          .querySelector(".save-version-menu")
          .classList.toggle("visible");
      } else {
        saveBlog(e);
      }
    }
  }
});

refreshImages();

document.querySelector("#save").addEventListener("click", saveBlog);

document.querySelector("#save-version").addEventListener("click", (e) => {
  document.querySelector("#version-name").focus();
});
