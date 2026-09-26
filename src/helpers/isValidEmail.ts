export const isValidEmail = (email: string) => {
  // Extremely basic; only for common emails
  // Should not be used to prevent users from submitting an email
  // Only the server can truly validate an email

  // Email must include an @ symbol
  // Domain name must include at least one dot
  // TLD must only consist of letters
  // TLD must be between 2 and 8 characters
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,8}/;
  return email.match(emailRegex);
};
