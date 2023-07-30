"use strict";

export const replyButton = /*html*/ `
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
  `;

// Now, replyDiv is an element that can be appended to the DOM wherever you need it.
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

export const replyWindow = /*html*/ `
  <div class="reply-window">
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
  </div>
`;
