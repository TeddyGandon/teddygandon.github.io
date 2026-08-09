const today = new Date().toISOString().slice(0, 10);

export const flags = {
  displayAllArticles: false, // Only for local env
  displayCertifications: today >= '2026-10-01', // Will get the certifications at this date
  displayArticlesTags: today >= '2026-09-14', // Display at the third article
  displayChangingTheme: true,
};

// Object.keys(flags).forEach((k) => flags[k] = true); // Activate all
