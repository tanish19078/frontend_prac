function task(n, d, fail = false) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (fail) rej("err at " + n);
      else res("done " + n);
    }, d);
  });
}

task(1, 300)
  .then((r) => {
    console.log(r);
    return task(2, 300);
  })
  .then((r) => {
    console.log(r);
    return task(3, 300);
  })
  .then((r) => {
    console.log(r);
  })
  .catch((err) => {
    console.error(err);
  });

let p1 = task("a", 200);
let p2 = task("b", 400);

Promise.all([p1, p2])
  .then((v) => console.log("all:", v))
  .catch((e) => console.error("all err:", e));

async function run() {
  try {
    let r1 = await task("async1", 200);
    console.log(r1);
    let r2 = await task("async2", 200);
    console.log(r2);
  } catch (e) {
    console.error(e);
  } finally {
    console.log("complete");
  }
}

run();
