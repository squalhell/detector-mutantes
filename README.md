# Examen MELI: Detector de Mutantes
Servicio REST API que detecta si un ADN enviado es un mutante.

# Prerequisitos
- Node v14
- Postgresql

# Ejecucion Programa
Para iniciar el programa se necesita primero cumplir con los requisitos mencionados anteriormente y ejecutar los siguientes scripts.

## Crear tabla de base de datos:

```sql
CREATE TABLE public."diagnostics" (
	id serial4 NOT NULL,
	"input" jsonb NOT NULL,
	mutant bool NOT NULL,
	created_at timestamp NOT NULL,
	CONSTRAINT diagnostics_pk PRIMARY KEY (id)
);
```
## crear y completar variables de entorno mediante archivo .env:
```bash
cp .env.example .env
```

## Instalar paquetes npm:
```bash
npm i
```

## Iniciar aplicación
```bash
npm start
```

# Ejecución de pruebas unitarias
Al momento de ejecutar las pruebas unitarias se creará de manera automática una carpeta en la raíz del proyecto llamada "coverage". Dentro de esta carpeta se podrá el archivo lcov.info y la carpeta lcov-report donde se podrá acceder al archivo html con la interfaz de covertura.

**Es importante mencionar que se debe haber ejecutado el comando npm i antes de ejecutarlas**

> **_NOTA:_**  Las pruebas unitarias fueron desarrolladas para no tener dependencias de ninguna conexión, incluyendo conexiones a base de datos.
```bash
npm test
```