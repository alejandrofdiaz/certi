# API Catastro

http://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/OVCCallejero.asmx

## Consulta número
https://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/OVCCallejero.asmx?op=ConsultaNumero

## Provincias

http://ovc.catastro.meh.es/ovcservweb/OVCSWLocalizacionRC/OVCCallejero.asmx/ConsultaProvincia?

```bash
GET /ovcservweb/OVCSWLocalizacionRC/OVCCallejero.asmx/ConsultaProvincia? HTTP/1.1
Host: ovc.catastro.meh.es
HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8
Content-Length: length
```

## Municipio

```bash
GET /ovcservweb/OVCSWLocalizacionRC/OVCCallejero.asmx/ConsultaMunicipio?Provincia=string&Municipio=string HTTP/1.1
Host: ovc.catastro.meh.es
HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8
Content-Length: length
```

```bash
POST /ovcservweb/OVCSWLocalizacionRC/OVCCallejero.asmx/ConsultaMunicipio HTTP/1.1
Host: ovc.catastro.meh.es
Content-Type: application/x-www-form-urlencoded
Content-Length: length

Provincia=string&Municipio=string
HTTP/1.1 200 OK
Content-Type: text/xml; charset=utf-8
Content-Length: length
```


## Referencia catastral con coordenadas

``` 
http://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccoordenadas.asmx/Consulta_RCCOOR
``` 

```
SRS:EPSG%3A32630
Coordenada_X:426138.39
Coordenada_Y:4462580.16
```

### Para que me devuelva muchas referencias en una misma coordenada.

``` 
http://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccoordenadas.asmx/Consulta_RCCOOR_Distancia
``` 

## Datos no protegidos

http://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccallejero.asmx?op=Consulta_DNPRC

## Fuentes

http://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccallejero.asmx

https://ovc.catastro.meh.es/ovcservweb/ovcswlocalizacionrc/ovccoordenadas.asmx