// javascript for index.html
const continer = document.querySelector(".blogs");
const serchForm = document.querySelector(".search");

const renderPosts = async (term) => {
  let url = "http://localhost:3000/posts?_sort=likes&_order=desc ";
  if (term) {
    url += "&q=${term}";
  }
  const res = await fetch(url);
  const posts = await res.json();
  console.log(posts);
  let template = "";
  posts.forEach((post) => {
    template += `
    <div class="post">
    <h2>${post.title}</h2>
    <p><small>${post.likes}likes</small></p>
    <p>${post.body.slice(0, 200)}</p>
    <a href="/details.html?id=${post.id}">read more...</a>
    </div>`;
  });
  continer.innerHTML = template;
};
serchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  renderPosts(serchForm.term.value.trim());
});

window.addEventListener("DOMContentLoaded", (e) => renderPosts());
