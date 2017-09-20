# Autocomplete

Esta funcionalidad permitirá al usuario escribir en un input el valor que desee encontrar y en tiempo real le aparecerán resultados.

Existen muchas soluciones en React. Ya que vamos a usar una librería plana de CSS (Bulma) me gustaría poder definir mediante props las clases que van a tener los componentes de dentro.

## Requisitos

* Sea scrollable.
* Se deje dar estilos por __clase__.
* Tenga opciones como borrar.
* Seleccionar varios (no es necesario de momento).
* Permite renderizar elementos sugerencia personalizados (por ejemplo poner municipio con provincia).

## Opciones

* [React Autosuggest](http://react-autosuggest.js.org/), esta permite customizarlo mediante un theme.css. No es más que un objeto plano que le pasa las clases a usar. Podemos trampearlo y darle las nuestras.
* [React Autocomplete](https://github.com/reactjs/react-autocomplete). Este no dice nada de temas. Deja pasarle estilo, peero, no nos vale, necesito pasarle clases.
* [React Select](https://jedwatson.github.io/react-select/). Me gusta que tiene muchas opciones, como poder eliminar la selección. Y seleccionar varios. Es el más completo, pero me queda probar cómo van las clases.