const updateBlog = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#update-title").value.trim();
    const content = document.querySelector("#update-content").value.trim();
    const blogID = document.querySelector("#hidden").className;
    if (title && content) {
        const res = await fetch(`/api/update/${blogID}`, {
            method: "PUT",
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
            document.location.replace('/profile');
        } else {
            alert(res.statusText);
        }
    }
}

const deleteBlog = async (event) => {
    event.preventDefault();
    const blogID = document.querySelector("#hidden").className;

    const res = await fetch (`/api/update/${blogID}`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    }).then(document.location.replace('/profile'))
}
document.querySelector('#deleteBtn').addEventListener('click', deleteBlog)
document.querySelector('#update-blog-input').addEventListener('submit', updateBlog)
