# MEAN Starter Template with Docker

A minimal starter template for a MEAN stack backend with Docker support.  
Get up and running quickly with a MongoDB container and a Node.js backend using Express and Mongoose.

---

## Features

- Backend Node.js app with Express, Mongoose, and CORS  
- Dockerized backend with hot reload (nodemon)  
- MongoDB container connected via external Docker network  
- Environment variables loaded via `.env` file  
- Clean base for MEAN development  

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed  
- [Docker Compose](https://docs.docker.com/compose/install/) installed  
- A Docker network named `shared-mongo-net` (or adjust in `docker-compose.yml`)  
- Node.js (for local dev if needed)  

---

## Getting started

1. **Clone the repo**

```bash
git clone https://your-repo-url.git
```

2. **Create your `.env` file**

Create a `.env` file in the backend folder with at least:

```env
MONGO_URI=mongodb://root:password@mongodb:27017/testdatabase?authSource=admin
PORT=3000
```

3. **Update the name of the image to your projects name**

```yml
image: your-project-name
```

4. **Build the image, copy the generated package-lock.json from the container to your host and run the containers**

```bash
docker compose build backend && docker compose run --rm backend npm install && docker compose up -d
```

5. **Access backend**

* Backend API available at `http://localhost:3000`
* Example routes:

  * `GET /api/greeting`
  * `GET /api/users`
  * `POST /api/users`

---

## Development

* The backend source code is mounted inside the container for live reload with nodemon.
* Make changes locally and they will reflect inside the container.

---

## Docker cleanup tips

* This command check what's currently on the docker environment (good for making sure you maintain a clean system):

  ```bash
  echo -e "\e[1;34m\nContainers:\e[0m" && docker ps -a --format '{{.ID}}  {{.Names}}  {{.Status}}' && \
  echo -e "\e[1;32m\nVolumes:\e[0m" && docker volume ls && \
  echo -e "\e[1;35m\nImages:\e[0m" && docker images --format '{{.Repository}}:{{.Tag}}  {{.ID}}' && \
  echo -e "\e[1;36m\nNetworks:\e[0m" && docker network ls 
  ```

* To stop containers:

  ```bash
  docker compose down
  ```

* To remove images:

  ```bash
  docker image rm mean-starter-template
  ```

* To remove volumes:

  ```bash
  docker volume rm <volume-name-or-ID>
  ```

* To **aggressively clean up** all unused Docker resources:

  ```bash
  docker system prune
  ```

  This removes:

  * Stopped containers
  * Unused networks
  * Dangling images (not tagged or referenced)
  * Build cache

  For an even deeper clean (including unused volumes):

  ```bash
  docker system prune --volumes
  ```

  > ⚠️ Use with caution – this deletes data that isn’t actively in use. Always double-check before running it in production environments.
  
---

## Notes

* To log in to the container in interactive mode run this in the terminal:

  ```bash
  docker exec -it mean-template-backend-1 sh
  ```

* The MongoDB container is expected to be running on the `shared-mongo-net` Docker network.
* Feel free to customize and extend this template to your needs.

---
