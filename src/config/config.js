const config = {
  appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),

  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),

  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),

  appwriteArticlesCollectionId: String(
    import.meta.env.VITE_APPWRITE_ARTICLES_COLLECTION_ID
  ),
  appwriteUsersCollectionId: String(
    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID
  ),

  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

  tinyMCEAPIKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
};

export default config;
