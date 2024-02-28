# Helloworld App

App de prueba para el stack Angular, Flask y MySQL.

### Despliegue local

Clonar el repositorio.

```bash
git clone https://github.com/OmarPizano/angular-helloworld
```

Crear variables de entorno en un archivo `.env` (para `docker-compose.yml`).
Ajustar el siguiente ejemplo como corresponda.

```
DB_HOST=database
DB_NAME=helloworld
DB_USER=root
DB_PASSWORD=password123
DB_URL=mysql+pymysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}
```

Construir e iniciar los contenedores.

```
docker compose up -d
```

Acceder a `127.0.0.1:4200` y `127.0.0.1:5000/names` para el frontend y backend,
respectivamente.

Destruir los contenedores.

**NOTA**: agregar `-v --rmi local` para borrar almacenamiento e imágenes.

```
docker compose down
```
