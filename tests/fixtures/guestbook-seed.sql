INSERT OR IGNORE INTO guestbook (id, content, author, url, timestamp, theme, isSpam, ip) VALUES
  (1, 'Hello from the test seed!', 'Tester', 'https://example.com', '2026-01-01 12:00:00', 1, 0, NULL),
  (2, 'A second note.', 'Another Tester', NULL, '2026-01-02 12:00:00', 2, 0, NULL),
  (3, 'Spam that should stay hidden <a href', 'Spammer', NULL, '2026-01-03 12:00:00', 3, 1, NULL);
