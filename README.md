

hacer clone de https://github.com/CEQuinterogarcia/TaskManager.git
al clonar el repo se crea un direcctorio TaskManager que contienes los siguientes carpetas que contiene la APIrest y los microservicios y archivo docker.
/api
/auth-microservice
/taks-microservice
/task-act-microservice
/task-asignar-microservice
/task-eliminar-microservice
/task-marcar-microservice
README.md
docker-compose.yml
en cada carpeta ejecutar npm install

en las siguientes carpetas
/auth-microservice
/taks-microservice
/task-act-microservice
/task-asignar-microservice
/task-eliminar-microservice
/task-marcar-microservice
ejecutar npx prisma generate

en la carpeta TaskManager ejecutar docker compose up -D para la comunicacion NAST
en la carpeta /auth-microservice ejecutar docker compose up -D para la base de datos POSTGRES
en el el direcctorio /api definir las Variables de entornoen el .env PORT=3000
NATS_SERVER=nats://localhost:4222

en el el direcctorio /auth-microservice definir las Variables de entorno en el .env NATS_SERVER=nats://localhost:4222
JWT_SECRET=secret
DATABASE_URL="postgresql://postgres:1234@localhost:5432/auth?schema=public" que fueron defnidas en el archivo de docker compose.yml

en el el direcctorio /taks-microservice definir las Variables de entorno en el .env NATS_SERVER=nats://localhost:4222
DATABASE_URL="mongodb+srv://kamtero:mongo1234@cluster0.v6h6suj.mongodb.net/task-ms" para la base de datos en MondoDB

en el el direcctorio /task-act-microservice definir las Variables de entorno en el .env NATS_SERVER=nats://localhost:4222
DATABASE_URL="mongodb+srv://kamtero:mongo1234@cluster0.v6h6suj.mongodb.net/task-ms" para la base de datos en MondoDB

en el el direcctorio /task-asignar-microservice definir las Variables de entorno en el .env NATS_SERVER=nats://localhost:4222
DATABASE_URL="mongodb+srv://kamtero:mongo1234@cluster0.v6h6suj.mongodb.net/task-ms" para la base de datos en MondoDB

en el el direcctorio /task-eliminar-microservice definir las Variables de entorno en el .env NATS_SERVER=nats://localhost:4222
DATABASE_URL="mongodb+srv://kamtero:mongo1234@cluster0.v6h6suj.mongodb.net/task-ms" para la base de datos en MondoDB

en el el direcctorio /task-marcar-microservice definir las Variables de entorno en el .env NATS_SERVER=nats://localhost:4222
DATABASE_URL="mongodb+srv://kamtero:mongo1234@cluster0.v6h6suj.mongodb.net/task-ms" para la base de datos en MondoDB

se ejecuta en /api npm runstart:dev para inicializar la APIREST
se ejecuta en /auth-microservice npm runstart:dev para inicializar el microservicio de Autenticacion
se ejecuta en /taks-microservice npm runstart:dev para inicializar el microservicio de Creacion de tareas
se ejecuta en /auth-act-microservice npm runstart:dev para inicializar el microservicio de Actualizacion
se ejecuta en /auth-asignar-microservice npm runstart:dev para inicializar el microservicio de Asignar Usuario o equipo
se ejecuta en /auth-eliminar-microservice npm runstart:dev para inicializar el microservicio de Eliminar Tareas
se ejecuta en /auth-marcar-microservice npm runstart:dev para inicializar el microservicio de Marcar tarea como completada


