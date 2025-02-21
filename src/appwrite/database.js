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
  async createPost({ title, content, slug, featuredImage, status, userId }) {
    try {
      const createdPost = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
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

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const updatedPost = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return updatedPost;
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error ", error);
    }
  }

  async deletePost(slug) {
    try {
      const deletedPost = await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return deletedPost;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error ", error);
    }
  }

  async getPost(slug) {
    try {
      const post = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return post;
    } catch (error) {
      console.log("Appwrite service :: getPost :: error ", error);
    }
  }

  async getPosts(queries = [Query.equal("status", ["active"])]) {
    try {
      const posts = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
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
        config.appwriteCollectionId
      );
      return postList;
    } catch (error) {
      console.log("Appwrite service :: getAllPosts :: error ", error);
      return false;
    }
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
