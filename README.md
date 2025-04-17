### 1. Ejecutar con Docker Compose

```bash
docker-compose up --build
```

Levantará **MySQL** y cargará automáticamente los datos del CSV. También expondrá el microservicio en:

```
http://localhost:3000
```

---

### 2. Endpoints disponibles

#### `GET /buscar-casos/<ubigeo>`

Consulta casos por código de ubicación:

```
GET http://localhost:3000/buscar-casos/10401
```

#### `POST /registrar-caso`

Registra un nuevo caso de malaria:

```
POST http://localhost:3000/registrar-caso
Content-Type: application/json

{
  "ano": 2023,
  "semana": 15,
  "departamento": "AMAZONAS",
  "provincia": "BAGUA",
  "distrito": "ARAMANGO",
  "ubigeo": "10401",
  "falciparum": 1,
  "vivax": 2
}
```
