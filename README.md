<div align="center">
<table>
    <theader>
        <tr>
            <td style="width:25%;"><img src="https://github.com/rescobedoq/pw2/blob/main/epis.png?raw=true" alt="EPIS" style="width:80%; height:auto"/></td>
            <td>
                <span style="font-weight:bold;">UNIVERSIDAD NACIONAL DE SAN AGUSTIN</span><br />
                <span style="font-weight:bold;">FACULTAD DE INGENIERÍA DE PRODUCCIÓN Y SERVICIOS</span><br />
                <span style="font-weight:bold;">DEPARTAMENTO ACADÉMICO DE INGENIERÍA DE SISTEMAS E INFORMÁTICA</span><br />
                <span style="font-weight:bold;">ESCUELA PROFESIONAL DE INGENIERÍA DE SISTEMAS</span>
            </td>            
        </tr>
    </theader>
    <tbody>
        <tr>
        <td colspan="2"><span style="font-weight:bold;">Proyecto web</span>: Desarrollo de una aplicación web para inscripción de laboratorios</td>
        </tr>
        <tr>
        <td colspan="2"><span style="font-weight:bold;">Fecha</span>:  2022/08/09</td>
        </tr>
    </tbody>
</table>
</div>

<div align="center">
<span style="font-weight:bold;">PROYECTO WEB</span><br />
</div>


<table>
<theader>
<tr><th>INFORMACIÓN BÁSICA</th><td>Integrantes: Adrian Issac Mamani Quispe ,Juan Diego Gutierrez Ccama,Dylan Antonio Zuñiga Huarca</td></tr>
</theader>
<tbody>
    <tr>
        <td>ASIGNATURA:</td><td>Programación Web 2</td>
    </tr>
    <tr>
        <td>SEMESTRE:</td><td>III</td>
    </tr>
    <tr>
        <td>FECHA INICIO:</td><td>15-Jun-2024</td><td>FECHA FIN:</td>
        <td>28-Jul-2024</td><td>DURACIÓN:</td><td>04 horas</td>
    </tr>
    <tr>
        <td colspan="3">DOCENTES:
        <ul>
        <li>Richart Smith Escobedo Quispe - rescobedoq@unsa.edu.pe</li>
        </ul>
        </td>
    </<tr>
</tdbody>
</table>

#   WebApp con Spring

[![License][license]][license-file]
[![Downloads][downloads]][releases]
[![Last Commit][last-commit]][releases]

[![Debian][Debian]][debian-site]
[![Git][Git]][git-site]
[![GitHub][GitHub]][github-site]
[![Spring][Spring]][spring-site]
[![Java][Java]][java-site]

##  Tipo de Sistema
    Se trata de una aplicación web construida con el framework Spring, una App Web que permite a los usuarios comprar y vender productos, basicamente un ecommerce

##  Requisitos del sistema
    El sistema debe satisfacer los siguientes requisitos funcionales y no funcionales:

    - RQ01 : El sistema debe estar disponible en Internet a traves de una URL.
    - RQ02 : El sistema debe permitir el inicio/cierre de sesión.
    - RQ03 : El sistema debe manejar una base de datos de productos la cual se mostrara al usuario y este pueda realizar acciones sobre los productos.

##  Modelo de datos
    El modelo de datos esta conformado por las siguientes entidades.

    -   Usuario : En esta entidad se almacena la información de los ususarios los cuales se han registrado.
    -   Producto : En esta entidad se almacena los datos de los productos los cuales fueron añadidos por los usuarios
    -   Categoria : En esta entidad se almacena las categorias los cuales fueron añadidos por los administradores
    -   Modelo de compra : En esta entidad se almacena el modelo de compra el cual se genera cuando el ususario realiza una compra.

##  Diccionario de datos

    En la construcción de software y en el diccionario de datos sobre todo se recomienda y se utilizará el idioma inglés para especificar objetos, atributos, etc.

| Usuario  |                         |                 |              |                           |                            |
|----------|-------------------------|-----------------|--------------|---------------------------|----------------------------|
| Atributo | Tipo                    | Nulo            | Clave        | Predeterminado            | Descripción                |
| id	| Numerico	               | No	             | Si	          | Ninguno	                  | Código                     |
|username| 	Cadena                 | 	No	            | No	          | Ninguno	                  | Nombre de usuario          |
|email	| Cadena                  | 	No             | 	Si	         | Ninguno	                  | Correo electrónico (único) 
|address| 	Cadena                 | 	Si	            | No           | 	Ninguno                  | 	Dirección                 |
|userCreatedId	| Numerico	               | Si	             | No	          | Ninguno	                  | ID del usuario creador     |
|userModifiedId| 	Numerico               | 	Si	            | No	          | Ninguno	                  | ID del usuario modificador |
|password	| Cadena	                 | No	             | No	          | Ninguno| 	Contraseña                |
|role	| Enum	                   | No              | 	No	         | Ninguno                   | 	Rol del usuario           |
|provider	| Cadena	                 | Si              | 	No          | 	Ninguno	                 | Proveedor de autenticación |
|status	| Booleano| 	No| 	No| 	Ninguno	                 | Estado del usuario         |
|picture	| Cadena	                 | Si              | 	No          | 	Ninguno	| Foto del usuario           |
|country	| Cadena	                 | Si	             | No	          | Ninguno                   | 	País                      |
|city	| Cadena	                 | Si	             | No	          | Ninguno	                  | Ciudad                     |
...

| ShoppingOrder |                                                         |                                            |                                          |                                      |                              |
|---------------|---------------------------------------------------------|--------------------------------------------|------------------------------------------|--------------------------------------|------------------------------|
| Atributo      | Tipo                                                    | Nulo                                       | Clave                                    | Predeterminado                       | Descripción                  |
| orderID	      |Numerico	| No	                                        | Sí                                       | 	Ninguno	                            | Código de la orden           |               
| seller	       |Usuario	| Sí| 	No                                      | 	Ninguno	                            | Usuario vendedor             |                 
| userCostumer	 |Usuario	| Sí| 	No                                      | 	Ninguno	                            | Usuario comprador            |         
| product	      |Producto	| Sí| 	No	                                     | Ninguno                              | 	Producto relacionado        |        
| status	       | Cadena	| Sí| 	No                                      | 	Ninguno	                            | Estado de la orden           |
| created	      | Fecha y hora| 	No	| No	| Ninguno	| Fecha y hora de creación     |
| modified	     | Fecha y hora	| No| 	No	| Ninguno	| Fecha y hora de modificación |

| Producto | |                                        |                                     |                                  |                               |
|----------| -- |----------------------------------------|-------------------------------------|----------------------------------|-------------------------------|
| Atributo | Tipo  | Nulo                                   | Clave                               | Predeterminado                   | Descripción                   |
| id	|Numerico	| No	                                    | Sí	                                 | Ninguno	                         | Código del producto           |
|category|	Categoria	| Sí	                                    | No                                  | 	Ninguno                         | 	Categoría del producto       |
|user	|Usuario	| Sí	                                    | No	                                 | Ninguno	                         | Usuario relacionado           |
|name	|Cadena	| No	                                    | No	                                 | Ninguno	                         | Nombre del producto           |         
|imgUrl|	Cadena| 	Sí                                    | 	No	                                | Ninguno	                         | URL de la imagen del producto |
|price	|Decimal| 	No	                                   | No	                                 | Ninguno	| Precio del producto           |
|tags	|Cadena	| Sí	                                    | No	                                 | Ninguno	| Etiquetas del producto        |
|description|	Cadena	| Sí	| No	| Ninguno	| Descripción del producto      |
|stock|	Entero	| No	                                    | No	                                 | Ninguno                          | 	Cantidad en stock            |
|sold	|Entero	| No                                     | 	No	                                | Ninguno	                         | Cantidad vendida              |
|reviews	|Entero| 	No	                                   | No	                                 | Ninguno	                         | Número de reseñas             |
|rating	|Decimal	| No	                                    | No	                                 | Ninguno	                         | Calificación del producto     |
|created	|Fecha y hora	| No	                                    | No                                  | 	Ninguno                         | 	Fecha y hora de creación     |
|modified	|Fecha y hora	| No                                     | 	No	                                | Ninguno                          | 	Fecha y hora de modificación |

| Producto | | | | |                               |
|----------| -- | -- | -- | -- |-------------------------------|
| Atributo | Tipo  | Nulo | Clave | Predeterminado | Descripción                   |
| id	|Numerico	|No	|Sí	|Ninguno	| Código de la categoría        |
|name	|Cadena	|No	|Sí	|Ninguno	| Nombre de la categoría        |
|description	|Cadena	|Sí	|No	|Ninguno	| Descripción de la categoría   |
|adminID|	Numerico	|Sí	|No	|Ninguno	| ID del administrador          |
|modified|	Fecha y hora	|No	|No	|Ninguno| 	Fecha y hora de modificación |



##  Administración con Spring
    Se muestran los pasos realizados para crear el Proyecto, la aplicación, creacion de modelos, migraciones y habilitación del panel de administración en Django.
    ...

##  CRUD - Core Business - Clientes finales
    El núcleo de negocio del sistema de inscripciones tiene valor de aceptación para los cliente finales (alumnos) radica en realizar el proceso de inscripción propiamente, que empieza desde que:
    1. El usuario registra sesion.
    2. El usuario inicia sesión.
    3. El usuario sube un producto.
    4. El usuario puede tener la posibilidad modificar el producto por casos de errores,etc;
    5. El usuario puede hacer su orden de pago.
    6. El usuario cierra sesión.


##  Servicios mediante una API RESTful
    Se ha creado una aplicación que pondra a disposición cierta información para ser consumida por otros clientes HTTP.
    1. GET : Con el método get se devolverá la lista de productos,usuarios,categorias.
    2. POST : Con este método se enviara el producto y devolvera el producto


##  Operaciones asíncronas AJAX
    Se uso AJAX para conectar mediante la api fecth nuestro frontend en React a nuestro endpoint en Spring.
##  Investigación: Email.
    - Email: Se implemento la funcionalidad de usar nuestras cuentas de google como cuentas funcionales de nuestro sistema.

Github del proyecto: https://github.com/S-kkipie/ShopSwap

URL en Deploy: https://shopswap.tech/

URL Playlist YouTube: https://www.youtube.com/playlist?list=PLfBz9vHxQrEqPT_SZynDod-pd0cZVCIel
Producción de un PlayList en Youtube explicando cada una de los requerimientos.



## REFERENCIAS
-   

#

[license]: https://img.shields.io/github/license/rescobedoq/pw2?label=rescobedoq
[license-file]: https://github.com/rescobedoq/pw2/blob/main/LICENSE

[downloads]: https://img.shields.io/github/downloads/rescobedoq/pw2/total?label=Downloads
[releases]: https://github.com/rescobedoq/pw2/releases/

[last-commit]: https://img.shields.io/github/last-commit/rescobedoq/pw2?label=Last%20Commit

[Debian]: https://img.shields.io/badge/Debian-D70A53?style=for-the-badge&logo=debian&logoColor=white
[debian-site]: https://www.debian.org/index.es.html

[Git]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[git-site]: https://git-scm.com/

[GitHub]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white
[github-site]: https://github.com/

[Vim]: https://img.shields.io/badge/VIM-%2311AB00.svg?style=for-the-badge&logo=vim&logoColor=white
[vim-site]: https://www.vim.org/

[Java]: https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white
[java-site]: https://docs.oracle.com/javase/tutorial/

[Spring]: https://img.shields.io/badge/SPRING-%2311AB00.svg?style=for-the-badge&logo=spring&logoColor=white
[spring-site]: https://spring.io/


[![Debian][Debian]][debian-site]
[![Git][Git]][git-site]
[![GitHub][GitHub]][github-site]
[![Spring][Spring]][spring-site]
[![Java][Java]][java-site]


[![License][license]][license-file]
[![Downloads][downloads]][releases]
[![Last Commit][last-commit]][releases]
