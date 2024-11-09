# BACKEND:

## 372. Inicio de proyecto - CalendarApp Node Backend
### Arrancamos el proyecto:

```
npm init -y
```

Para ejecutar un script en node:
```
node index.js
```

Instalamos "Nodemon" para que esté pendiente de los cambios que se realizan en el script indicado.   
Queremos hacer la instalación de forma global en la máquina, por lo que habrá que añadir "sudo" al comando: 

```
sudo npm i nodemon -g
```

Para hacer el seguimiento de "index.js":
```
nodemon index.js
```

Copiamos los scripts en nuestro package.json para facilitar la ejecución:
```
"scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
},
```

Para ejecutar los comandos:
```
npm start
```

```
npm run dev
```


# Arrancar GIT:
```
git init
git branch -M main
git remote add origin https://github.com/hectoralvaez/pachanga-backend.git
```


## 373. Configurando Express
```
npm i express
```


## 374. Variables de entorno y carpeta pública
Instalar 'dontenv' para poder gestionar variables de entorno:

```
npm i dotenv
```


## 380. Configuración de base de datos
mongodb
https://cloud.mongodb.com

mongoosejs
https://mongoosejs.com


## 381. Conectar Node a Mongo Atlas
Instalamos Mongoose
```
npm i mongoose
```
