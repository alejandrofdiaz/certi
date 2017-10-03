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

