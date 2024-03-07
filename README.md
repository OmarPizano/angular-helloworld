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
DB_URL=mysql+mysqlconnector://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}
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

### Consumo del backend con `curl`

Obtener usuarios.

```bash
# local
curl 127.0.0.1:5000/names

# vercel
curl https://angular-helloworld-backend.vercel.app/names
```

Crear usuario.

```bash
# vercel
curl https://angular-helloworld-backend.vercel.app/names -X POST -H 'content-type: application/json' -d '{"name": "nuevo usuario"}'
```

Actualizar usuario. Reemplazar `<ID>` por el correspondiente.

```bash
curl https://angular-helloworld-backend.vercel.app/names/<ID> -X PUT -H 'content-type: application/json' -d '{"newName": "nuevo"}'
```

Eliminar usuario. Reemplazar `<ID>` por el correspondiente.

```bash
curl https://angular-helloworld-backend.vercel.app/names/<ID> -X DELETE
```
