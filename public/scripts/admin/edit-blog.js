const blogId = document.querySelector("#blogId").value;

let editor = ace.edit("editor");
editor.setTheme("ace/theme/one_dark");
editor.setOptions({
  fontFamily: "monospace",
  fontSize: "14px",
});
editor.session.setMode("ace/mode/markdown");
editor.session.setUseWrapMode(true);
editor.setShowPrintMargin(false);

document.querySelector("#save").addEventListener("click", async (e) => {
  const data = {
    blogId: blogId,
    content: editor.getValue(),
  };

  const response = await axios.post("/api/blog/save-draft", data);

  if (response.status === 201) {
    e.target.textContent = "Saved";
    e.target.classList.add("btn-success");

    setTimeout(() => {
      e.target.textContent = "Save";
      e.target.classList.remove("btn-success");
    }, 1000);
  }
});

document.querySelector("#save-version").addEventListener("click", (e) => {
  document.querySelector(".save-version-menu").classList.toggle("visible");

  console.log("clicked");
});

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
      button.textContent = "Saved";
      button.classList.add("btn-success");

      setTimeout(() => {
        button.textContent = "Save";
        button.classList.remove("btn-success");
      }, 1000);

      setTimeout(() => {
        document
          .querySelector(".save-version-menu")
          .classList.toggle("visible");

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
