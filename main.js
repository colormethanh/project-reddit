import {SocialMedia} from "../MyClasses.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let ReReddit;

$(document).ready(() => {
  console.log("Document Ready");
  ReReddit = new SocialMedia();

  const createPostIconSection = function() {
    const postIconSection = $("<div />", {
      "class": "post-icon-container d-flex flex-column me-2"
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

  const createPostOptionsRow = function(likeCt, formId, isComment = false) {
    const postOptions = $("<div />", {
      "class": "row post-options justify-content-start",
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
      html: `${isComment? "Reply" : "Comment"}`,
      "class": "btn btn-secondary comment-btn me-3"
    })
    commentPostBtn.attr("aria-label", "Add Comment Button");
    commentPostBtn.data("for-form", formId);
    
    const deleteBtn = $("<a />", {
      "class": `${isComment ? "comment-delete" : "post-delete"}`,
      html: `Delete`
    });
    deleteBtn.attr("type", "button")
    deleteBtn.attr("data-bs-toggle", "modal");
    deleteBtn.attr("data-bs-target", "#confirmationModal");
    
    commentPostBtn.appendTo(postCommentContainer);
    deleteBtn.appendTo(postCommentContainer);
    
    postLikeBtnsContainer.appendTo(postOptions);
    postCommentContainer.appendTo(postOptions);

    return postOptions
  };

  const createPostContentsSection = function(author, text, likeCt, formId, isComment = false) {
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

    const postOptions = createPostOptionsRow(likeCt, formId, isComment);

    postHeader.appendTo(postContents);
    postText.appendTo(postContents);
    postOptions.appendTo(postContents);
    return postContents;
  };
  
  const createPostElement = function(post) {
    const postAuthor = post.getAuthor();
    const postText = post.getText();
    const likeCt = post.getLikeCt();
    const formId = uuidv4();
    
    const postElement =  $("<div />", {
      "class": "row justify-content-center align-items-start g-2 mb-3 post",
    });
    postElement.data("post-type", "post");
    postElement.data("post-id", post.getId());

    const postParent = $("<div />", {
      "class": "post-parent d-flex justify-content-start col-sm-12 m-0"
    });

    const postIconSection = createPostIconSection();
    postIconSection.appendTo(postParent);
    
    const postContents = createPostContentsSection(postAuthor, postText, likeCt, formId);
    postContents.appendTo(postParent);

    const postCommentForm = createPostCommentForm(formId);
  
    const commentSection = createCommentSection(post);

    postParent.appendTo(postElement);
    postCommentForm.appendTo(postElement);
    commentSection.appendTo(postElement);
    
    return postElement;
  };

  const createPostCommentForm = function(formId, isCommentReplyForm = false) {
    const commentFormContainer = $("<div />", {
      "class": "col-sm-12 d-flex justify-content-center comment-form-container hidden"
    });
    commentFormContainer.attr("id", formId);

    const formColumn = $("<div />", {
      "class": "col-11"
    });

    const form = $("<form />", {
      "class": `form w-75 ${isCommentReplyForm ? 'comment-reply-form' : 'comment-form'}`
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
      html:`${isCommentReplyForm ? "Post reply" : "Post comment"}`
    });

    nameInput.appendTo(form);
    textInput.appendTo(form);
    submitButton.appendTo(form);
    
    form.appendTo(formColumn);

    formColumn.appendTo(commentFormContainer);

    return commentFormContainer;
  };

  const createCommentElement = function(comment, post) {
    const commentAuthor = comment.getAuthor();
    const commentText = comment.getText();
    const likeCt = comment.getLikeCt();
    const formId = uuidv4();

    const commentElement =  $("<div />", {
      "class": "row justify-content-center align-items-start g-2 mb-3 comment",
    });
    commentElement.data("post-type", "comment")
    commentElement.data("post-id", comment.getId());

    const commentParent = $("<div />", {
      "class": "post-parent d-flex justify-content-start col-sm-12 m-0"
    });

    const postIconSection = createPostIconSection();
    postIconSection.appendTo(commentParent);
    
    const postContents = createPostContentsSection(commentAuthor, commentText, likeCt, formId, true);
    postContents.appendTo(commentParent);

    const commentReplyForm = createPostCommentForm(formId, true);

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
    };
    
    const commentElementsContainer = $("<div />", {
      "class": "row justify-content-end comments-container"
    });

    const commentElementsContainerInner = $("<div />", {
      "class": "col-11 comments-container-inner"
    });

    commentsArray.forEach((comment) => {
      const commentElement = createCommentElement(comment, post);
      commentElement.appendTo(commentElementsContainerInner);
    });
    
    commentElementsContainerInner.appendTo(commentElementsContainer);
    commentElementsContainer.appendTo(commentSectionContainer);

    return commentSectionContainer;
  }

  const addPostToPage = function(element) {
    element.appendTo("#posts-inner");
  };

  const removeAllPostElements = function() {
    $("#posts-inner").empty();
    return console.log("Posts have been cleared");
  };

  const populatePosts = function() {
    removeAllPostElements();

    const postArray = ReReddit.getPosts()
    postArray.forEach(post => {
      const postElement = createPostElement(post);
      addPostToPage(postElement);
    });
    console.log("Posts have been populated to DOM");
    initPostElementEventHandlers();
  };
  
  const handlePostLike = function(postId, type) {
    const post = ReReddit.getPost(postId);
    post.likePost(type);
  };

  const handleCommentLike = function(commentId, type, parentPostId) {
    const parentPost = ReReddit.getPost(parentPostId);
    const comment = parentPost.getComment(commentId);
    comment.likePost(type);
  };

  const handleDeletePost = function(postId) {
    ReReddit.deletePost(postId);
    console.log("Post has been deleted");
    populatePosts();
  };

  const handleDeleteComment = function(commentId, parentPost) {
    parentPost.deleteComment(commentId);
    console.log("Comment has been deleted");
    populatePosts();
  };

  const handlePostSubmission = function(nameInput, textInput) {
    if (nameInput.value === "" || textInput.value === "") {
      alert("Please make sure both fields are filled out");
      return $(nameInput).trigger("focus");
    }
    ReReddit.addPost(nameInput.value, textInput.value);
    console.log("Post has submitted");
  };

  /**
   * Because jquery removes event handlers when using $().empty()
   * we have to repopulate the event handlers for the posts
   */
  const initPostElementEventHandlers = function () {
    // like/dislike button 
    $(".like-btn").click((event) => {
      console.log("like button clicked");
      const likeType = event.currentTarget.dataset["type"];
      const postId = $(event.currentTarget).closest(".post-parent").parent().data("post-id");
      const postType = $(event.currentTarget).closest(".post-parent").parent().data("post-type");

      switch (postType) {
        case "post":
          handlePostLike(postId, likeType);
          break;
        case "comment":
          const parentPostId = $(event.currentTarget).closest(".post").data("post-id");
          console.log($(event.currentTarget).closest(".post"));
          handleCommentLike(postId, likeType, parentPostId);
          break;
      }
      populatePosts();
    });

    // Comment form toggle button 
    $(".comment-btn").click((event) => {
      console.log("comment button clicked");
      const commentFormId = $(event.target).data("for-form");
      const form = $(`#${commentFormId}`);
      form.toggleClass("hidden")
    });
    
    // Submit comment 
    $(".comment-form").on("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const nameInput = form.children[0].children[0];
      const textInput = form.children[1].children[0];
      if (nameInput.value === "" || textInput.value === "") {
        alert("Please make sure both fields are filled out")
        return $(nameInput).trigger("focus");
      }
      const parentPostId = $(form).closest(".post").data("post-id");
      const parentPost = ReReddit.getPost(parentPostId);
      parentPost.addComment(nameInput.value, textInput.value);
      console.log("Comment submitted");
      nameInput.value = "";
      textInput.value = "";
      populatePosts();
    });

    // Submit reply to comment
    $(".comment-reply-form").on("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const nameInput = form.children[0].children[0];
      const textInput = form.children[1].children[0];
      if (nameInput.value === "" || textInput.value === "") {
        alert("Please make sure both fields are filled out");
        return $(nameInput).trigger("focus");
      };
      const commentToReplyToId = $(form).closest(".comment").data("postId");
      const parentPostId = $(form).closest(".post").data("postId");

      const commentToReplyTo = ReReddit.getPost(parentPostId).getComment(commentToReplyToId);

      commentToReplyTo.createCommentReply(nameInput.value, textInput.value);
      console.log("Comment submitted");
      nameInput.value = "";
      textInput.value = "";
      populatePosts();
    });

    // Delete Post
    $(".post-delete").on("click", (event) => {
      const modal = $("#confirmationModal");
      const modalBody = modal.find(".modal-body");
      modalBody.empty();
      const postId = $(event.currentTarget).closest(".post").data("postId");

      const postAuthor = ReReddit.getPost(postId).getAuthor();
      const postText = ReReddit.getPost(postId).getText();

      const confirmationText = $("<p />", {
        html: `<h3>You're about to delete...</h3>
        <p><strong>Author:</strong> ${postAuthor}</p> <p><strong>Text:</strong> ${postText}</p>
        <p><strong>Id:</strong> ${postId}</p>`
      });
      confirmationText.appendTo(modalBody);

      const confirmDeleteBtn = $("#confirm-delete")
      
      confirmDeleteBtn.on("click", (event) => {
        handleDeletePost(postId);
  
        $("#confirmationModal #modal-close").click();
      });

      console.log("post delete btn clicked");
    });

    // Delete Comment
    $(".comment-delete").on("click", (event) => {
      const modal = $("#confirmationModal");
      const modalBody = modal.find(".modal-body");
      modalBody.empty();
      const commentElement = $(event.currentTarget).closest(".post-parent").parent();
      const commentId = $(commentElement).data("postId");
      
      const parentPostElement = $(commentElement).closest(".post");
      const parentPostId = $(parentPostElement).data("postId");
      const parentPost = ReReddit.getPost(parentPostId);

      const comment = parentPost.getComment(commentId)
      
      const commentAuthor = comment.getAuthor();
      const commentText = comment.getText();
      
      const confirmationText = $("<p />", {
        html: `<h3>You're about to delete...</h3>
        <p><strong>Author:</strong> ${commentAuthor}</p> <p><strong>Text:</strong> ${commentText}</p>
        <p><strong>Id:</strong> ${commentId}</p>`
      });
      confirmationText.appendTo(modalBody);

      const confirmDeleteBtn = $("#confirm-delete")
      
      confirmDeleteBtn.on("click", (event) => {
        handleDeleteComment(commentId, parentPost);
  
        $("#confirmationModal #modal-close").click();
      });

    });
  };

  // Submit Post Event Handler
  $("#create-post-form").on("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = form.children[0].children[0];
    const textInput = form.children[1].children[0];
    handlePostSubmission(nameInput, textInput);
    populatePosts();
    nameInput.value = "";
    textInput.value = "";
  });

  // Pre-populate posts container with posts
  const initPage = function() {
    const post1 = ReReddit.addPost("ColorMeThanh", "Gyat! this is a post used for testing.");
    const post2 = ReReddit.addPost("Sophia", "This is sophia writing a post for testing as well.");
    const comment1 = post1.addComment("Paul", "Commenting on a post for testing")
    const comment2 = post1.addComment("Melanie", "I am also commenting on a post for testing")
    populatePosts();
  };
  initPage();
})
