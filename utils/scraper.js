"use strict";
const request = require("request");
const cheerio = require("cheerio");

const axios = require("axios");

//portlet que se renderiza en la seccion cotizaciones del brou
//https://www.brou.com.uy/c/portal/render_portlet?p_l_id=20593&p_p_id=cotizacionfull_WAR_broutmfportlet_INSTANCE_otHfewh1klyS&p_p_lifecycle=0&p_t_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=0&p_p_col_count=2&p_p_isolated=1&currentURL=%2Fweb%2Fguest%2Fcotizaciones

const scrapFrom = require("./urlToScrapFrom");

//Currencies
const currencies = require("./currencies").CURRENCIES;

const parseName = currencyName => {
  switch (currencyName) {
    case "Dólar":
      return currencies.USD;

    case "Dólar eBROU":
      return currencies.EBROU_USD;

    case "Euro":
      return currencies.EUR;

    case "Peso Argentino":
      return currencies.ARS;

    case "Real":
      return currencies.BRL;

    case "Libra Esterlina":
      return currencies.GBP;

    case "Franco Suizo":
      return currencies.CHF;

    case "Yen":
      return currencies.JPY;

    case "Guaraní":
      return currencies.PYG;

    case "Unidad Indexada":
      return currencies.UNID_INDEX;

    case "Onza Troy De Oro":
      return currencies.ONZA_TROY;
  }
};

//This function scrap the given URL,
//Then @return a promise from where we can get the data
module.exports = function() {
  var name = "";
  var results = {};
  var data = {};
  var counter = 0;

  return axios
    .get(scrapFrom.URL)
    .then(response => {
      const $ = cheerio.load(response.data);

      //Foreach tr in table body
      $("tbody tr").each(function() {
        //Finds all td and loop
        $(this)
          .find("td")
          .each(function() {
            if ($(this).find(".moneda").length) {
              name = $(this)
                .find(".moneda")
                .text();

              name = parseName(name);

              results[name] = {};

              data = {};
              counter = 0;
            }

            if ($(this).find(".valor").length && name != "") {
              counter++;
              var aux = $(this)
                .find(".valor")
                .text();

              switch (counter) {
                case 1:
                  data["buy"] = aux;
                  break;

                case 2:
                  data["sell"] = aux;
                  break;

                // Commented because this data is not wanted
                // uncomment if you want to retrieve this information
                /*case 3:
                data["arbitraje_compra"] = aux;
                break;
              case 4:
                data["arbitraje_venta"] = aux;
                break;*/
              }
            }

            if (counter == 4) {
              if (name != "") {
                results[name] = data;
              }
            }
          });
      });

      return results;
    })
    .catch(error => console.log(error));
};
