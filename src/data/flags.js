const today = new Date().toISOString().slice(0, 10);

export const flags = {
  displayAllArticles: false, // Only for local env
  displayCertifications: false,
  displayArticlesTags: false,
  displayChangingTheme: true,
};

// Object.keys(flags).forEach((k) => flags[k] = true); // Activate all
