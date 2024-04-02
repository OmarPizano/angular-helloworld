# Helloworld App

App de prueba para el stack Angular, Flask y MySQL.

### Despliegue local

Clonar el repositorio.

```bash
git clone https://github.com/OmarPizano/angular-helloworld
```

Iniciar servicios.

```bash
# inicia los 3 servicios (backend, frontend, database)
make start-dev-containers

# detiene los 3 servicios, los volumenes e imágenes se conservan
make stop-dev-containers

# detiene y borra todos los recursos
make clean-dev-containers
```

Acceso a servicios.

- **frontend**: ir a `http://127.0.0.1:4200`
- **backend**:
    - `curl http://127.0.0.1:5000/api/auth -X POST -H 'content-type: application/json' -d '{"username": "root", "password": "toor"}'`
    - `curl http://127.0.0.1:5000/api/users -X GET -H 'Autorization: Bearer TOKEN'`
    - ...
    - `curl http://127.0.0.1:5000/api/names`
    - `curl http://127.0.0.1:5000/api/names -X POST -H 'content-type: application/json' -d '{"name":"nuevo"}'`
    - `curl http://127.0.0.1:5000/api/names/1 -X PUT -H 'content-type: application/json' -d '{"newName":"nuevo2"}'`
    - `curl http://127.0.0.1:5000/api/names/1 -X DELETE`
- **database**:
    - `mysql -h 127.0.0.1 -u root -ptoor`
    - `mysqldump -h 127.0.0.1 -u root -ptoor helloworld > data.sql`

### Despliegue Remoto

Desplegar el backend requiere una db activa y alcanzable.

```bash
docker run -d \
    -p 5000:5000 \
    --name backend
    --env="DB_URL=mysql+mysqlconnector://user:password@host/database"
    --env="JWT_SECRET=thisisasecret123"
    --restart always
    tomnoir/helloworld-backend
```

Desplegar el frontend requiere un backend activo y alcanzable.

```bash
docker run -d \
    -p 8080:80 \
    --name frontend
    --env="API_URL=http://www.url.com"
    --restart always
    tomnoir/helloworld-frontend
```

Levantar reverse proxy apuntando al servidor interno.

```bash
docker run -d \
    -p 80:80 \
    --name reverse-proxy \
    --env="SERVER_IP=X.X.X.X"
    tomnoir/helloworld-reverse-proxy
```

### Actualizar configuración de proxy

Copiar nueva config y reiniciar.

```bash
docker cp nginx.conf reverse-proxy:/etc/nginx/conf.d/default.conf
docker restart reverse-proxy
```

Balanceo de carga.

```
upstream frontend {
    server LOCAL_IP:8080 weight=7;
    server LOCAL_IP:8081 weight=3;
}
```

Carga uniforme y respaldo.

```
upstream frontend {
    server LOCAL_IP:8080;
    server LOCAL_IP:8081;
    server LOCAL_IP:8082;
    server LOCAL_IP:8081 backup;
}
```

Protección de API. Solo permitir accedo a API desde frontend. Algunas rutas de API permitidas desde cualquier origen.

```
server {
    
    # otra config
    
    # rutas del frontend permitidas desde cualquier origen
    location / {
        proxy_pass http://frontend;
    }    
    
    # ruta de la API permitida desde cualquier origen
    location /api {
        proxy_pass http://backend;
    }    
    
    # todo bajo /api/ solo permitido si viene desde el dominio indicado
    location /api/ {
        if ($http_origin != "http://domain.org") {
            return 403;
        }
        proxy_pass http://backend;
    }        
}
```
