-- CreateEnum
CREATE TYPE "SetType" AS ENUM ('NORMAL', 'WARMUP', 'DROPSET', 'TOPSET', 'BACKOFF', 'ASSISTED', 'SUPERSET');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "routine_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "exercise_count" INTEGER NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("routine_id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "exercise_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "photo_url" TEXT,
    "user_id" INTEGER,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("exercise_id")
);

-- CreateTable
CREATE TABLE "UserExerciseData" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "max_weight" DOUBLE PRECISION,
    "max_volume" DOUBLE PRECISION,
    "pr_set_id" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserExerciseData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "set_id" SERIAL NOT NULL,
    "routine_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "exercise_order" INTEGER NOT NULL,
    "set_order" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "set_type" "SetType" NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "Set_pkey" PRIMARY KEY ("set_id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "workout_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "routine_id" INTEGER,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "total_volume" INTEGER NOT NULL,
    "exercise_count" INTEGER NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("workout_id")
);

-- CreateTable
CREATE TABLE "WorkoutSet" (
    "workout_set_id" SERIAL NOT NULL,
    "workout_id" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "exercise_order" INTEGER NOT NULL,
    "set_order" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "set_type" "SetType" NOT NULL DEFAULT 'NORMAL',

    CONSTRAINT "WorkoutSet_pkey" PRIMARY KEY ("workout_set_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserExerciseData_pr_set_id_key" ON "UserExerciseData"("pr_set_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserExerciseData_user_id_exercise_id_key" ON "UserExerciseData"("user_id", "exercise_id");

-- CreateIndex
CREATE UNIQUE INDEX "Set_routine_id_exercise_id_exercise_order_set_order_key" ON "Set"("routine_id", "exercise_id", "exercise_order", "set_order");

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseData" ADD CONSTRAINT "UserExerciseData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseData" ADD CONSTRAINT "UserExerciseData_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("exercise_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseData" ADD CONSTRAINT "UserExerciseData_pr_set_id_fkey" FOREIGN KEY ("pr_set_id") REFERENCES "WorkoutSet"("workout_set_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "Routine"("routine_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("exercise_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "Routine"("routine_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workout"("workout_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutSet" ADD CONSTRAINT "WorkoutSet_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("exercise_id") ON DELETE RESTRICT ON UPDATE CASCADE;
