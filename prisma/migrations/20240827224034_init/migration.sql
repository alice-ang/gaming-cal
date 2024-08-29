-- CreateTable
CREATE TABLE "BookedDates" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "percentage" INTEGER NOT NULL,

    CONSTRAINT "BookedDates_pkey" PRIMARY KEY ("id")
);
