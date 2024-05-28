console.log("let's code!")
import {SocialMedia} from "../MyClasses.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
let ReReddit;

$(document).ready(() => {
  console.log("Document Ready");
  ReReddit = new SocialMedia();

  const createPostIconSection = function() {
    const postIconSection = $("<div />", {
      "class": "post-icon-container d-flex flex-column"
    });

    const postIcon = $("<i />", {
      "class": "bi bi-person-circle h1 m-0"
    });

    const postVerticalLine = $("<div />", {
      "class": "vertical-line mx-auto mt-1"
    });

    postIcon.appendTo(postIconSection);
    postVerticalLine.appendTo(postIconSection);

    return postIconSection;
  };

  const createPostOptionsRow = function(likeCt, formId) {
    const postOptions = $("<div />", {
      "class": "row post-options justify-content-between",
    });

    const postLikeBtnsContainer = $("<div />", {
      "class": "col-4 col-sm-3 col-md-2 d-flex"
    });

    const postLikeBtn = $("<button />", {
      type: "button",
      "class": "like-btn bg-like m-1 p-0 d-flex justify-content-center align-items-center",
    });

    postLikeBtn.attr("data-type", "like");
    postLikeBtn.attr("aria-label", "Post Like Button");

    const likePostIcon = $("<i />", {
      "class": "bi bi-hand-thumbs-up-fill"
    });

    const postLikeCounter = $("<div />", {
      "class": "like-counter",
      html: likeCt
    });

    const postDislikeBtn = $("<button />", {
      type: "button",
      "class": "like-btn bg-dislike m-1 p-0 d-flex justify-content-center align-items-center",
    });

    postDislikeBtn.attr("data-type", "dislike");
    postDislikeBtn.attr("aria-label", "Post Dislike Button");

    const dislikePostIcon = $("<i />", {
      "class": "bi bi-hand-thumbs-down-fill"
    });
    
    likePostIcon.appendTo(postLikeBtn);
    dislikePostIcon.appendTo(postDislikeBtn);
    postLikeBtn.appendTo(postLikeBtnsContainer);
    postLikeCounter.appendTo(postLikeBtnsContainer);
    postDislikeBtn.appendTo(postLikeBtnsContainer);
    
    const postCommentContainer = $("<div />", {
      "class": "col-5 col-sm-9 d-flex align-items-center justify-content-start"
    })

    const commentPostBtn = $("<button />", {
      html: "Comment",
      "class": "btn btn-secondary comment-btn"
    })
    commentPostBtn.attr("aria-label", "Add Comment Button")
    commentPostBtn.data("for-form", formId);

    postLikeBtnsContainer.appendTo(postOptions);
    commentPostBtn.appendTo(postCommentContainer);
    postCommentContainer.appendTo(postOptions);

    return postOptions
  };

  const createPostContentsSection = function(author, text, likeCt, formId) {
    const postContents = $("<div />", {
      "class": "col-sm-11 post-contents"
    })

    const postHeader = $("<div />", {
      "class": "row post-header",
      html: `<h3><strong>${author}</strong></h3>`
    })

    const postText = $("<div />", {
      "class": "row post-text",
      html: `<p> ${text} </p>`
    });

    const postOptions = createPostOptionsRow(likeCt, formId);

    postHeader.appendTo(postContents);
    postText.appendTo(postContents);
    postOptions.appendTo(postContents);
    return postContents;
  };

  const createPostCommentForm = function(formId) {
    const commentFormContainer = $("<div />", {
      "class": "col-sm-12 d-flex justify-content-center comment-form-container hidden"
    });
    commentFormContainer.attr("id", formId);

    const separatorColumn = $("<div />", {
      "class": "col-1"
    })

    const formColumn = $("<div />", {
      "class": "col-11"
    });

    const form = $("<form />", {
      "class": "form w-75 comment-form"
    });

    const nameInput = $("<div />", {
      "class": "form-group mb-2",
      html: "<input type='text' class='form-control' placeholder='Name' />"
    }); 

    const textInput = $("<div />", {
      "class": "form-group mb-2",
      html: "<input type='text' class='form-control' placeholder='Post' />"
    });

    const submitButton = $("<button />", {
      "class": "btn btn-primary submit-comment-btn",
      html:"Post Comment"
    });

    nameInput.appendTo(form);
    textInput.appendTo(form);
    submitButton.appendTo(form);
    
    form.appendTo(formColumn);

    separatorColumn.appendTo(commentFormContainer);
    formColumn.appendTo(commentFormContainer);

    return commentFormContainer;
  };

  const createCommentElement = function(comment, post) {
    const commentAuthor = comment.getAuthor();
    const commentText = comment.getText();
    const likeCt = comment.getLikeCt();
    const formId = uuidv4();

    const commentElement =  $("<div />", {
      "class": "row justify-content-center align-items-start g-2 mb-3 post",
    });
    commentElement.data("commentId", comment.getId());

    const commentParent = $("<div />", {
      "class": "post-parent d-flex justify-content-between col-sm-12 m-0"
    });

    const postIconSection = createPostIconSection();
    postIconSection.appendTo(commentParent);
    
    const postContents = createPostContentsSection(commentAuthor, commentText, likeCt, formId);
    postContents.appendTo(commentParent);

    const commentReplyForm = createPostCommentForm(formId);

    commentParent.appendTo(commentElement);
    commentReplyForm.appendTo(commentElement);

    return commentElement;
  };
  
  const createCommentSection = function(post) {
    const commentsArray = post.getComments();

    const commentSectionContainer = $("<div />", {
      "class": "col-12 comments-section-container"
    });

    if (commentsArray.length > 0) {
      const commentSectionHeader = $("<div />", {
        "class": "comments-section-header row justify-content-end",
        html: "<div class='col-11'> <h3> Comments </h3> </div>"
      });
  
      commentSectionHeader.appendTo(commentSectionContainer);
    }
    

    const commentElementsContainer = $("<div />", {
      "class": "row justify-content-end comments-container"
    });

    const commentElementsContainerInner = $("<div />", {
      "class": "col-11 comments-container-inner"
    });


    /**
     * todo: make a loop to create a comment for each comment
     * todo: insert the returned comment into container inner
     */
    commentsArray.forEach((comment) => {
      const commentElement = createCommentElement(comment, post);
      commentElement.appendTo(commentElementsContainerInner);
    })
    
    commentElementsContainerInner.appendTo(commentElementsContainer);
    commentElementsContainer.appendTo(commentSectionContainer);

    return commentSectionContainer;
  }

  const createPostElement = function(post) {
    const postAuthor = post.getAuthor();
    const postText = post.getText();
    const likeCt = post.getLikeCt();
    const formId = uuidv4();
    
    const postElement =  $("<div />", {
      "class": "row justify-content-center align-items-start g-2 mb-3 post",
    });
    postElement.data("postId", post.getId());

    const postParent = $("<div />", {
      "class": "post-parent d-flex justify-content-between col-sm-12 m-0"
    });

    const postIconSection = createPostIconSection();
    postIconSection.appendTo(postParent);
    
    const postContents = createPostContentsSection(postAuthor, postText, likeCt, formId);
    postContents.appendTo(postParent);

    const postCommentForm = createPostCommentForm(formId);
    
    // Todo: add comment section container here and append to post element
    const commentSection = createCommentSection(post);

    postParent.appendTo(postElement);
    postCommentForm.appendTo(postElement);
    commentSection.appendTo(postElement);
    
    return postElement;
  };

  const addPostToPage = function(element) {
    element.appendTo("#posts-inner");
  };

  const removeAllPostElements = function() {
    $("#posts-inner").empty();
    return console.log("Posts have been cleared");
  };

  const initEventHandler = function () {
  // like/dislike button functionality
  $(".like-btn").click((event) => {
    console.log("like button clicked");
    const type = event.currentTarget.dataset.type;
    const postId = $(event.currentTarget).closest(".post-parent").parent().data("postId");
    console.log(`Type is: ${type}`);
    console.log(postId);
  });

  // Comment button functionality
  $(".comment-btn").click((event) => {
    console.log("comment button clicked");
    const commentFormId = $(event.target).data("for-form");
    const form = $(`#${commentFormId}`);
    console.log(form);
    form.toggleClass("hidden")
  });
  
  // Submit Post functionality 
  $("#create-post-form").on("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget
    const nameInput = form.children[0].children[0]
    const textInput = form.children[1].children[0]
    if (nameInput.value === "" || textInput.value === "") {
      alert("Please make sure both fields are filled out")
      return $(nameInput).trigger("focus");
    }
    console.log(nameInput.value)
    console.log(textInput.value)
    console.log("post is submitting");
    ReReddit.addPost(nameInput.value, textInput.value);
    console.log("Post has submitted");
    nameInput.value = ""
    textInput.value = ""
    populatePosts();
  });
  
  // Submit comment functionality
  $(".comment-form").on("submit", (event) => {
    event.preventDefault();
    console.log("Comment form submitted");
  });
  };

  const populatePosts = function() {
    removeAllPostElements();

    const postArray = ReReddit.getPosts()
    postArray.forEach(post => {
      const postElement = createPostElement(post);
      addPostToPage(postElement);
    });

    initEventHandler();
  };

  const initPage = function() {
    const post1 = ReReddit.addPost("ColorMeThanh", "Gyat! this is a post used for testing.");
    const post2 = ReReddit.addPost("Sophia", "This is sophia writing a post for testing as well.");
    const comment1 = post1.addComment("Paul", "Commenting on a post for testing")
    const comment2 = post1.addComment("Melanie", "I am also commenting on a post for testing")
    populatePosts();
  };
  initPage();
  
})
