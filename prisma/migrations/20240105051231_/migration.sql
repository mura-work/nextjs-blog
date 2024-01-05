-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "completedDate" TIMESTAMP(3) NOT NULL,
    "responsibleUserName" TEXT,
    "isDone" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "color" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToTodo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToTodo_AB_unique" ON "_CategoryToTodo"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToTodo_B_index" ON "_CategoryToTodo"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToTodo" ADD CONSTRAINT "_CategoryToTodo_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTodo" ADD CONSTRAINT "_CategoryToTodo_B_fkey" FOREIGN KEY ("B") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
