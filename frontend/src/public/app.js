function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function get(route) {
  let result = await fetch(route);
  return result.json;
}

let main = document.getElementById("body");

let title = document.createElement("h1");
title.id = "title";
get("127.0.0.1:8000").then(function send_response(response) {
  title.innerHTML = response;
});

title.addEventListener('click', async () => {
  title.animate(
    [
      {
        // from
        opacity: 1,
        color: "#000",
      },
      {
        // to
        opacity: 0,
        color: "#fff",
      },
    ],
    2000,
  );
  await sleep(2000).then(() => {
    title.remove()
  });
});

main.appendChild(title);
