let k = "user";
let v = "alex";

localStorage.setItem(k, v);
let val = localStorage.getItem(k);
console.log(val);

let obj = { id: 1, name: "item", active: true };
localStorage.setItem("obj", JSON.stringify(obj));

let str = localStorage.getItem("obj");
let parsed = JSON.parse(str);
console.log(parsed.name);

let list = ["apple", "banana", "cherry"];
localStorage.setItem("list", JSON.stringify(list));

let arr = JSON.parse(localStorage.getItem("list")) || [];
arr.push("date");
localStorage.setItem("list", JSON.stringify(arr));
console.log(arr);

localStorage.removeItem(k);
console.log(localStorage.getItem(k));

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}

localStorage.clear();
console.log(localStorage.length);
