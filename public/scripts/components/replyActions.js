export const replyButton = document.createElement("div");
replyButton.className = "reply";

const svgElement1 = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "svg"
);
svgElement1.setAttribute("width", "800px");
svgElement1.setAttribute("height", "800px");
svgElement1.setAttribute("viewBox", "0 0 24 24");
svgElement1.setAttribute("fill", "none");

const gElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
gElement.setAttribute("id", "Arrow / Arrow_Undo_Up_Left");

const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
path.setAttribute("id", "Vector");
path.setAttribute(
  "d",
  "M7 13L3 9M3 9L7 5M3 9H16C18.7614 9 21 11.2386 21 14C21 16.7614 18.7614 19 16 19H11"
);
path.setAttribute("stroke-linecap", "round");
path.setAttribute("stroke-linejoin", "round");

gElement.appendChild(path);
svgElement1.appendChild(gElement);

const replySpan = document.createElement("span");
replySpan.textContent = "Reply";

replyButton.appendChild(svgElement1);
replyButton.appendChild(replySpan);

// Now, replyDiv is an element that can be appended to the DOM wherever you need it.
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

export const replyWindow = document.createElement("div");
replyWindow.className = "reply-window";

const h2 = document.createElement("h2");
h2.textContent = "Reply";

const cancelDiv = document.createElement("div");
cancelDiv.className = "cancel";

const svgElement2 = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "svg"
);
svgElement2.setAttribute("width", "800px");
svgElement2.setAttribute("height", "800px");
svgElement2.setAttribute("viewBox", "0 0 32 32");

const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
gElement.setAttribute("id", "cross");

const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
line1.setAttribute("class", "cls-1");
line1.setAttribute("x1", "7");
line1.setAttribute("x2", "25");
line1.setAttribute("y1", "7");
line1.setAttribute("y2", "25");

const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
line2.setAttribute("class", "cls-1");
line2.setAttribute("x1", "7");
line2.setAttribute("x2", "25");
line2.setAttribute("y1", "25");
line2.setAttribute("y2", "7");

gElement.appendChild(line1);
gElement.appendChild(line2);
svgElement2.appendChild(gElement);

const cancelSpan = document.createElement("span");
cancelSpan.textContent = "Cancel";

cancelDiv.appendChild(svgElement2);
cancelDiv.appendChild(cancelSpan);

const form = document.createElement("form");
form.action = "#";
form.method = "post";
form.className = "comment-form";

const nameInput = document.createElement("input");
nameInput.type = "name";
nameInput.name = "name";
nameInput.id = "name";
nameInput.required = "required";
nameInput.maxLength = "25";

const nameSpan = document.createElement("span");
nameSpan.textContent = "Name";

const titleInput = document.createElement("input");
titleInput.type = "text";
titleInput.name = "title";
titleInput.id = "title";
titleInput.required = "required";
titleInput.maxLength = "40";

const titleSpan = document.createElement("span");
titleSpan.textContent = "Title";

const contentTextarea = document.createElement("textarea");
contentTextarea.name = "content";
contentTextarea.id = "content";
contentTextarea.required = "required";
contentTextarea.rows = "5";
contentTextarea.maxLength = "2000";

const contentSpan = document.createElement("span");
contentSpan.textContent = "Body";

const submitInput = document.createElement("input");
submitInput.type = "submit";
submitInput.id = "submit";
submitInput.value = "Submit";

form.appendChild(nameInput);
form.appendChild(nameSpan);
form.appendChild(titleInput);
form.appendChild(titleSpan);
form.appendChild(contentTextarea);
form.appendChild(contentSpan);
form.appendChild(submitInput);

replyWindow.appendChild(h2);
replyWindow.appendChild(cancelDiv);
replyWindow.appendChild(form);

// Now, replyWindowDiv is an element that can be appended to the DOM wherever you need it.
