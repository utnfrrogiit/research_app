research_app
============

La aplicacion no esta 100% funcional lo que esta hecho, por ejemplo no esta contemplado aun la falla del logueo y faltan interacciones de informacion en
caso de errores con el cliente. Igualmente esta funcional y se pueden loguear y demas

Ejecutar:

1° npm install --Instala dependencias necesarias de servidor y luego las dependencias necesarias para el cliente mediante bower

2° Instalar mongodb en la ruta que se desee

3° Configurar la ruta de connectionString dentro de app/config/config.js correspondiente a nuestra conexion de mongodb

4° Configurar el package.json con la ruta de ejecucion de mongod.exe para ejecutar el servicio de mongodb

5° npm start --Ejecuta aplicacion y la base de datos


