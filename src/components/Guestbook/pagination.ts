const ENTRIES_PER_PAGE = 24;

// The composer takes the first slot on page 1.
export function getPageRange(page: number) {
  return page === 1
    ? { offset: 0, limit: ENTRIES_PER_PAGE - 1 }
    : { offset: (page - 1) * ENTRIES_PER_PAGE - 1, limit: ENTRIES_PER_PAGE };
}

export function getTotalPages(totalEntries: number) {
  return Math.max(1, Math.ceil((totalEntries + 1) / ENTRIES_PER_PAGE));
}

export function getPageUrl(page: number) {
  return page === 1 ? "/guestbook" : `/guestbook?page=${page}`;
}
