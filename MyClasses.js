
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export class SocialMedia {
  #posts;
  constructor() {
    this.#posts = [];
  }

  setPost(postArray) {
    this.#posts = postArray;
  }
  
  createPost(author, text) { return new Post(author, text) };

  addPost(author, text){
    const newPost = this.createPost(author, text);
    this.#posts.push(newPost)
    return newPost;
  };

  getPosts(){ return this.#posts };

  getPost(id){
    const post = this.#posts.find((post) => {
      return post.getId() === id; 
    }) 
    return post;
  };

  deletePost(id) {
    const postToDelete = this.getPost(id);
    const newPostArray = [];
    this.#posts.forEach((post) => {
      if (post !== postToDelete ) return newPostArray.push(post);
    });
    this.setPost(newPostArray);
  };
  // TODO: editPost, createPostElement, renderPostElements
}

export class Post {
  #author;
  #text;
  #comments;
  #id;
  #likes;
  constructor(author, text) {
    this.#author = author;
    this.#text = text;
    this.#comments = [];
    this.#likes = 0;
    this.#id = uuidv4();
  }

  getId() {return this.#id};

  getPost() {return `${this.#author}\n${this.#text}`};

  getText() {return this.#text};

  getAuthor() {return this.#author};

  getComments() {return this.#comments};

  getLikeCt() {return this.#likes};

  likePost(type) {

    switch (type) {
      case "like" :
        this.#likes += 1;
        break;
      case "dislike": 
        this.#likes -= 1;
        break;
    }

    return this;
  }

  createComment(author, text) {
    return new Comment(author, text, this);
  };

  addComment(author, text){
    const comment = this.createComment(author, text);
    this.#comments.push(comment);
    return comment; 
  };

}


export class Comment extends Post {
  #author;
  #text;
  #parentPost;
  #likes;
  constructor(author, text, parentPost) {
    super(author, text);
    this.#author = author;
    this.#text = text;
    this.#likes = 0;
    this.#parentPost = parentPost;
  }

  getParent() {return this.#parentPost};

  createCommentReply(otherCommentAuthor, reply) {
    const replyPrefix = `@${otherCommentAuthor} `;

    const replyText = replyPrefix + reply;
    const newComment = this.#parentPost.addComment(this.#author, replyText);

    return newComment;
  };
}




