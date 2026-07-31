import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const IMG_BASE = 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises';

const exercise = (name: string, folder: string, description: string) => ({
  name,
  description,
  photo_url: `${IMG_BASE}/${folder}/0.jpg`,
});

const exercises = [
  // Pecho
  exercise('Press banca', 'Barbell_Bench_Press_-_Medium_Grip', 'Pecho'),
  exercise('Press inclinado con mancuernas', 'Incline_Dumbbell_Press', 'Pecho superior'),
  exercise('Aperturas con mancuernas', 'Dumbbell_Flyes', 'Pecho'),
  exercise('Fondos en paralelas', 'Dips_-_Chest_Version', 'Pecho/Tríceps'),
  exercise('Press de banca con mancuernas', 'Dumbbell_Bench_Press', 'Pecho'),

  // Espalda
  exercise('Peso muerto', 'Barbell_Deadlift', 'Espalda/Piernas'),
  exercise('Dominadas', 'Pullups', 'Espalda'),
  exercise('Remo con barra', 'Bent_Over_Barbell_Row', 'Espalda'),
  exercise('Jalón al pecho', 'Wide-Grip_Lat_Pulldown', 'Espalda'),
  exercise('Remo con mancuerna', 'One-Arm_Dumbbell_Row', 'Espalda'),

  // Piernas
  exercise('Sentadilla', 'Barbell_Squat', 'Piernas'),
  exercise('Prensa de piernas', 'Leg_Press', 'Piernas'),
  exercise('Zancadas', 'Barbell_Lunge', 'Piernas'),
  exercise('Extensión de cuádriceps', 'Leg_Extensions', 'Cuádriceps'),
  exercise('Curl femoral', 'Lying_Leg_Curls', 'Femorales'),
  exercise('Elevación de talones', 'Standing_Calf_Raises', 'Pantorrillas'),

  // Hombros
  exercise('Press militar', 'Barbell_Shoulder_Press', 'Hombros'),
  exercise('Elevaciones laterales', 'Side_Lateral_Raise', 'Hombros'),
  exercise('Elevaciones frontales', 'Front_Dumbbell_Raise', 'Hombros'),
  exercise('Pájaros', 'Bent_Over_Lateral_Raise', 'Deltoides posterior'),

  // Brazos
  exercise('Curl con barra', 'Barbell_Curl', 'Bíceps'),
  exercise('Curl martillo', 'Hammer_Curls', 'Bíceps/Antebrazo'),
  exercise('Press francés', 'Lying_Triceps_Press', 'Tríceps'),
  exercise('Extensión de tríceps en polea', 'Triceps_Pushdown', 'Tríceps'),
  exercise('Curl concentrado', 'Concentration_Curls', 'Bíceps'),

  // Core
  exercise('Plancha', 'Plank', 'Core'),
  exercise('Elevación de piernas', 'Hanging_Leg_Raise', 'Core'),
  exercise('Abdominales en polea', 'Cable_Crunch', 'Core'),
  exercise('Russian twist', 'Russian_Twist', 'Core/Oblicuos'),

  // Full body / funcionales
  exercise('Burpees', 'Burpee', 'Full body'),
  exercise('Kettlebell swing', 'Kettlebell_Swing', 'Full body'),
  exercise('Clean y jerk', 'Clean_and_Jerk', 'Full body'),
];

async function main() {
  console.log(`Cargando ${exercises.length} ejercicios...`);
  await prisma.exercise.createMany({
    data: exercises,
    skipDuplicates: true,
  });
  console.log('Listo.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());