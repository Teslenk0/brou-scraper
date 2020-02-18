const request = require("request");

const cheerio = require("cheerio");

//portlet que se renderiza en la seccion cotizaciones del brou
//https://www.brou.com.uy/c/portal/render_portlet?p_l_id=20593&p_p_id=cotizacionfull_WAR_broutmfportlet_INSTANCE_otHfewh1klyS&p_p_lifecycle=0&p_t_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=0&p_p_col_count=2&p_p_isolated=1&currentURL=%2Fweb%2Fguest%2Fcotizaciones

var moneda = "";
var cotizaciones = [];
var test = {};
var valores = {};
var counter = 0;

request(
  "https://www.brou.com.uy/c/portal/render_portlet?p_l_id=20593&p_p_id=cotizacionfull_WAR_broutmfportlet_INSTANCE_otHfewh1klyS&p_p_lifecycle=0&p_t_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=0&p_p_col_count=2&p_p_isolated=1&currentURL=%2Fweb%2Fguest%2Fcotizaciones",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      $("tbody tr").each(function() {
        $(this)
          .find("td")
          .each(function() {
            if ($(this).find(".moneda").length && cotizaciones.length < 5) {
              moneda = $(this)
                .find(".moneda")
                .text();

              cotizaciones.push(moneda);

              test[moneda] = {};
              console.log(moneda);

              valores = {};
              counter = 0;
            }

            if ($(this).find(".valor").length && moneda != "" && counter < 4) {
              counter++;
              var aux = $(this)
                .find(".valor")
                .text();

              switch (counter) {
                case 1:
                  valores["compra"] = aux;
                  break;

                case 2:
                  valores["venta"] = aux;
                  break;
                case 3:
                  valores["arbitraje_compra"] = aux;
                  break;
                case 4:
                  valores["arbitraje_venta"] = aux;
                  break;
              }
            }

            if (
              counter == 4 &&
              (moneda == "Dólar" ||
                moneda == "Dólar eBROU" ||
                moneda == "Euro" ||
                moneda == "Peso Argentino" ||
                moneda == "Real")
            ) {
              if (moneda != "") {
                test[moneda] = valores;
              }
              if (moneda == "Real") moneda = "";
            }
          });
      });
    }
    console.log(test);
    console.log(cotizaciones);
  }
);
