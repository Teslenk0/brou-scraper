# BROU-SCRAPER
API Rest que devuelve la ultima cotización de la moneda, la cual obtiene al hacer scraping desde la web del [BROU](https://brou.com.uy).
*******************************

## Obtencion de la informacion
Se le agrego al propio servicio de express, un cron que ejecuta cada cierto tiempo una funcion. Esta recorre el portlet que utiliza el banco para cargar las cotizaciones en la pagina principal y va haciendo scraping para obtener los valores correspondientes.
Luego de haber agregado todos los valores y su correspondiente divisa en un objecto JSON, guarda en MongoDB esta informacion, la cual puede ser obtenida mediante la API.

*******************************

## Entrega de la informacion 

El formato de respuesta utilizado por la API es JSON (Javascript Object Notation). La informacion es accesible mediante la siguiente URL
**[https://currency.tesluygroup.com](https://currency.tesluygroup.com)**.

## Endpoints

Los endpoints definidos son los siguientes:

* ### __/api/v1/currency/latest__
   Este endpoint nos brinda la ultima cotizacion almacenada en la base de datos.

* ### __/api/v1/currency/:fecha__
   Este endpoint nos brinda la oportunidad de elegir la cotizacion segun la fecha. Devuelve la ultima obtenida para el dia brindado, el formato que debe cumplir la fecha que se pasa por parametro es el siguiente: **AAAA-MM-DD**

*******************************************************************

### Consideraciones
La API fue desarrollada ya que el banco no cuenta con una que sea accesible publicamente. Hay otras opciones open source las cuales pueden ser utilizadas pero a diferencia de esta, obtienen los datos desde un archivo XLS obtenido desde el portal del INE.