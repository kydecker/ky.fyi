export const sortFeaturedFirst = <
  T extends { year: number; featured?: boolean },
>(
  a: T,
  b: T,
) => Number(!!b.featured) - Number(!!a.featured) || b.year - a.year;
