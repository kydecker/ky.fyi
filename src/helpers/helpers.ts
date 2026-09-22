export const getRandomValueBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

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

export const smartquotes = (str: string) => {
  return str
    .replace(/(^|[-\u2014\s(["])'/g, "$1\u2018") // opening singles
    .replace(/'/g, "\u2019") // closing singles & apostrophes
    .replace(/(^|[-\u2014/[(\u2018\s])"/g, "$1\u201c") // opening doubles
    .replace(/"/g, "\u201d") // closing doubles
    .replace(/--/g, "\u2014") // em-dashes
    .replace(/\.\.\./g, "\u2026"); // ellipses
};

export const sortFeaturedFirst = <
  T extends { year: number; featured?: boolean },
>(
  a: T,
  b: T,
) => Number(!!b.featured) - Number(!!a.featured) || b.year - a.year;
