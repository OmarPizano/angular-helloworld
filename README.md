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
    - `curl http://127.0.0.1:5000/names`
    - `curl http://127.0.0.1:5000/names -X POST -H 'content-type: application/json' -d '{"name":"nuevo"}'`
    - `curl http://127.0.0.1:5000/names/1 -X PUT -H 'content-type: application/json' -d '{"newName":"nuevo2"}'`
    - `curl http://127.0.0.1:5000/names/1 -X DELETE`
- **database**:
    - `mysql -h 127.0.0.1 -u root -ptoor`
    - `mysqldump -h 127.0.0.1 -u root -ptoor helloworld > data.sql`

