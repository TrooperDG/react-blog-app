import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // login  user directly
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      if (error.code === 409) return error.code;
      console.log("Appwrite service :: createAccount :: error ", error);
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      console.log("Appwrite service :: login :: error ", error);
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      // console.log("Appwrite service :: getCurrentUser :: error ", error);
      // console.log("Guest");
      if (error.code === 401) {
        console.log("User is not logged in.");
      } else {
        console.error("Error checking login status:", error);
      }
    }
    return null;
  }

  async logout() {
    try {
      const result = await this.account.deleteSessions();
      return result;
    } catch (error) {
      console.log("Appwrite service :: logout :: error ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
