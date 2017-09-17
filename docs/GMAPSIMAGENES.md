# Imágenes localización

## Introducción.
En base a la dirección el usuario deberá ser capaz de obtener imágenes de un servicio de mapas (Gmaps) en referencia a dos conceptos:
* Foto fachada. Esta imagen se obtiene manualmente del catastro (es posible desde la Api?). Se puede obtener desde StreetView.
* Plano de situación. Este plano se obtiene de google maps. Pone en contexto el inmueble en torno a la ciudad.

## Características imágenes:
* Tamaño: 640x640 scale 1, 1280x1280 px scale 2. [Fuente Google maps](https://developers.google.com/maps/documentation/static-maps/intro#Imagesizes). Este tamaño viene determinado por la cuenta gratuita de Google maps. Me parece bien que el tamaño sea 1280x1280, también podemos dar al usuario elegir estos tamaños en base a unos valores predeterminados.
* Relación de aspecto. Dentro de CE3X las imágenes quedan bien cuadradas.
* Formato. JPEG. Creo que acepta Png, pero el selector del CE3X es un poco pocho y no te muestra otros formatos (aunque sí los acepta 🤷).


## Fuentes.
* [Api imágenes estáticas de Google.](https://developers.google.com/maps/documentation/static-maps/intro?hl=es-419)