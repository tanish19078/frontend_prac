let root = document.getElementById("root") || document.body;

let box = document.createElement("div");
box.className = "box";
box.textContent = "Hello DOM";
box.dataset.id = "42";

box.style.padding = "10px";
box.style.border = "1px solid black";
root.appendChild(box);

let btn = document.createElement("button");
btn.textContent = "Click Me";

let cnt = 0;
btn.addEventListener("click", (e) => {
  cnt++;
  box.textContent = "Clicked " + cnt;
  box.classList.toggle("active");
});

root.appendChild(btn);

let list = document.createElement("ul");
["a", "b", "c"].forEach((item) => {
  let li = document.createElement("li");
  li.textContent = item;
  list.appendChild(li);
});

root.appendChild(list);

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.style.color = "red";
  }
});
