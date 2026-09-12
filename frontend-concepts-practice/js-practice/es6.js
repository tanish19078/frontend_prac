let arr = [10, 20, 30, 40];
let [a, b, ...rest] = arr;
console.log(a, b, rest);

let obj = { id: 1, name: "item", cat: "tech" };
let { id, name: n, ...props } = obj;
console.log(id, n, props);

let c = [...arr, 50, 60];
console.log(c);

let d = { ...obj, price: 99 };
console.log(d);

let m = arr.map((x) => x * 2);
console.log(m);

let f = arr.filter((x) => x > 20);
console.log(f);

let sum = arr.reduce((acc, x) => acc + x, 0);
console.log(sum);

let fn = (x = 1, y = 2) => x + y;
console.log(fn(5));

let msg = `id: ${id}, name: ${n}`;
console.log(msg);
