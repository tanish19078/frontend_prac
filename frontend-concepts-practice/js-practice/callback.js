function add(a, b, cb) {
  let res = a + b;
  cb(res);
}

add(5, 10, function (v) {
  console.log("sum:", v);
});

function step(n, d, cb) {
  setTimeout(() => {
    console.log(n);
    cb(null, n + " done");
  }, d);
}

step("step 1", 300, (err, r1) => {
  if (err) return console.error(err);
  console.log(r1);
  step("step 2", 300, (err, r2) => {
    if (err) return console.error(err);
    console.log(r2);
    step("step 3", 300, (err, r3) => {
      if (err) return console.error(err);
      console.log(r3);
    });
  });
});

let arr = [1, 2, 3, 4];
function myMap(a, cb) {
  let out = [];
  for (let i = 0; i < a.length; i++) {
    out.push(cb(a[i], i));
  }
  return out;
}

let dbl = myMap(arr, (x) => x * 2);
console.log(dbl);
