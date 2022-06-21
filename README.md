# Api Test CRUD Usuarios

Crud Usuarios - Test developer backend

---
## Requerimiento

Para el desarrollo necesitará Node.js instalarlo a nivel global en su entorno.
Además es necesario tener una base de datos mysql en entorno local o un servidor, en la carpeta database se encuentra el archivo .sql con la extructura a importar.

### Node
- #### Instalación en Windows

  Solo sigue [sitio web oficial de Node.js](https://nodejs.org/) ay descargue el instalador.
Además, asegúrese de tener `git` disponible en su PATH,` npm` podría necesitarlo
 [aquí](https://git-scm.com/)).

- #### Instalación en Ubuntu

  Puede instalar nodejs y npm fácilmente con apt install, simplemente ejecute los siguientes comandos.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Otros sistemas operativos
  
Puede encontrar más información sobre la instalación en el [official Node.js website](https://nodejs.org/) y la [official NPM website](https://npmjs.org/).

Si la instalación fue exitosa, debería poder ejecutar el siguiente comando.

    $ node --version
    v16.15.1

    $ npm --version
    8.11.0


Si necesita actualizar `npm`, ¡puede hacerlo usando npm! Después de ejecutar el siguiente comando, simplemente abra nuevamente la línea de comando.

    $ npm install npm -g


---

## Instalación

    $ git clone https://github.com/diegoinoca/test-crud-usuarios.git
    $ cd test-crud-usuarios
    $ npm install

## Configuración app

Open `./.env` ahí se encuentra:

- Puerto que corre la aplicación;
- Conexión a base de datos
- Usuario por defecto para seguridad de apis
- Secret para generar tokende autenticación;

## Para correr el proyecto

    $ npm start

## Para unitest del proyecto

    $ npm test

## La documentación de apis

    Para la documentación de las apis se puede ingresar al path /docs