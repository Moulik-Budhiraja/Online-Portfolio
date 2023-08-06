let customSlug = false;

["keyup", "keydown"].forEach((eventType) => {
  document.querySelector("#title").addEventListener(eventType, (e) => {
    if (customSlug) return;
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/ /g, "-");
    document.querySelector("#slug").value = slug;
  });
});

document.querySelector("#slug").addEventListener("keyup", (e) => {
  customSlug = e.target.value !== "";
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const slug = document.querySelector("#slug").value;
  const description = document.querySelector("textarea").value;

  const data = {
    title,
    slug,
    description,
  };

  const response = await axios.post("/admin/blogs/create", data);

  console.log(response.data);

  window.location.href = `/admin/blogs/edit/${response.data.slug}`;
});
