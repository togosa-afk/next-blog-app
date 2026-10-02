ALTER TABLE "reading_list" DROP CONSTRAINT "reading_list_blog_id_unique";--> statement-breakpoint
ALTER TABLE "reading_list" ADD COLUMN "read" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "reading_list_user_blog_unique" ON "reading_list" USING btree ("user_id","blog_id");