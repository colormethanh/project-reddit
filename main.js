console.log("let's code!")
import {SocialMedia} from "../MyClasses.js";
let ReReddit;


$(document).ready(() => {
  console.log("Document Ready");
  ReReddit = new SocialMedia();

  const initPage = function() {
    ReReddit.addPost("ColorMeThanh", "Gyat! this is a post used for testing.");
    ReReddit.addPost("Sophia", "This is sophia writing a post for testing as well.");
    const postArray = ReReddit.getPosts()
    postArray.forEach(post => {
      console.log(post.getPost());
    });
  };
  initPage();

  const createPostElement = function() {
   const newElement =  $("<h1 />", {
      html: "This is a new post",
      "class": "row"
    });

    return newElement;
  };

  const addPostToPage = function(element) {
    element.appendTo("#posts-inner");
  }

  addPostToPage(createPostElement());
  addPostToPage(createPostElement());

  // like/dislike button functionality
  $(".like-btn").click((event) => {
    console.log("like button clicked");
    console.log(`Type is: ${event.currentTarget.dataset.type}`);
  });

  // Comment button functionality
  $(".comment-btn").click(() => {
    console.log("comment button clicked");
  });
  
  // Submit Post functionality 
  $("#create-post-form").on("submit", (event) => {
    event.preventDefault()
    console.log("post has submitted");
  });
  
  // Submit comment functionality
  // why does it submit twice??
  $(".comment-form").on("submit", (event) => {
    event.preventDefault();
    console.log("Comment form submitted");
  });




})
