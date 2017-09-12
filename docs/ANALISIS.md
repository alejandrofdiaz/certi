# Certi

Es una aplicación que permita al usuario comenzar a dar de alta un Certificado energético completándole con datos que obtendrá de servicios web.
Cuando un usuario está dando de alta un certificado energético es porque le ha llegado un encargo de un cliente. El usuario puede comenzar la elaboración del certificado energético bien __antes__ o __después__ de la visita conociendo unos datos mínimos:
* Dirección de la vivienda.
* Datos de contacto del cliente.

Con estos datos se puede dar de alta una ficha de encargo con los siguientes datos, que son aquellos datos mínimos que exige el programa CE3X v2.3.
* (Cat) Referencia catastral.
* (Cat) Código postal.
* (Cat) Provincia y localidad tabuladas.
* (Cli )Datos del cliente.
* Datos del técnico, estos datos serán aportados por el técnico, quizá un login que guarde los datos.
* (Cat) Año construcción.
* (Cat*) Normativa vigente, esto se deduce del año de construcción.
* (Cat?)Tipo edificio.
* (Cat?) Zona climática.
* (Cat*) Superficie útil habitable, esto se deduce de la superficie catastral + coeficiente que determine el técnico o uno por defecto.
* (Vis) Altura libre de planta.
* (Cli*) Demanda diaria de Acs, si sabemos la cantidad de habitaciones que tiene el inmueble + tipo de edificio (uso) es fácil determinar la demanda de ACS. Está tabulado en el CTE.
* (G) Imagen edificio.
* (G) Plano situación.

> La obtención de estos datos viene determinada por el Cliente(Cli), Catastro (Cat), Google Maps (G), visita (Vis).

Con estas opciones rellenadas, tenemos todo el formulario de alta de CE3X y el técnico tendría que simplemente realizar el resto del estudio.

## Descripción del sitio web.

Aplicación web HTML5, CSS, Typescript+Babel apoyada de las API nativas y de algún framework reactivo (VueJS o React). Habrá alguna parte estática.
Uso de framework css como [Bulma](http://bulma.io/).
Aplicación totalmente cliente-side. Es posible que requiera el uso de algún servicio de apoyo para obtener sugerencias de direcciones en tiempo real.
Responsiva, __MOBILE FIRST__. 

## Escenarios.
* Pre visita. El técnico está de camino a realizar la visita y le interesan los datos que se deducen de la dirección/referencia catastral.
* Visita. El técnico está realizando la visita al inmueble y toma los datos en situ, estos datos se los guarda (mail, im, one note). Puede tomar nota de los datos del cliente en el momento y tenerlos almacenados. Puede conocer si el edificio tiene su referencia catastral fácilmente accesible (a veces sucede que la calle que conoce el cliente difiere de la catastral). Podrá verificar datos como superficies y año de construcción.
* Post visita. El técnico ya ha realizado la visita y quiere obtener los datos una vez completada la visita. Tendrá datos relacionados con el cliente. Puede interesarle descargar el archivo CE3X.

## Requisitos generales.

### Obtener datos catastro.
__Prioridad Alta__ y __esencial__. Fuente __yo__.

Obtener todos los datos referenciados arriba como provenientes del catastro y resumirlos en una vista conjunta. Será útil para dar dar de alta el certificado con los datos obtenidos o llevarlo a la visita como información adicional.

### Obtener archivo de programa CE3X.
__Prioridad media__ y __no esencial__. Fuente __yo__.

Permitirá al usuario descargarse un archivo compatible con CE3X en el que estén rellenados los datos y pueda comenzar el estudio.

> __Otras consideraciones__, este archivo se generará en la misma sesión en la que el usuario introduzca los datos o podría ser accesible a través de una URL.

### Acceder al informe por url.
__Prioridad media__ y __no esencial__. Fuente __yo__.

Será posible acceder al informe mediante una URL. En esa URL como parámetro se le pasará la referencial catastral y algunos otros datos requeridos. Poder compartir esta URl desde la propia aplicación web para ser almacenada en un programa de mensajería o block de notas.

> __Otras consideraciones__, se podría requerir el login de tal forma que rellene los datos del técnico que han sido cargados previamente.

### Mandar informe a mail/IM.
__Prioridad baja y __no esencial__. Fuente __yo__.

El usuario podría necesitar recibir estos datos obtenidos en una visita de obra y sugeridos por la aplicación en un correo electrónico en formato plano o podría copiarlos y pegarlos en un servicio de block de notas en la nube (One Note).
En el caso de poder generar el archivo del programa CE3X, poder exportarlo en un correo o en un servicio de almacenamiento (DropBox).

### Obtener imágenes.
__Prioridad Alta__ y __no esencial__. Fuente __yo__.

Será posible descargarse las imágenes por separado de fachada y plano de situación obtenidas de algún servicio de mapas como Google Maps, en formato JPG para ser añadidas manualmente al programa.

> __Otras consideraciones__, de ser posible descargarse el archivo del programa CE3X, esta imagen podrá ser embebida dentro del archivo CE3X y descargado conjuntamente. Además de darse este mismo caso, el usuario podría subir una imagen desde su dispositivo y poder incorporarlas al documento.

### Obtener coordenadas GPS y sugerir datos.
__Prioridad Baja__ y __no esencial__. Fuente __yo__.

La aplicación sería capaz de obtener las coordenas del dispositivo móvil y sugerir unas direcciones al usuario.
