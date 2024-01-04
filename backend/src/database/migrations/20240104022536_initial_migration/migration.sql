-- CreateTable
CREATE TABLE "chatroom" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "chatroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chatroomuser" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "chatroom_id" INTEGER NOT NULL,

    CONSTRAINT "chatroomuser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "chatroom_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "chatroomuser_id" INTEGER NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chatroomuser" ADD CONSTRAINT "chatroomuser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatroomuser" ADD CONSTRAINT "chatroomuser_chatroom_id_fkey" FOREIGN KEY ("chatroom_id") REFERENCES "chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatroom_id_fkey" FOREIGN KEY ("chatroom_id") REFERENCES "chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatroomuser_id_fkey" FOREIGN KEY ("chatroomuser_id") REFERENCES "chatroomuser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
