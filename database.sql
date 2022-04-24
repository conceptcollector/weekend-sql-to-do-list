CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (250),
	"completeStatus" BOOLEAN DEFAULT false
);