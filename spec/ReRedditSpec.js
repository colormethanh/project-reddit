import {SocialMedia, Post, Comment} from "../MyClasses.js";

describe("Social media exists", () => {
  let ReReddit;

  beforeEach(() => {
    ReReddit = new SocialMedia();
  });

  it("Is of type object", () => {
    expect(typeof(ReReddit)).toEqual("object");
  });

})

describe("SocialMedia.getPost(id)", () => {
  let ReReddit;

  beforeEach(() => {
    ReReddit = new SocialMedia();
  });

  it("retrieves the correct post", () => {
    const myPost = ReReddit.addPost({author:"Thanh", text: "Gyat, This is a post for testing!"});
    const myPostId = myPost.getId();
    expect(ReReddit.getPost(myPostId)).toEqual(myPost);
  });
  
})

describe("SocialMedia.addPost()", () => {
  let ReReddit;

  beforeEach(() => {
    ReReddit = new SocialMedia();
  });

  it("Adds a post to posts array", () => {
    ReReddit.addPost("Thanh", "Gyat, This is a post for testing!");
    expect(ReReddit.getPosts().length).toEqual(1);
  });

  it("Added array post is equal to created post", () => {
    const myPost = ReReddit.addPost("Thanh", "Gyat, This is a post for testing!");
    expect(ReReddit.getPosts()[0]).toEqual(myPost);
  });
});

describe("SocialMedia.deletePost(id)", () =>{
  let ReReddit;
  let post;
  beforeEach(() => {
    ReReddit = new SocialMedia();
    post = ReReddit.addPost("Thanh", "This is a post used for testing!")
  });

  it("Contains the new post in it's posts array", () => {
    expect(ReReddit.getPosts()[0]).toEqual(post);
  })

  it("posts array no longer contains posts after delete", () => {
    ReReddit.deletePost(post.getId());
    expect(ReReddit.getPosts().length).toEqual(0);
  })

  it("posts array length is reduced by one after delete", () => {
    const newPost = ReReddit.addPost("Sophia", "Sophia make a post to test!");
    ReReddit.deletePost(newPost.getId());

    expect(ReReddit.getPosts().length).toEqual(1);
  })

})

describe("Post Exists", () => {
  let myPost;
  beforeEach(() => {
    myPost = new Post("Thanh", "This is a post used for testing!");
  });

  it("Is of type object", () => {
    expect(typeof(myPost)).toEqual("object");
  })

  it("Can get printable version of post", () => {
    expect(myPost.getPost()).toEqual("Thanh\nThis is a post used for testing!");
  })

  it("Can retrieve author", () => {
    expect(myPost.getAuthor()).toEqual("Thanh");
  })

  it("can retrieve text", () => {
    expect(myPost.getText()).toEqual("This is a post used for testing!");
  })

});

describe("Post.addComment(author, text)", () => {
  let myPost;
  beforeEach(() => {
    myPost = new Post("Thanh", "This is a post used for testing!");
  });

  it("Creates post with correct text and author", () => {
    const comment = myPost.addComment("Sophia", "Sophia is leaving a comment");
    expect(comment.getText()).toEqual("Sophia is leaving a comment");
  });
});

describe("Post.likePost(type)", () => {
  let myPost;
  beforeEach(() => {
    myPost = new Post("Thanh", "This is a post used for testing!");
  });

  it("Has a like count", () => {
    expect(myPost.getLikeCt()).toEqual(0);
  });

  it("Decrements like count on like", () => {
    let likedPost = myPost.likePost("like");
    expect(likedPost.getLikeCt()).toEqual(1);
  });

  it("Decrements like count on dislike", () => {
    let likedPost = myPost.likePost("like");
    likedPost = myPost.likePost("like");
    likedPost = myPost.likePost("dislike");
    expect(likedPost.getLikeCt()).toEqual(1);
  })

});

describe("Post.deleteComment(id)", () =>{
  let ReReddit;
  let post;
  let comment;
  beforeEach(() => {
    ReReddit = new SocialMedia();
    post = ReReddit.addPost("Thanh", "This is a post used for testing!");
    comment = post.addComment("Sophia", "This post is to be deleted")
  });

  it("Post contains the new comment in it's posts array", () => {
    expect(post.getComments()[0]).toEqual(comment);
  })

  it("comments array no longer contains posts after delete", () => {
    post.deleteComment(comment.getId())
    expect(post.getComments().length).toEqual(0);
  })

  it("posts array length is reduced by one after delete", () => {
    const newComment = ReReddit.addPost("Sophia", "Sophia made another post to test!");
    post.deleteComment(newComment.getId());

    expect(post.getComments().length).toEqual(1);
  })

})

describe("Comment exist", () => {
  let myComment;
  let myPost;

  beforeEach(() => {
    myPost = new Post("Thanh", "This is a post used for testing!");
    myComment = new Comment("Sophia", "Sophia is leaving a comment woo!", myPost);
  });

  it("Comment can retrieve author", () => {
    expect(myComment.getAuthor()).toEqual("Sophia");
  });

  it("Comment can retrieve text", () => {
    expect(myComment.getText()).toEqual("Sophia is leaving a comment woo!");
  });
  
  it("Comment can retrieve parent", () => {
    expect(myComment.getParent()).toEqual(myPost);
  });
});

describe("Comment.createCommentReply(author, text)", () => {
  let myComment;
  let myPost;

  beforeEach(() => {
    myPost = new Post("Thanh", "This is a post used for testing!");
    myComment = new Comment("Sophia", "Sophia is leaving a comment woo!", myPost);
  });

  it("Creates new comment object with correct author and text", () => {
    const commentReply = myComment.createCommentReply("Carl", "Your comment was very funny, because it didn't make much sense!", myPost);

    expect(commentReply.getAuthor()).toEqual("Carl");
    expect(commentReply.getText()).toEqual("<strong>@Sophia</strong> Your comment was very funny, because it didn't make much sense!");
    
  });

  it("Creates comment in parent post", () => {
    const commentReply = myComment.createCommentReply("Carl", "Your comment was very funny, because it didn't make much sense!", myPost);
    const parentComments = myPost.getComments();

    const containsCommentReply = parentComments.includes(commentReply);

    expect(containsCommentReply);
  });

  
});