document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  console.log(e.target);
  console.log(formData);

  try {
    await axios.post("/api/image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Image uploaded successfully");
    e.target.reset();
  } catch (error) {
    console.log(error.response.data);
  }
});
