async function getBlogId() {
  const blogFilename = window.location.pathname.split("/").pop();

  const response = await fetch(`/api/blog/file/${blogFilename}`);
  const blog = await response.json();

  return blog.id;
}

async function getComments(blogId) {
  const response = await fetch(`/api/blog/${blogId}/comments`);
  const comments = await response.json();

  // Convert the created_at and updated_at strings to Date objects
  comments.forEach((comment) => {
    comment.created_at = new Date(comment.created_at);
    comment.updated_at = new Date(comment.updated_at);
  });

  // Sort the comments by created_at date
  comments.sort((a, b) => a.created_at - b.created_at);

  return comments;
}

async function postComment(blogId, parentId, title, name, content) {
  const response = await fetch(`/api/blog/${blogId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      name,
      content,
      parentId,
    }),
  });

  console.log(
    JSON.stringify({
      title,
      name,
      content,
      parentId,
    })
  );

  const comment = await response.json();

  return comment;
}

async function renderComments() {
  const blogId = await getBlogId();
  const comments = await getComments(blogId);

  // Clear the comment container
  document.querySelector(".comment-container").innerHTML = "";

  // In a while loop, start by adding all the comments that don't have a parent_id to the html
  // in the next iteration, add all the comments that have a parent_id that exists in the previous iteration
  // repeat until all comments have been added, keep track of the number of comments added in each iteration
  // if the number of comments added in an iteration is 0, break out of the loop

  let html = "";
  let commentsAdded = 0;
  const toRemove = [];

  while (true) {
    commentsAdded = 0;

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];

      let dateString = "";

      // If the comment was created today, display the time
      // If the comment was created this year, display the month and day
      // Otherwise, display the month and year
      const today = new Date();
      if (
        comment.created_at.getDate() === today.getDate() &&
        comment.created_at.getMonth() === today.getMonth() &&
        comment.created_at.getFullYear() === today.getFullYear()
      ) {
        dateString = comment.created_at.toLocaleTimeString();
      } else if (comment.created_at.getFullYear() === today.getFullYear()) {
        dateString = comment.created_at.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      } else {
        dateString = comment.created_at.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      }

      if (comment.parent_id === null) {
        document.querySelector(".comment-container").innerHTML += `
                    <div class="comment" data-comment-id="${comment.id}">
                    <div class="header">
                        <h4 class="title">${comment.title}</h4>
                        <h5 class="name">${comment.name}</h5>
                        <div class="timestamp">
                          <span>${dateString}</span>
                        </div>
                    </div>

                        <p class="content">${comment.content}</p>
                        <div class="reply">
                            <svg
                                width="800px"
                                height="800px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="Arrow / Arrow_Undo_Up_Left">
                                    <path
                                        id="Vector"
                                        d="M7 13L3 9M3 9L7 5M3 9H16C18.7614 9 21 11.2386 21 14C21 16.7614 18.7614 19 16 19H11"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </g>
                            </svg>
                            <span>Reply</span>
                        </div>
                    </div>
                `;
        commentsAdded++;
        toRemove.push(comment);
      } else {
        const parentComment = document.querySelector(
          `[data-comment-id="${comment.parent_id}"]`
        );
        if (parentComment) {
          parentComment.innerHTML += `
                        <div class="comment" data-comment-id="${comment.id}">
                        <div class="header">
                            <h4 class="title">${comment.title}</h4>
                            <h5 class="name">${comment.name}</h5>
                            <div class="timestamp">
                              <span>${dateString}</span>
                            </div>
                        </div>
                            <p class="content">${comment.content}</p>
                            <div class="reply">
                                <svg
                                    width="800px"
                                    height="800px"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="Arrow / Arrow_Undo_Up_Left">
                                        <path
                                            id="Vector"
                                            d="M7 13L3 9M3 9L7 5M3 9H16C18.7614 9 21 11.2386 21 14C21 16.7614 18.7614 19 16 19H11"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </g>
                                </svg>
                                <span>Reply</span>
                            </div>
                        </div>
                    `;
          commentsAdded++;
          toRemove.push(comment);
        }
      }
    }

    if (commentsAdded === 0) {
      break;
    }

    // Remove the comments that have been added from the comments array
    toRemove.forEach((comment) => {
      const index = comments.indexOf(comment);
      comments.splice(index, 1);
    });
  }

  document.querySelectorAll(".reply").forEach((reply) => {
    reply.addEventListener("click", replyButtonListener);
  });

  // If there are no comments, display a message "No comments yet. Be the first to leave one."
  if (document.querySelector(".comment-container").innerHTML === "") {
    document.querySelector(".comment-container").innerHTML =
      "<p>No comments yet. Be the first to leave one.</p>";
  }
}

const replyButton = `<div class="reply">
<svg
  width="800px"
  height="800px"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g id="Arrow / Arrow_Undo_Up_Left">
    <path
      id="Vector"
      d="M7 13L3 9M3 9L7 5M3 9H16C18.7614 9 21 11.2386 21 14C21 16.7614 18.7614 19 16 19H11"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </g>
</svg>
<span>Reply</span>
</div>`;

const replyWindow = `<div class="reply-window">
<h2>Reply</h2>
<div class="cancel">
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title />

    <g id="cross">
      <line class="cls-1" x1="7" x2="25" y1="7" y2="25" />
      <line class="cls-1" x1="7" x2="25" y1="25" y2="7" />
    </g>
  </svg>
  <span>Cancel</span>
</div>
<form action="#" method="post" class="comment-form">
            <input
              type="name"
              name="name"
              id="name"
              required="required"
              maxlength="25"
            />
            <span>Name</span>
            <input
              type="text"
              name="title"
              id="title"
              required="required"
              maxlength="40"
            />
            <span>Title</span>
            <textarea
              name="content"
              id="content"
              required="required"
              rows="5"
              maxlength="2000"
            ></textarea>
            <span>Body</span>

            <input type="submit" id="submit" value="Submit" />
          </form>
</div>`;

async function formListener(e) {
  e.preventDefault();

  const blogId = await getBlogId();
  const title = e.target.title.value.trim();
  const name = e.target.name.value.trim();
  const content = e.target.content.value.trim();

  // If the comment-form is inside a reply-window, then get the parent_id from the reply-window's parent comment
  let parentId = null;

  const formParent = e.target.parentElement;
  if (formParent.classList.contains("reply-window")) {
    const parentComment = formParent.parentElement;
    parentId = parentComment.dataset.commentId;
  }

  const comment = await postComment(blogId, parentId, title, name, content);

  await renderComments();

  // Clear the form
  e.target.title.value = "";
  e.target.name.value = "";
  e.target.content.value = "";
}

document
  .querySelector(".comment-form")
  .addEventListener("submit", formListener);

function replyButtonListener(e) {
  const comment = e.target.parentElement;

  // Loop through the other comments and replace any reply-windows with reply buttons
  document.querySelectorAll(".comment").forEach((comment) => {
    if (comment.querySelector(".reply-window")) {
      comment.querySelector(".reply-window").remove();
      comment
        .querySelector(".content")
        .insertAdjacentHTML("afterend", replyButton);
    }
  });

  // Replace the reply button with a reply window
  comment.querySelector(".reply").remove();
  comment.querySelector(".content").insertAdjacentHTML("afterend", replyWindow);

  console.log(comment);

  // Focus on the name input
  comment.querySelector("#name").focus();

  // Add a submit event listener to the form
  comment
    .querySelector(".comment-form")
    .addEventListener("submit", formListener);

  // Add a click event listener to the cancel button
  comment.querySelector(".cancel").addEventListener("click", (e) => {
    const replyWindow = e.target.parentElement;
    const comment = replyWindow.parentElement;

    // Replace the reply window with

    replyWindow.remove();
    comment
      .querySelector(".content")
      .insertAdjacentHTML("afterend", replyButton);

    // Add a click event listener to the reply button
    comment
      .querySelector(".reply")
      .addEventListener("click", replyButtonListener);
  });
}

await renderComments();

console.log(await getComments(1));
