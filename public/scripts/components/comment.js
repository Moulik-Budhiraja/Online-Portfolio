"use strict";

export function newComment(comment, dateString) {
  const commentDiv = /*html*/ `
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

  return commentDiv;
}
