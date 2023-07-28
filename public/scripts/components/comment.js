export function newComment(comment, dateString) {
  const commentDiv = document.createElement("div");
  commentDiv.className = "comment";
  commentDiv.dataset.commentId = comment.id;

  const headerDiv = document.createElement("div");
  headerDiv.className = "header";

  const title = document.createElement("h4");
  title.className = "title";
  title.textContent = comment.title;

  const name = document.createElement("h5");
  name.className = "name";
  name.textContent = comment.name;

  const timestampDiv = document.createElement("div");
  timestampDiv.className = "timestamp";

  const timestampSpan = document.createElement("span");
  timestampSpan.textContent = dateString;

  timestampDiv.appendChild(timestampSpan);

  headerDiv.appendChild(title);
  headerDiv.appendChild(name);
  headerDiv.appendChild(timestampDiv);

  const content = document.createElement("p");
  content.className = "content";
  content.textContent = comment.content;

  const replyDiv = document.createElement("div");
  replyDiv.className = "reply";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "800px");
  svg.setAttribute("height", "800px");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");

  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  g.setAttribute("id", "Arrow / Arrow_Undo_Up_Left");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("id", "Vector");
  path.setAttribute(
    "d",
    "M7 13L3 9M3 9L7 5M3 9H16C18.7614 9 21 11.2386 21 14C21 16.7614 18.7614 19 16 19H11"
  );
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");

  g.appendChild(path);
  svg.appendChild(g);

  const replySpan = document.createElement("span");
  replySpan.textContent = "Reply";

  replyDiv.appendChild(svg);
  replyDiv.appendChild(replySpan);

  commentDiv.appendChild(headerDiv);
  commentDiv.appendChild(content);
  commentDiv.appendChild(replyDiv);

  return commentDiv;
}
