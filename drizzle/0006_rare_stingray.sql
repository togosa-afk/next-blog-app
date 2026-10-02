ALTER TABLE "reading_list" ALTER COLUMN "user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "reading_list" ALTER COLUMN "blog_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "reading_list" ADD CONSTRAINT "reading_list_blog_id_unique" UNIQUE("blog_id");