import config from "../config/config";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  //! Post services ...

  //* here we are using slug as the unique Id:
  async createPost({ title, content, featuredImage, status, userId }) {
    try {
      const createdPost = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteArticlesCollectionId,
        ID.unique(),
        {
          title,
          content,
          userId,
          status,
          featuredImage,
        }
      );
      return createdPost;
    } catch (error) {
      console.log("Appwrite service :: createPost :: error ", error);
    }
  }

  async updatePost(postId, data) {
    try {
      const updatedPost = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteArticlesCollectionId,
        postId,
        {
          ...data,
        }
      );
      return updatedPost;
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error ", error);
    }
  }

  async deletePost(postId) {
    try {
      const deletedPost = await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteArticlesCollectionId,
        postId
      );
      return deletedPost;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error ", error);
    }
  }

  async getPost(postId, queries = []) {
    try {
      const post = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteArticlesCollectionId,
        postId,
        queries
      );
      if (post) return post;
    } catch (error) {
      console.log("Appwrite service :: getPost :: error ", error);
    }
    return null;
  }

  async getPosts(queries = [Query.equal("status", ["active"])]) {
    try {
      const posts = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteArticlesCollectionId,
        queries
      );
      return posts;
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error ", error);
      return false;
    }
  }

  async getAllPosts() {
    try {
      const postList = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteArticlesCollectionId
      );
      return postList;
    } catch (error) {
      console.log("Appwrite service :: getAllPosts :: error ", error);
      return false;
    }
  }

  //!userInfo services...
  async createUser({
    username,
    avatar,
    userId,
    bio,
    myPosts,
    likedPosts = [],
    commentIds = [],
    DOB,
    userEmail,
    address,
    phone,
  }) {
    try {
      const createduser = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        userId,
        {
          username,
          avatar,
          userId,
          bio,
          myPosts,
          likedPosts,
          commentIds,
          DOB,
          userEmail,
          address,
          phone,
        }
      );
      return createduser;
    } catch (error) {
      console.log("Appwrite service :: createUser :: error ", error);
    }
  }

  async updateUser(
    userId,
    {
      username,
      avatar,
      bio,
      myPosts,
      likedPosts = [],
      commentIds = [],
      DOB,
      address,
      phone,
    }
  ) {
    try {
      const updatedUser = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        userId,
        {
          username,
          avatar,
          bio,
          myPosts,
          likedPosts,
          commentIds,
          DOB,
          address,
          phone,
        }
      );
      return updatedUser;
    } catch (error) {
      console.log("Appwrite service :: updateUser :: error ", error);
    }
  }

  async getUser(userId, queries = []) {
    try {
      const user = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        userId,
        queries
      );
      if (user) return user;
    } catch (error) {
      console.log("Appwrite service :: getUser :: error ", error);
    }
    return null;
  }

  //! file services ...

  async uploadFile(file) {
    try {
      const result = await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      return result;
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error ", error);
    }
  }
  async deleteFile(fileId) {
    try {
      const result = await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId
      );
      return result;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error ", error);
    }
  }

  getFilePreview(fileId) {
    try {
      const result = this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
      );
      return result;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error ", error);
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
