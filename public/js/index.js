// Create post
const createPost = async (name, email, comment, blogpostID) => {
  try {
    const res = await axios({
      method: 'POST',
      url:'https://toheeb.herokuapp.com/api/v1/comments',
      data: {
        name,
        email,
        comment,
        postID: 2
      }
    });
    
    if(res.data.status === "success") {
      alert("Comment successful created");
      //showAlert("success", "Comment successful created")
      window.setTimeout(() => {
        location.assign('/escrowme-first-version-release-details.html');
      }, 1500);
      console.log(res);
    }
  } catch (e) {
    if(e.response.data.message.startsWith("E11000")) {
      alert("You can't comment twice on a post");
      //showAlert("error", "You can't comment twice on a post")
      console.log(e);
    }
  }
  
};



//Selection Element
const commentBtn = document.getElementById('comment__form');
const commentContainer = document.querySelector(".comment__section--content");
const commentLength = document.getElementById("comment__length");


// Setup Event Listeners
if(commentBtn) {
  commentBtn.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const comment = document.getElementById("comment").value;
    const blogpostID = parseInt(document.getElementById("blogpostID").value);
    
    createPost(name, email, comment, blogpostID);
  });
}


// Display all Review
const displayComment = async () => {
  
  const res = await axios('https://toheeb.herokuapp.com/api/v1/comments/1');
  
  // DISPLAY PLACEHOLDER TEXT
  if(res.data.result === 0) {
    // html string
    let html = '<div class="nothing__here"><p>Nothing Here</p><p>Be the first to comment</p></div>';
    
    // Inserting into thr DOM
     commentContainer.insertAdjacentHTML("beforeend", html);
  };
  
  // DISPLAY ALL COMMENT
  res.data.data.map(comment => {
    // html string
    let html = '<div class="comment__container"><div class="comment__left"><img class="default__image" src="/img/{{PHOTO}}"></div><div class="comment__right"><p>{{NAME}}</p><p>{{COMMENT}}</p><p>{{DATE}}</p></div></div>'
  
    // Replacing the placeholder string
    let newHtml = html.replace("{{PHOTO}}", comment.photo);
    newHtml = newHtml.replace("{{NAME}}", comment.name);
    newHtml = newHtml.replace("{{EMAIL}}", comment.email);
    newHtml = newHtml.replace("{{COMMENT}}", comment.comment);
    newHtml = newHtml.replace("{{DATE}}", comment.createdAt);
    
    // Inserting into the DOM
    commentContainer.insertAdjacentHTML("beforeend", newHtml)
  });
  
  // Setting Comment length
  commentLength.textContent = `(${res.data.result})`
}

displayComment();

const a = async () => {
console.log("loading");
const res = await axios('https://toheeb.herokuapp.com/api/v1/comments/');
console.log(res);
//console.log(res.data);
}
a();