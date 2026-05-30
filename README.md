# FIFA Player Manager

Monorepo application composed of:

- `apps/web` → Frontend
- `apps/api` → Backend API
- `domain` → Shared domain logic

## Requirements

- Docker
- Docker Compose
- Node.js >= 22
- npm

---

# Installation

Install workspace dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root: (ver .env.example)

```env
# HOST PORTS
HOST_WEB_PORT=4200
HOST_API_PORT=3000
HOST_DB_PORT=3306

# MYSQL
MYSQL_DATABASE=fifa_player_manager
MYSQL_ROOT_PASSWORD=secret123
```

---

# Development Workflow

## 1. Start containers

```bash
npm run dev
```

This starts:

- MySQL database
- API container
- Web container

---

## 2. Run database migrations

```bash
npm run db:migrate
```

---

## 3. Seed database (optional)

```bash
npm run db:seed
```

---

# Database Utilities

## Open MySQL shell

```bash
npm run db:shell
```

---

## Reset database

```bash
npm run db:reset
```

This command:

- drops the database schema
- reapplies migrations

---

# Project Structure

```txt
.
├── apps
│   ├── api
│   └── web
├── domain
├── docker-compose.yaml
└── package.json
```