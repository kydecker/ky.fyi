CREATE TABLE `guestbook` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`content` text NOT NULL,
	`author` text NOT NULL,
	`url` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`theme` integer NOT NULL,
	`isSpam` integer,
	`ip` text
);
