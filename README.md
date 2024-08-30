## Prisma commands

```bash
# Make sure docker is running
docker compose up

# Prisma generate after schema.prisma changes
npx prisma generate

# Migration
npx prisma migrate dev --name [name]

# Prisma Studio
npx prisma studio


```

## Supabase commands

### Local development

```bash
# Initilise supabase
supabase init

# Make supabase is running
supabase start

# Push db changes
supabase db push

```

### Generating typescript types

```bash

npx supabase gen types --lang=typescript --project-id "$PROJECT_REF" --schema public > database.types.ts

# Local development
npx supabase gen types --lang=typescript --local > database.types.ts

```
