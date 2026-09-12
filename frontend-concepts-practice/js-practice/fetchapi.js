let url = "https://jsonplaceholder.typicode.com/posts";

fetch(url + "/1")
  .then((res) => {
    if (!res.ok) throw new Error(res.status);
    return res.json();
  })
  .then((d) => console.log(d.id, d.title))
  .catch((err) => console.error(err));

async function getPost(id) {
  try {
    let res = await fetch(`${url}/${id}`);
    if (!res.ok) throw new Error(res.status);
    let d = await res.json();
    console.log(d);
  } catch (e) {
    console.error(e);
  }
}

async function createPost(t, b, u) {
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: t, body: b, userId: u })
    });
    let d = await res.json();
    console.log("created:", d);
  } catch (e) {
    console.error(e);
  }
}

getPost(2);
createPost("foo", "bar", 1);