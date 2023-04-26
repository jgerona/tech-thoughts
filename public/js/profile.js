const postBtn = document.getElementById("postBtn");

const promptNewBlog = (event) => {
    event.preventDefault();
    // document.getElementById("blog-input").style.visibility = "visible";
    document.getElementById("blog-input").style.display = "block"
}

const postBlog = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#blog-title").value.trim();
    const content = document.querySelector("#blog-content").value.trim();

    if (title && content) {
        const res = await fetch("/api/blogs/", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
            document.location.replace('/profile');
        } else {
            alert(res.statusText);
        }
    }
};
postBtn.addEventListener("click", promptNewBlog);
document.querySelector('#blog-input').addEventListener('submit', postBlog)