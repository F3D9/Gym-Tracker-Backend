# GymTracker — Backend

API REST para GymTracker, una app de seguimiento de rutinas y entrenamientos de gimnasio. Construida con **NestJS** y **Prisma 7** sobre **PostgreSQL**.

## Stack

- **Framework:** NestJS 11
- **ORM:** Prisma 7 (con `@prisma/adapter-pg`)
- **Base de datos:** PostgreSQL (vía Docker en desarrollo)
- **Autenticación:** JWT firmado con `@nestjs/jwt`, transportado en cookie `httpOnly`
- **Validación:** `class-validator` / `class-transformer` (`ValidationPipe` global con `transform: true`)
- **Lenguaje:** TypeScript

## Arquitectura

El proyecto sigue la estructura modular estándar de Nest, con un módulo por entidad de dominio:

```
src/
├── auth/               # Registro, login, logout, guard de JWT
├── users/               # CRUD de usuarios
├── exercises/            # Catálogo de ejercicios
├── routines/             # Rutinas de entrenamiento
├── sets/                 # Series definidas dentro de una rutina
├── workout/               # Entrenamientos (sesiones) realizados por el usuario
├── workoutset/            # Series ejecutadas dentro de un entrenamiento
├── userexercisedata/       # Datos históricos de usuario por ejercicio
├── dtos/                 # Data Transfer Objects compartidos
├── generated/prisma/       # Cliente de Prisma generado (no versionado)
├── app.module.ts
└── main.ts
```

Cada módulo mantiene la separación estándar `controller` / `service` / `module`, con Prisma inyectado como servicio (`PrismaModule`) para el acceso a datos.

## Autenticación

La auth usa JWT guardado en una cookie `httpOnly` llamada `jwt`, en vez de `Authorization: Bearer`. Esto evita exponer el token a JavaScript en el cliente.

- `POST /auth/register` y `POST /auth/login` devuelven el usuario y setean la cookie `jwt` en la respuesta.
- Las rutas protegidas usan `AuthGuard`, que lee `request.cookies.jwt`, lo verifica y adjunta el payload a `request.user`.
- `POST /auth/logout` limpia la cookie.

Como el frontend se sirve desde un dominio distinto (GitHub Pages) al backend (Render), la cookie se configura con `sameSite: 'none'` y `secure: true` para permitir el envío cross-site, y CORS está configurado con `credentials: true` y el/los origin(es) del frontend explícitos (no se puede usar `origin: '*'` junto con `credentials: true`).

## Endpoints

### Auth (`/auth`)
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/register` | Crea un usuario y devuelve sesión |
| POST | `/auth/login` | Autentica y devuelve sesión |
| GET | `/auth/me` | Devuelve el usuario autenticado (protegido) |
| POST | `/auth/logout` | Cierra sesión |

### Users (`/users`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/users` | Lista usuarios |
| GET | `/users/:id` | Obtiene un usuario |
| POST | `/users` | Crea un usuario |
| PUT | `/users/:id` | Actualiza un usuario |
| DELETE | `/users/:id` | Elimina un usuario |

### Exercises (`/exercises`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/exercises` | Lista ejercicios |
| GET | `/exercises/:id` | Obtiene un ejercicio |
| POST | `/exercises` | Crea un ejercicio |
| PUT | `/exercises/:id` | Actualiza un ejercicio |
| DELETE | `/exercises/:id` | Elimina un ejercicio |

### Routines (`/routines`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/routines` | Lista rutinas |
| GET | `/routines/:id` | Obtiene una rutina |
| POST | `/routines` | Crea una rutina |
| PUT | `/routines/:id` | Actualiza una rutina |
| DELETE | `/routines/:id` | Elimina una rutina |

### Sets (`/sets`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/sets` | Lista series |
| GET | `/sets/:id` | Obtiene una serie |
| POST | `/sets/:id` | Crea una serie |
| PUT | `/sets/:id` | Actualiza una serie |
| DELETE | `/sets/:id` | Elimina una serie |

### Workout (`/workout`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/workout` | Lista entrenamientos |
| GET | `/workout/user` | Entrenamientos del usuario autenticado |
| GET | `/workout/last/:routineId` | Último entrenamiento para una rutina dada |
| GET | `/workout/:id` | Obtiene un entrenamiento |
| POST | `/workout` | Crea un entrenamiento |
| PUT | `/workout/:id` | Actualiza un entrenamiento |
| DELETE | `/workout/:id` | Elimina un entrenamiento |

### Workoutset (`/workoutset`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/workoutset` | Lista series de entrenamiento |
| GET | `/workoutset/:id` | Obtiene una serie de entrenamiento |
| POST | `/workoutset/workouts/:workoutId/sets` | Registra una serie dentro de un entrenamiento |
| PUT | `/workoutset/:id` | Actualiza una serie de entrenamiento |
| DELETE | `/workoutset/:id` | Elimina una serie de entrenamiento |

### Exercise Data (`/exercise-data`)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/exercise-data` | Lista datos históricos de ejercicio por usuario |
| GET | `/exercise-data/:id` | Obtiene un registro |
| POST | `/exercise-data` | Crea un registro |
| PUT | `/exercise-data/:id` | Actualiza un registro |
| DELETE | `/exercise-data/:id` | Elimina un registro |

## Variables de entorno

Crear un `.env` en la raíz con al menos:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/gymtracker"
JWT_SECRET="tu-secreto"
```

## Desarrollo local

Levantar PostgreSQL con Docker:

```bash
docker-compose up -d
```

Instalar dependencias y generar el cliente de Prisma:

```bash
npm install
npx prisma generate
npx prisma migrate dev
```

Correr en modo desarrollo (hot reload):

```bash
npm run start:dev
```

Correr tests:

```bash
npm run test
npm run test:e2e
```

correr semilla para ejercicios:
```bash
# seed
$ npx prisma db seed
```

## Build y producción

```bash
npm run build
npm run start:prod
```

`npm run build` corre `nest build` y compila a `dist/main.js`. `npm run start:prod` ejecuta `node dist/main`.

> **Nota:** `prisma.config.ts` y `prisma/seed.ts` están excluidos explícitamente de la compilación de Nest (ver `tsconfig.build.json`), con `rootDir` fijado a `./src`, para evitar que el build genere una estructura anidada incorrecta (`dist/src/main.js` en vez de `dist/main.js`).

## Deploy

Desplegado en [Render](https://render.com) como Web Service.

- **Build Command:** `npm install --include=dev && npx prisma generate && npm run build`
- **Start Command:** `npm run start:prod`

## Prisma

El cliente se genera en `src/generated/prisma` (no se versiona). Comandos útiles:

```bash
npx prisma studio          # explorar la base visualmente
npx prisma migrate dev     # crear y aplicar una migración en desarrollo
npx prisma migrate deploy  # aplicar migraciones en producción
npx prisma db seed         # correr el seed (prisma/seed.ts)
```

## Frontend
 
El cliente de esta API está en [Gym-Tracker-Frontend](https://github.com/F3D9/Gym-Tracker-Frontend).