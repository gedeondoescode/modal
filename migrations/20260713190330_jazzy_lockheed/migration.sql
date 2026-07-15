CREATE TABLE `task` (
	`id` text PRIMARY KEY,
	`title` text DEFAULT 'untitled' NOT NULL,
	`notes` text,
	`creation_date` integer NOT NULL,
	`date_updated` integer
);
