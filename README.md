# CodexEstigma
Manual del juego de rol Codex Estigma, por [BasilioGarcia](https://x.com/_BasilioGarcia_).

El manual puede ser consultado online [AQUÍ](https://basiliogarcia.github.io/CodexEstigma/) ⤴.

# Características

- HTML5, CSS3, JavaScript y JQuery (ver sección: [Uso real de JQuery](#uso-real-de-jquery))
- Sistema de plantillas propio creado en JS (uso de Promesas y caché de archivos).
- Diseño responsive con cinco breakpoints: <768px, 768px, 992px, 1200px y 1638px.
- Nesting CSS nativo. (ver sección: [Por qué no BEM](#por-que-no-bem))
- Animaciones con CSS.
- Eliminado el scroll nativo del navegador, custom scroll en bloques de contenido, compatible con dispositivos móviles.
- Subsecciones del menú visibles con efecto onHover que es compatible con dispositivos móviles.
- [Auto-creación de anchors internos](#auto-creación-de-anchors-internos)

# Requisitos
Debido a que este manual ejecuta funciones avanzadas de JavaScript, requiere ser interpretado en un servidor web HTTP,
como Apache, IIS o Ngnix.

# Sistema de Plantilla
Este manual usa un sistema de plantillas propio. En vez de tener que repetir todas las etiquetas HTML en cada página,
usa un código HTML mínimo para crear los artículos y el motor en JavaScript de la plantilla se encarga de crear el
resto del documento. El menú y el paginado se crean de forma automática configurando un archivo.

> [!NOTE]
> Creé este sistema, porque a medida que el manual iba teniéndo más páginas se volvía un engorro tanto el modificar código
que afectaba a muchas páginas, como el reestructurar el orden de las páginas (cuando tienes que cambiar la URL
de un enlace en más de 100 páginas HTML, echas de menos los sistemas de plantillas propios de los backends).

## Estructura de las páginas
Existen dos tipos de páginas, las individuales y las que tienen sub-páginas.
Para crear una nueva página, hay que crear una nueva carpeta en la carpeta "pages", situada en la raíz del proyecto.

### Crear una página individual
Si la página nueva, es una página individual, dentro de la carpeta creada deben de añadirse dos documentos:
- index.html - Contendrá el HTML de la página.
- page.css - Contendrá el CSS específico de esa página. _(en muchas páginas está en blanco)_

El archivo **_index.html_** tendrá el siguiente esquema:
```HTML
<!DOCTYPE html>
<meta charset="UTF-8" xmlns="http://www.w3.org/1999/html">
<script src="../../js/init.js"></script>
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
etiqueta **_&lt;title&gt;_**
- **_url_** : Es la URL de donde va a cargar los archivos. Se compone de la concatenación de **_/pages/_** más el nombre de
la nueva carpeta que se ha creado.

### Crear una página con sub-páginas
Si la página nueva, es una página con sub-páginas, dentro de la carpeta creada deben de añadirse, a su vez, una 
sub-carpeta por cada sub-página. Y dentro de cada sub-carpeta, deben de añadirse dos documentos:

- index.html - Contendrá el HTML de la página.
- page.css - Contendrá el CSS específico de esa página. _(en muchas páginas está en blanco)_

El archivo **_index.html_** tendrá el siguiente esquema:
```HTML
<!DOCTYPE html>
<meta charset="UTF-8" xmlns="http://www.w3.org/1999/html">
<script src="../../../js/init.js"></script>
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
- **_data-sectionIndex_** : Es un ID que indica con que sección de la entrada se corresponde ésta página _(ver más adelante)_.

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

Las entradas con sub-páginas tiene dos atributos: **_title_** y **_sections_**.
- **_title_** : Es el título de la página, se usa en el menú.
- **_sections_** : Son las entradas de las sub-páginas. Sus IDs son auto-incrementales y comienzan en 1. A su vez, 
tienen dos atributos: **_title_** y **_url_**, funcionan como las páginas individuales.

<a name="uso-real-jquery"></a>
# Uso real de JQuery
>[!NOTE]
> Aunque el proyecto usa la biblioteca JQuery, la mayoría del código es JavaScript vanilla, simplemente he usado JQuery 
por la sintaxis de selectores del DOM abreviada y por el bindeo de eventos con propagación, que funcionan muy bien, 
me parecen las funcionalidades mejor optimizadas de JQuery. No soy muy fan del resto de funcionalidades de JQuery y creo
que las soluciones en vainilla JS no sólo obtienen mejor performance, sino que aportan una metodología más ordenada. 
Por eso no he creado los componentes usando el sistema de componentes de JQuery, no me aportaban nada.

<a name="por-que-no-bem"></a>
# Por qué no BEM
> [!TIP]
> BEM sigue siendo un estándar importante para coordinar proyectos grandes donde múltiples personas trabajarán con los
archivos CSS. Sin embargo, desde que CSS incorporó el nesting de forma nativa en 2021, se han facilitado métodos
alternativos para mantener un código CSS limpio y organizado.
> 
>Además, creo que existe un mito exagerado, mal entendido, con la especificidad de los selectores CSS, y que la 
propagación de BEM y las enseñanzas de ciertos "gurús" contribuyeron a ello.
La especificidad es una característica [buscada por el W3C](https://www.w3.org/TR/selectors-4/#specificity-rules) y es
MUY UTIL. Una cosa es tener un lío impresionante con la jerarquía de los selectores y otra es que no aproveches una
característica perfectamente válida de las hojas de estilos.
> 
> Por todo ello, y porque es un proyecto personal, con el que no voy a entrar en conflicto con otros desarrolladores,
he decidido usar, no solo native nesting, sino usar selectores con IDs y etiquetas genéricas como: **_&lt;aside&gt;_**,
**_&lt;header&gt;_**...
> 
> Aún así, como se puede ver en la imagen inferior, el nivel de especificidad es bajo, se puede mantener un 
equilibrio entre utilidad jerárquica y código limpio y ordenado.

![Gráfico de especificidad del archivo CSS](/img/000-specificity-graph.png)


# Componentes

<a name="autocreacion-de-anchors-internos"></a>
## Auto-creación de anchors internos
Si a unas de las etiquetas usadas en los títulos (**_&lt;h2&gt;_**, **_&lt;h3&gt;_** o **_&lt;h4&gt;_**) se le 
coloca un atributo ID, automáticamente se convierte en un enlace interno a ese título de la página.

## Tooltips
