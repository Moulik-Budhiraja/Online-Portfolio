import { newComment } from "./components/comment.js";
import { replyButton, replyWindow } from "./components/replyActions.js";

async function getBlogId() {
  const blogSlug = window.location.pathname.split("/").pop();

  const response = await axios.get(`/api/blog/file/${blogSlug}`);

  return response.data.id;
}

async function getComments(blogId) {
  const response = await axios.get(`/api/blog/${blogId}/comments`);
  const comments = response.data;

  // Convert the createdAt and updatedAt strings to Date objects
  comments.forEach((comment) => {
    comment.createdAt = new Date(comment.createdAt);
    comment.updatedAt = new Date(comment.updatedAt);
  });

  // Sort the comments by createdAt date
  comments.sort((a, b) => a.createdAt - b.createdAt);

  return comments;
}

async function postComment(blogId, parentId, title, name, content) {
  const response = await axios.post(`/api/blog/${blogId}/comment`, {
    title,
    name,
    content,
    parentId,
  });

  const comment = await response.data;
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

      // If the comment was created today, display the time HH:MM AM/PM
      // If the comment was created this year, display the month and day
      // Otherwise, display the month and year
      const today = new Date();
      if (
        comment.createdAt.getDate() === today.getDate() &&
        comment.createdAt.getMonth() === today.getMonth() &&
        comment.createdAt.getFullYear() === today.getFullYear()
      ) {
        dateString = comment.createdAt.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      } else if (comment.createdAt.getFullYear() === today.getFullYear()) {
        dateString = comment.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      } else {
        dateString = comment.createdAt.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      }

      if (comment.parentId === null) {
        document.querySelector(".comment-container").innerHTML += newComment(
          comment,
          dateString
        );

        commentsAdded++;
        toRemove.push(comment);
      } else {
        const parentComment = document.querySelector(
          `[data-comment-id="${comment.parentId}"]`
        );

        if (parentComment) {
          parentComment.innerHTML += newComment(comment, dateString);

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

document.addEventListener("click", (e) => {
  document.querySelectorAll(".pop-over").forEach((element) => {
    if (!element.contains(e.target)) {
      element.blur();
      console.log("blurred");
    }
  });
  console.log("clicked");
});
