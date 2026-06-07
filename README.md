# FIFA Player Manager

Aplicación monorepo compuesta por:

* `apps/web` → Frontend
* `apps/api` → Backend API
* `domain` → Lógica de dominio compartida

---

## Requisitos

* Docker
* Docker Compose
* Node.js >= 22
* npm

---

## Instalación

Instalar dependencias del workspace (ejecutar en la raíz del proyecto):

```bash
npm install
```

---

## Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto (ver `.env.example`).

⚠️ **Todos los campos son obligatorios.**

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

## Flujo de Desarrollo

⚠️ **Todos los comandos deben ejecutarse desde la raíz del proyecto.**

### 1. Levantar contenedores

```bash
npm run dev
```

Esto inicia:

* Base de datos MySQL
* Contenedor de la API
* Contenedor del frontend

---

### 2. Ejecutar migraciones de base de datos

```bash
npm run db:migrate
```

---

### 3. Seed de la base de datos (opcional)

```bash
npm run db:seed
```

---

## Credenciales de acceso

Para iniciar sesión en la aplicación:

```txt
username: admin
password: 1234
```

---

## Utilidades de Base de Datos

### Abrir consola de MySQL

```bash
npm run db:shell
```

---

### Resetear base de datos

```bash
npm run db:reset
```

Este comando:

* Elimina el esquema de la base de datos
* Vuelve a aplicar las migraciones

---

## Colección de Postman

Podés encontrar la colección de endpoints en:

```txt
apps/api/api.postman.json
```

Importala en Postman para probar la API fácilmente.

---

## Estructura del Proyecto

```txt
.
├── apps
│   ├── api
│   └── web
├── domain
├── docker-compose.yaml
└── package.json
```
