CREATE TABLE `guestbook_stats` (
	`id` integer PRIMARY KEY NOT NULL,
	`visible` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `guestbook_visible_timestamp` ON `guestbook` (`timestamp`) WHERE NOT "isSpam";--> statement-breakpoint
CREATE INDEX `guestbook_ip_timestamp` ON `guestbook` (`ip`,`timestamp`);--> statement-breakpoint
CREATE TRIGGER `guestbook_stats_insert` AFTER INSERT ON `guestbook` BEGIN
	UPDATE `guestbook_stats` SET `visible` = `visible` + IFNULL(NOT NEW.`isSpam`, 0) WHERE `id` = 1;
END;
--> statement-breakpoint
CREATE TRIGGER `guestbook_stats_update` AFTER UPDATE OF `isSpam` ON `guestbook` BEGIN
	UPDATE `guestbook_stats` SET `visible` = `visible` + IFNULL(NOT NEW.`isSpam`, 0) - IFNULL(NOT OLD.`isSpam`, 0) WHERE `id` = 1;
END;
--> statement-breakpoint
CREATE TRIGGER `guestbook_stats_delete` AFTER DELETE ON `guestbook` BEGIN
	UPDATE `guestbook_stats` SET `visible` = `visible` - IFNULL(NOT OLD.`isSpam`, 0) WHERE `id` = 1;
END;
--> statement-breakpoint
INSERT INTO `guestbook_stats` (`id`, `visible`) SELECT 1, count(*) FROM `guestbook` WHERE NOT `isSpam`;
