# jc-htmltopdf
Proyecto para convertir un template html a PDF

#### NPM


[Página de npm de la librería](https://www.npmjs.com/package/jc-htmltopdf)

Instalar `npm install --save jc-htmltopdf`


## Uso

Una vez instalado, jc-htmltopdf está listo para usar.

```js
const generatepdfHtml = require('jc-htmltopdf')
jcGeneratepdfHtml(htmlPath, info, CHROMIUM_PATH, format);
```

Los parametros que se pasan  son:

| param         | Interface |
|---------------|-----------|
| htmlPath      | String    |
| info          | Object    |
| CHROMIUM_PATH | String    |
| format        | String    |

### Configuración de parametros
|Nombre         |Type            |Default                         |Descripción                                                                                                 |
|------------   |----------------|--------------------------------|------------------------------------------------------------------------------------------------------------|
|htmlPath       |String          | Es requerido                   |Se manda el path donde esta el template de html.                                                            |
|info           |Array           | Es requerida la información    |Se manda el array con información que se mandara con los datos que se pintanran en el HTML.                 |
|CHROMIUM_PATH  |String          |`""`                            |Path de CHROMIUM_PATH para poder hacer el renderizado en el servidor si no se require mandar `""`           |
|format         |String          |`""`                            |El formato que se le dara al PDF puedes ver los formatos [AQUÍ](#Formatos)                                               |

### Formatos
 -Formatos permitidos

| Formatos  |
|-----------|
| Tabloid   | 
| Legal     | 
| A4        |
| A3        |
| A5        |
| A6        |
| A7        |
| A8        |
| Folio     |


## Proyecto ejemplo

[Proyecto ejemplo de HTML a PDF](https://github.com/josecd)


## Créditos

[José Alejandro](https://github.com/josecd)
