<style>
    :root{
        /* colores */
        --background: #171717;
        --title: #910707
    }
    html, body {
        background-color: var(--background);
    }
</style>
# CodexEstigma
 Manual del juego de rol Codex Estigma, por [BasilioGarcia](https://x.com/_BasilioGarcia_).

# <span style="color:var(--title)">Características</span>

- HTML5, CSS3, JavaScript y JQuery (ver sección: [Uso real de JQuery](#uso-real-de-jquery))
- Diseño responsive con cinco breakpoints: <768px, 768px, 992px, 1200px y 1638px.
- Nesting CSS nativo.
- Animaciones con CSS.
- Sistema de plantillas propio creado en JS (uso de Promesas y caché de archivos).

# <span style="color:var(--title)">Requisitos</span>
Debido a que este manual ejecuta funciones avanzadas de JavaScript, requiere ser interpretado en un servidor web HTTP,
como Apache, IIS o Ngnix.

# <span style="color:var(--title)">Sistema de Plantilla</span>
Este manual usa un sistema de plantillas propio. En vez de tener que repetir todas las etiquetas HTML en cada página,
usa un código HTML mínimo para crear los artículos y el motor en JavaScript de la plantilla se encarga de crear el
resto del documento. El menú y el paginado se crean de forma automática configurando un archivo.

> Creé este sistema, porque a medida que el manual iba teniéndo más páginas se volvía un engorro tanto el modificar código
que afectaba a muchas páginas, como el reestructurar el orden de las páginas (cuando tienes que cambiar la URL
de un enlace en más de 100 páginas HTML, echas de menos los sistemas de plantillas propios de los backends).

## <span style="color:var(--title)">Estructura de las páginas</span>
Existen dos tipos de páginas, las individuales y las que tienen sub-páginas.
Para crear una nueva página, hay que crear una nueva carpeta en la carpeta "pages", situada en la raíz del proyecto.

### <span style="color:var(--title)">Crear una página individual</span>
Si la página nueva, es una página individual, dentro de la carpeta creada deben de añadirse dos documentos:
- index.html - Contendrá el HTML de la página.
- page.css - Contendrá el CSS específico de esa página. _(en muchas páginas está en blanco)_

El archivo **_index.html_** tendrá el siguiente código:
```HTML
<!DOCTYPE html>
<meta charset="UTF-8" xmlns="http://www.w3.org/1999/html">
<script src="../init.js"></script>
<page data-dir="../.." data-chapterIndex="3">
    HTML propio de ese artículo.
</page>
    
```
El código HTML de la página va dentro de la etiqueta **_page_**. Esta etiqueta tiene dos atributos: **_data-dir_** 
y **_data-chapterIndex_**.

- **_data-dir_** : Indica la ruta a la raíz del proyecto, se usa para cargar correctamente los archivos. En las páginas
individuales su valor es: _"../.."_
- **_data-chapterIndex_** : Es un ID que indica con que entrada del archivo **_chapters.json_** _(ver más adelante)_ se
corresponde ésta página. 

A continuación hay que añadir la entrada de la página al archivo de configuración de capítulos: **_chapters.json_** en
**_./js/db/chapters.json_**:
```JSON
"0": {
  "title": "Codex Estigma"
},
"1": {
    "title": "Sobre Codex Estigma",
    "url": "/pages/acerca-de"
},
"2": {
    "title": "Tiro base",
    "url": "/pages/tiro-base"
},
etc...
```
El ID de cada entrada es un número "0", "1", "2"... que van ordenados de forma auto-incremental y comenzando siempre en
cero. El cero es la portada y no será visible en el menú ni en el paginado. El orden del resto de entradas será con el
que aparezcan en el menú y en el paginado. Así, en el ejemplo de arriba, la entrada con el ID 2, **_Tiro Base_**, sería el
segundo enlace en el menú.

La entrada tiene dos atributos: **_title_** y **_url_**.
- **_title_** : Es el título de la página, se usa tanto en el menú, como en el encabezado de la página, como en la
etiqueta **_&lt;title&gt;&lt;/title&gt;_**
- **_url_** : Es la URL de donde va a cargar los archivos. Se compone de la concatenación de **_/pages/_** más el nombre de
la nueva carpeta que se ha creado.

### <span style="color:var(--title)">Crear una página con sub-páginas</span>
Si la página nueva, es una página con sub-páginas, dentro de la carpeta creada deben de añadirse, a su vez, una 
sub-carpeta por cada sub-página. Y dentro de cada sub-carpeta, deben de añadirse dos documentos:

- index.html - Contendrá el HTML de la página.
- page.css - Contendrá el CSS específico de esa página. _(en muchas páginas está en blanco)_

El archivo **_index.html_** tendrá el siguiente código:
```HTML
<!DOCTYPE html>
<meta charset="UTF-8" xmlns="http://www.w3.org/1999/html">
<script src="../init.js"></script>
<page data-dir="../../.." data-chapterIndex="7" data-sectionIndex="1">
    HTML propio de ese artículo.
</page>
```
El código HTML de la página va dentro de la etiqueta **_page_**. Esta etiqueta tiene tres atributos: **_data-dir_**, 
**_data-chapterIndex_** y **_data-sectionIndex_**.

- **_data-dir_** : Indica la ruta a la raíz del proyecto, se usa para cargar correctamente los archivos. En las páginas
  con sub-páginas su valor es: _"../../.."_
- **_data-chapterIndex_** : Es un ID que indica con que entrada del archivo **_chapters.json_** _(ver más adelante)_ se
corresponde ésta página.
- **_data-sectionIndex_** : Es un ID que indica con que sección de la entrada se corresponde ésta página.

A continuación hay que añadir la entrada de la página al archivo de configuración de capítulos: **_chapters.json_** en
**_./js/db/chapters.json_**:
```JSON
...
"6": {
    "title": "Habilidades",
    "url": "/pages/habilidades"
},
"7": {
    "title": "Maniobras",
    "sections": {
        "1": {
            "title": "Adquirir maniobras",
            "url": "/pages/maniobras/adquirir-maniobras"
        },
        "2": {
            "title": "Filo largo",
            "url": "/pages/maniobras/filo-largo"
        },
        "3": {
            "title": "Filo corto",
            "url": "/pages/maniobras/filo-corto"
        }
    }
},
...
```
En el código de ejemplo anterior, la entrada del archivo con el ID 6 es una página individual, y la entrada con el ID 7
es una página con sub-páginas. 



<a name="uso-real-JQuery"></a>
# <span style="color:var(--title)">Uso real de JQuery</span>
> Aunque el proyecto usa la biblioteca JQuery, la mayoría del código es JavaScript vanilla, simplemente he usado JQuery 
por la sintaxis de selectores del DOM abreviada y por el bindeo de eventos con propagación, que funcionan muy bien, 
me parecen las funcionalidades mejor optimizadas de JQuery. No soy muy fan del resto de funcionalidades de JQuery y creo
que las soluciones en vainilla JS no sólo obtienen mejor performance, sino que aportan una metodología más ordenada. 
Por eso no he creado los componentes usando el sistema de componentes de JQuery, no me aportaban nada.

# <span style="color:var(--title)">Por qué no BEM</span>
> BEM es, todavía, un estándar importante cuando se trata de coordinar proyectos grandes donde diferentes personas van
a trabajar en los archivos CSS tanto ahora como en el futuro, pero, 

La malísima especifidad de antes era caótica y podía ser insufrible, pero la de ahora es controlable e incluso útil. 
Lo que siempre quiso el W3C.

# <span style="color:var(--title)">Componentes</span>

## <span style="color:var(--title)">Auto-creación de anchors internos</span>
## <span style="color:var(--title)">Tooltips</span>
