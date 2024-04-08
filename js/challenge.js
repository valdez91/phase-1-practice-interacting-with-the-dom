"use strict";

function Array1(arr) {
  return arrayWithHole(arr) || iterableToArray(arr) || _nonIterableSpread();
}

function arrayWithHole(arr) {
  if (Array.isArray(arr)) return arr;
}

function iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// Example usage:
const playing = true;
const interval = setInterval(() => {
  const counter = document.getElementById("counter");
  const currentCount = parseInt(counter.innerText);
  counter.innerText = currentCount + 1;
}, 1000);

const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const heart = document.getElementById("heart");
const pause = document.getElementById("pause");
const commentForm = document.getElementsByTagName("form")[0];

minus.addEventListener("click", function() {
  const counter = document.getElementById("counter");
  const currentCount = parseInt(counter.innerText);
  counter.innerText = currentCount - 1;
});

plus.addEventListener("click", function() {
  const counter = document.getElementById("counter");
  const currentCount = parseInt(counter.innerText);
  counter.innerText = currentCount + 1;
});

heart.addEventListener("click", function() {
  const counter = document.getElementById("counter");
  const currentCount = parseInt(counter.innerText);
  const likes = document.querySelector(".likes");
  let liked = false;
  for (let i = 0; i < likes.children.length; i++) {
    if (parseInt(likes.children[i].dataset.num) === currentCount) {
      liked = true;
      break;
    }
  }
  if (liked) {
    const likeElement = likes.querySelector('[data-num="' + currentCount + '"]');
    const likesCount = parseInt(likeElement.children[0].innerText);
    likeElement.innerHTML = currentCount + " has been liked <span>" + (likesCount + 1) + " times</span>";
  } else {
    const likeElement = document.createElement("li");
    likeElement.setAttribute("data-num", currentCount);
    likeElement.innerHTML = currentCount + " has been liked <span>1</span> time";
    likes.appendChild(likeElement);
  }
});

pause.addEventListener("click", function() {
  if (playing) {
    playing = false;
    clearInterval(interval);
    this.innerText = "resume";
  } else {
    playing = true;
    interval = setInterval(() => {
      const counter = document.getElementById("counter");
      const currentCount = parseInt(counter.innerText);
      counter.innerText = currentCount + 1;
    }, 1000);
    this.innerText = "pause";
  }
  [].concat(Array1(document.getElementsByTagName("button"))).forEach(function(a) {
    "pause" !== a.id && (a.disabled = !playing);
  });
});

commentForm.addEventListener("submit", function(a) {
  a.preventDefault();
  const commentInput = this.children[0];
  const comment = commentInput.value;
  commentInput.value = "";
  const commentsContainer = document.querySelector(".comments");
  const newComment = document.createElement("p");
  newComment.innerText = comment;
  commentsContainer.appendChild(newComment);
});