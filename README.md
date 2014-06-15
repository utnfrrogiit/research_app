research_app
============

## Iniciar el ambiente de desarrollo

1. Instalar [vagrant](https://www.vagrantup.com/downloads.html) (requiere de algun VM provider como VirtualBox).
2. Dentro del directorio del proyecto, ejecutar `vagrant up` para iniciar la máquina virtual.
3. Loguear en la máquina virtual con `vagrant ssh`.
4. `cd /vagrant`.
5. Correr el servidor con `gulp develop`.

## Gulp Tasks

Todas las tareas se corren ejecutando `gulp <taskname>` en en el directorio root del proyecto.

* **lint**: Analiza todos los .js existentes en el proyecto con jshint y reporta un informe.
* **develop**: Corre el servidor (`node server.js`) y lo recarga al cambiar un archivo.
