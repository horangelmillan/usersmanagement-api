# usersmanagement-api

El backend se puede ejecutar en dos entornos, uno es 'development' y el otro es 'production'.

Antes de ejecutar algun entorno debe añadir las variables de entorno en un archivo ".env" en la carpeta raiz del proyecto

Indicar el puerto de ejecución (opcional), si no por defecto será el 4000

PORT=

Indicar las credenciales de la base de datos local o de prueba en la nube para el entorno de desarrollo

DEV_DIALECT=  mysq, postgres, etc... 
&nbsp;
DEV_PORT=  puerto de la base de datos 
&nbsp;
DEV_HOST=  localhost 
&nbsp;
DEV_USERNAME=  usuario 
&nbsp;
DEV_PASSWORD=  contraseña 
&nbsp;
DEV_DB=  base de datos 

Credenciales de la base de datos de produccion

DB_DIALECT=  mysq, postgres, etc... 
&nbsp;
DB_HOST=  url.serviciondelanube.com 
&nbsp;
DB_PORT=  puerto de la base de datos 
&nbsp;
DB_USER=  usuario 
DB_PASSWORD=  contraseña 
&nbsp;
DB=  base de datos 

El sistema de registro requiere de encryptacion por lo tanto necesitará una llave para generar y desesncriptar los hash

puede usar en javascript esta linea de codigo para generar su llave
&nbsp;
`require('crypto').randomBytes(64).toString('hex');`

SECRET_KEY=

Para iniciar el entorno development puede ejecutarlo con el comando:

`npm run start:dev`

para el entrno de produccion:

`npm start`
