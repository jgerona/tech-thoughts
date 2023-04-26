const newComment = async(event) => {
    event.preventDefault();
    const content = document.querySelector("#new-comment").value.trim(); 
    const blog_id = document.querySelector(".blogID").id;
    const user_id = document.querySelector(".userID").id;
    console.log(user_id)
    if (!user_id) {
        //console.log("HELLO")
        document.location.replace('/login');
      } 
    if(content) {
        const res = await fetch(`/blog/${blog_id}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content,blog_id,user_id})
        });
        if(res.ok) {
            document.location.replace(`/blog/${blog_id}`);
        } else {
            alert(res.statusText);
            document.location.replace('/login')
        }
    }
}

document.querySelector("#add-comment").addEventListener("submit", newComment);