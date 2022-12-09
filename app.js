const express = require("express");
const colors = require("colors/safe");
const ejsMate = require("ejs-mate");

// Read.js
const { readXMI, getMenu, getQueries } = require("./read");

// Create.js
const {
  createLayout,
  createHome,
  createPageNew,
  createLayoutV2,
  createHomeV2,
  createPageNewV2,
} = require("./create");

// REFERENCE CONNECTION.JS
const { Client } = require("pg");
const { setupPostgres } = require("./connection");

// MODEL JSON
let modelJSON = readXMI();
// console.log(
//   // colors.bgBlue(
//   //   "-----------",
//   //   modelJSON.pagina[0].panel.objeto[1].parametro._attributes.Etiqueta
//   // )
// );

// setupPostgres -> CREATE CLIENT AND SET CONNECTION
const objClient = setupPostgres(modelJSON);
let client;
try {
  client = new Client(objClient);
  client.connect();
  console.log(colors.bgYellow(`Postgres DB connected`));
} catch (error) {
  console.log(error);
  process.exit(1);
}

// GET MENU
const menu = getMenu(modelJSON);
// GET QUERIES
const queries = getQueries(modelJSON);

// CREATE LAYOUT
createLayout(modelJSON);
// V2 LAYOUT
createLayoutV2(modelJSON);

// CREATE HOME
createHome(modelJSON);
// V2 HOME
createHomeV2(modelJSON);

// CREATE PAGES
createPageNew(modelJSON);
// V2 PAGES
createPageNewV2(modelJSON);

// SETUP EXPRESS SERVER
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// use ejs-locals for all ejs templates:
app.engine("ejs", ejsMate);
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs"); // so you can render('index')
const port = 3000;
app.set("views", __dirname + `/${modelJSON["_attributes"]["Url"]}/views`);
console.log(
  colors.bgBlue("Render dirname:", `/${modelJSON["_attributes"]["Url"]}/views`)
);

// ROUTES
// Home Route
app.get("/", (req, res) => {
  console.log(colors.bgCyan("Home Page Request"));
  res.render(`${modelJSON["_attributes"]["Nombre"]}V2`, {
    menu,
    nameHome: modelJSON["_attributes"]["Nombre"],
  });
});

// Pages Route
app.get("/select/:nameMenuPage", async (req, res) => {
  try {
    const nameMenuPage = req.params.nameMenuPage;
    console.log(colors.bgCyan("nameMenuPage (Request):", nameMenuPage));

    // Get ObjPanels by PageName
    modelJSON = readXMI();
    var results = null;
    for (var key in modelJSON["pagina"]) {
      if (
        modelJSON["pagina"].hasOwnProperty(key) &&
        modelJSON["pagina"][key]._attributes.TituloMenu === nameMenuPage
      ) {
        results = modelJSON["pagina"][key];
      }
    }
    console.log(colors.bgMagenta(results));
    // CHECK IF HAVE PARAMETROS
    let haveParametros = false;
    if (Array.isArray(results.panel.objeto)) {
      for (
        let indexObj = 0;
        indexObj < Object.keys(results.panel.objeto).length;
        indexObj++
      ) {
        let isParametro =
          results.panel.objeto[indexObj].parametro || "NO TIENE";
        if (isParametro !== "NO TIENE") {
          haveParametros = true;
        }
      }
    } else {
      let isParametro = results.panel.objeto.parametro || "NO TIENE";
      if (isParametro !== "NO TIENE") {
        haveParametros = true;
      }
    }
    console.log("TIENE PARAMETROS?", haveParametros);
    if (haveParametros) {
      res.render(nameMenuPage + "V2", {
        menu,
        nameHome: modelJSON["_attributes"]["Nombre"],
        objPanels: results.panel,
      });
    } else {
      // CHANGE DATA VALUES OBJECTS WHT OUT PARAMETROS
      if (Array.isArray(results.panel.objeto)) {
        for (
          let indexObj = 0;
          indexObj < Object.keys(results.panel.objeto).length;
          indexObj++
        ) {
          console.log(results.panel.objeto[indexObj]);
          // MEDIDOR OR LINEAS CHANGE COLUMN VALOR - LABEL
          if (
            results.panel.objeto[indexObj]._attributes["xsi:type"].split(
              ":"
            )[1] === "Medidor" ||
            results.panel.objeto[indexObj]._attributes["xsi:type"].split(
              ":"
            )[1] === "Lineas" ||
            results.panel.objeto[indexObj]._attributes["xsi:type"].split(
              ":"
            )[1] === "Barras" ||
            results.panel.objeto[indexObj]._attributes["xsi:type"].split(
              ":"
            )[1] === "Pastel"
          ) {
            console.log("EXISTE OBJ MEDIDOR OR LINEAS OR BARRAS");

            for (const query of queries) {
              // CHECK QUERIES WITH COLUMN LABEL
              if (
                query.name ===
                results.panel.objeto[indexObj]._attributes["columnaLabel"]
              ) {
                let querySelect = query.sql;
                console.log("QUERY SELECT", querySelect);
                try {
                  const response = await client.query(querySelect);
                  let arrayColumnaLabel = [];
                  for (
                    let indexRes = 0;
                    indexRes < Object.keys(response.rows).length;
                    indexRes++
                  ) {
                    arrayColumnaLabel.push(
                      `${
                        response.rows[indexRes][
                          Object.keys(response.rows[0])[0]
                        ]
                      }`
                    );
                  }
                  console.log(arrayColumnaLabel);
                  results.panel.objeto[indexObj]._attributes["columnaLabel"] =
                    arrayColumnaLabel;
                } catch (error) {
                  console.log(colors.red("VERIFICAR QUERY", error));
                }
              }
              // CHECK QUERIES WITH COLUMN VALOR
              if (
                query.name ===
                results.panel.objeto[indexObj]._attributes["columnaValor"]
              ) {
                let querySelect = query.sql;
                console.log("QUERY SELECT", querySelect);
                try {
                  const response = await client.query(querySelect);
                  let arrayColumnaValor = [];
                  for (
                    let indexRes = 0;
                    indexRes < Object.keys(response.rows).length;
                    indexRes++
                  ) {
                    arrayColumnaValor.push(
                      `${
                        response.rows[indexRes][
                          Object.keys(response.rows[0])[0]
                        ]
                      }`
                    );
                  }
                  console.log(arrayColumnaValor);
                  results.panel.objeto[indexObj]._attributes["columnaValor"] =
                    arrayColumnaValor;
                } catch (error) {
                  console.log(colors.red("VERIFICAR QUERY", error));
                }
              }
            }
          }
          // ETIQUETA
          if (
            results.panel.objeto[indexObj]._attributes["xsi:type"].split(
              ":"
            )[1] === "Etiqueta"
          ) {
            console.log("EXISTE OBJ ETIQUETA");
            for (const query of queries) {
              // CHECK QUERIES WITH COLUMN LABEL
              if (
                query.name ===
                results.panel.objeto[indexObj]._attributes["columna"]
              ) {
                let querySelect = query.sql;
                console.log("QUERY SELECT", querySelect);
                try {
                  const response = await client.query(querySelect);
                  let arrayColumnaLabel = [];
                  for (
                    let indexRes = 0;
                    indexRes < Object.keys(response.rows).length;
                    indexRes++
                  ) {
                    arrayColumnaLabel.push(
                      `${
                        response.rows[indexRes][
                          Object.keys(response.rows[0])[0]
                        ]
                      }`
                    );
                  }
                  console.log(arrayColumnaLabel);
                  results.panel.objeto[indexObj]._attributes["columna"] =
                    arrayColumnaLabel;
                } catch (error) {
                  console.log(colors.red("VERIFICAR QUERY", error));
                }
              }
            }
          }
        }
        // TO SEND
        console.log(colors.bgRed("OBJ SEND", results.panel.objeto));
        res.render(nameMenuPage + "V2", {
          menu,
          nameHome: modelJSON["_attributes"]["Nombre"],
          objPanels: results.panel,
        });
      } else {
        // CODE FOR PANEL WITH 1 OBJ
        console.log(results.panel.objeto);
        if (
          results.panel.objeto._attributes["xsi:type"].split(":")[1] ===
          "Grilla"
        ) {
          let arrayColumnasGrillaSend = [];
          let arrayColumnasGrilla =
            results.panel.objeto._attributes["columna"].split(" ");
          // console.log(arrayColumnasGrilla);
          for (let keyColumnsGrilla in arrayColumnasGrilla) {
            // console.log(arrayColumnasGrilla[keyColumnsGrilla]);
            for (const query of queries) {
              // CHECK QUERIES WITH COLUMN LABEL
              if (query.name === arrayColumnasGrilla[keyColumnsGrilla]) {
                let querySelect = query.sql;
                console.log("QUERY SELECT", querySelect);
                try {
                  const response = await client.query(querySelect);
                  let arrayColumnaLabel = [];
                  for (
                    let indexRes = 0;
                    indexRes < Object.keys(response.rows).length;
                    indexRes++
                  ) {
                    arrayColumnaLabel.push(
                      `${
                        response.rows[indexRes][
                          Object.keys(response.rows[0])[0]
                        ]
                      }`
                    );
                  }
                  // console.log(arrayColumnaLabel);
                  arrayColumnasGrilla[keyColumnsGrilla] = arrayColumnaLabel;
                  arrayColumnasGrillaSend.push(
                    arrayColumnasGrilla[keyColumnsGrilla]
                  );
                } catch (error) {
                  console.log(colors.red("VERIFICAR QUERY", error));
                }
              }
            }
          }
          // console.log(arrayColumnasGrillaSend);
          results.panel.objeto._attributes["columna"] = arrayColumnasGrillaSend;
          console.log(results.panel.objeto);
        }
        // MEDIDOR OR LINEAS CHANGE COLUMN VALOR - LABEL
        if (
          results.panel.objeto._attributes["xsi:type"].split(":")[1] ===
            "Medidor" ||
          results.panel.objeto._attributes["xsi:type"].split(":")[1] ===
            "Lineas" ||
          results.panel.objeto._attributes["xsi:type"].split(":")[1] ===
            "Barras" ||
          results.panel.objeto._attributes["xsi:type"].split(":")[1] ===
            "Pastel"
        ) {
          console.log("EXISTE OBJ MEDIDOR OR LINEAS OR BARRAS OR PASTEL");

          for (const query of queries) {
            // CHECK QUERIES WITH COLUMN LABEL
            if (
              query.name === results.panel.objeto._attributes["columnaLabel"]
            ) {
              let querySelect = query.sql;
              console.log("QUERY SELECT", querySelect);
              try {
                const response = await client.query(querySelect);
                let arrayColumnaLabel = [];
                for (
                  let indexRes = 0;
                  indexRes < Object.keys(response.rows).length;
                  indexRes++
                ) {
                  arrayColumnaLabel.push(
                    `${
                      response.rows[indexRes][
                        Object.keys(response.rows[0])[0]
                      ].substring(0, 25) ||
                      response.rows[indexRes][Object.keys(response.rows[0])[0]]
                    }`
                  );
                }
                console.log(arrayColumnaLabel);
                results.panel.objeto._attributes["columnaLabel"] =
                  arrayColumnaLabel;
              } catch (error) {
                console.log(colors.red("VERIFICAR QUERY", error));
              }
            }
            // CHECK QUERIES WITH COLUMN VALOR
            if (
              query.name === results.panel.objeto._attributes["columnaValor"]
            ) {
              let querySelect = query.sql;
              console.log("QUERY SELECT", querySelect);
              try {
                const response = await client.query(querySelect);
                let arrayColumnaValor = [];
                for (
                  let indexRes = 0;
                  indexRes < Object.keys(response.rows).length;
                  indexRes++
                ) {
                  arrayColumnaValor.push(
                    `${
                      response.rows[indexRes][Object.keys(response.rows[0])[0]]
                    }`
                  );
                }
                console.log(arrayColumnaValor);
                results.panel.objeto._attributes["columnaValor"] =
                  arrayColumnaValor;
              } catch (error) {
                console.log(colors.red("VERIFICAR QUERY", error));
              }
            }
          }
        }
        // ETIQUETA
        if (
          results.panel.objeto._attributes["xsi:type"].split(":")[1] ===
          "Etiqueta"
        ) {
          console.log("EXISTE OBJ ETIQUETA");
          for (const query of queries) {
            // CHECK QUERIES WITH COLUMN LABEL
            if (query.name === results.panel.objeto._attributes["columna"]) {
              let querySelect = query.sql;
              console.log("QUERY SELECT", querySelect);
              try {
                const response = await client.query(querySelect);
                let arrayColumnaLabel = [];
                for (
                  let indexRes = 0;
                  indexRes < Object.keys(response.rows).length;
                  indexRes++
                ) {
                  arrayColumnaLabel.push(
                    `"${
                      response.rows[indexRes][Object.keys(response.rows[0])[0]]
                    }"`
                  );
                }
                console.log(arrayColumnaLabel);
                results.panel.objeto._attributes["columna"] = arrayColumnaLabel;
              } catch (error) {
                console.log(colors.red("VERIFICAR QUERY", error));
              }
            }
          }
        }
        // TO SEND
        console.log(colors.bgRed("OBJ SEND", results.panel.objeto));
        res.render(nameMenuPage + "V2", {
          menu,
          nameHome: modelJSON["_attributes"]["Nombre"],
          objPanels: results.panel,
        });
      }
    }
  } catch (error) {
    console.log("Pagina no encontrada");
    res.redirect("/");
  }
});

// Handling request
app.post("/request", async (req, res) => {
  let sendObj = JSON.parse(req.body.objSend);
  let valueIni = JSON.parse(req.body.valueIni) || null;
  let valueFin = JSON.parse(req.body.valueFin) || null;

  let referenciaIni = JSON.parse(req.body.referenciaIni) || null;
  let referenciaFin = JSON.parse(req.body.referenciaFin) || null;

  console.log(colors.bgGreen(sendObj, valueIni, referenciaIni));
  // NEW V
  for (
    let indexSendObj = 0;
    indexSendObj < Object.keys(sendObj).length;
    indexSendObj++
  ) {
    console.log(sendObj[indexSendObj]);
    // CHECK CHART OR FILTER
    // LINEAS SEND OBJ
    if (
      sendObj[indexSendObj]["_attributes"]["xsi:type"].split(":")[1] ===
      "Lineas"
    ) {
      console.log("SE ENVIO UN OBJ LINEAS");

      // console.log(sendObj[indexSendObj]["_attributes"]["columnaLabel"]);
      for (const query of queries) {
        // console.log(query.name);
        // CHECK QUERIES WITH COLUMN LABEL
        if (
          query.name === sendObj[indexSendObj]["_attributes"]["columnaLabel"]
        ) {
          let querySelect = query.sql;
          // console.log("ANTES", querySelect);
          querySelect = querySelect.replace(
            `[${referenciaIni}]`,
            `'${valueIni}'`
          );
          querySelect = querySelect.replace(
            `[${referenciaFin}]`,
            `'${valueFin}'`
          );

          console.log("QUERY REPLACE", querySelect);
          try {
            const response = await client.query(querySelect);
            console.log(colors.bgMagenta("AQUI AYUDA", response));
            let arrayColumnaLabel = [];
            for (
              let indexRes = 0;
              indexRes < Object.keys(response.rows).length;
              indexRes++
            ) {
              let arrows =
                response.rows[indexRes][Object.keys(response.rows[0])[0]] + "";
              console.log(arrows.substring(0, 15));
              arrayColumnaLabel.push(`${arrows.substring(0, 15)}`);
            }
            console.log(arrayColumnaLabel);
            sendObj[indexSendObj]["_attributes"]["columnaLabel"] =
              arrayColumnaLabel;
          } catch (error) {
            console.log(colors.red("VERIFICAR QUERY", error));
          }
        }
        // CHECK QUERIES WITH COLUMN VALOR
        if (
          query.name === sendObj[indexSendObj]["_attributes"]["columnaValor"]
        ) {
          let querySelect = query.sql;
          // console.log("ANTES", querySelect);
          querySelect = querySelect.replace(
            `[${referenciaIni}]`,
            `'${valueIni}'`
          );
          querySelect = querySelect.replace(
            `[${referenciaFin}]`,
            `'${valueFin}'`
          );
          console.log("QUERY REPLACE VALOR", querySelect);
          try {
            const response = await client.query(querySelect);
            console.log(colors.bgMagenta("AQUI AYUDA", response));
            let arrayColumnaValor = [];
            for (
              let indexRes = 0;
              indexRes < Object.keys(response.rows).length;
              indexRes++
            ) {
              arrayColumnaValor.push(
                Number(
                  response.rows[indexRes][Object.keys(response.rows[0])[0]]
                )
              );
            }
            console.log(arrayColumnaValor);
            sendObj[indexSendObj]["_attributes"]["columnaValor"] =
              arrayColumnaValor;
          } catch (error) {
            console.log(colors.red("VERIFICAR QUERY", error));
          }
        }
      }
    }

    // FILTRO SEND OBJ
    if (
      sendObj[indexSendObj]["_attributes"]["xsi:type"].split(":")[1] ===
      "Filtro"
    ) {
      console.log("SE ENVIO UN OBJ Filtro");
    }
  }

  // OLDV
  // let columnaLabel = req.body.columnaLabel;
  // let columnaValor = req.body.columnaValor;
  // let refes = JSON.parse(req.body.ref);
  // let objectos_modifi = JSON.parse(req.body.objectos_modifi);

  // console.log(colors.bgGreen(columnaLabel, columnaValor, refes));

  // // console.log(objectos_modifi);

  // // ETIQUETAS
  // for (
  //   let indexObjReq = 0;
  //   indexObjReq < Object.keys(objectos_modifi).length;
  //   indexObjReq++
  // ) {
  //   if (
  //     objectos_modifi[indexObjReq]._attributes["xsi:type"].split(":")[1] ===
  //     "Etiqueta"
  //   ) {
  //     for (const keyQuery in queries) {
  //       if (
  //         queries[keyQuery].name ===
  //         objectos_modifi[indexObjReq]._attributes["columna"]
  //       ) {
  //         let querySelect = queries[keyQuery].sql;
  //         for (const keyRef in refes) {
  //           console.log(refes[keyRef].ref);
  //           if (querySelect.includes(refes[keyRef].ref)) {
  //             console.log("SI INNLUYE");
  //             querySelect = querySelect.replace(
  //               `[${refes[keyRef].ref}]`,
  //               `'${refes[keyRef].value}'`
  //             );
  //           }
  //         }
  //         console.log(querySelect);
  //         // console.log(querySelect);
  //         const response = await client.query(querySelect);
  //         // console.log(response);
  //         let arrayColumnaLabel = [];
  //         for (
  //           let indexRes = 0;
  //           indexRes < Object.keys(response.rows).length;
  //           indexRes++
  //         ) {
  //           arrayColumnaLabel.push(
  //             `${response.rows[indexRes][Object.keys(response.rows[0])[0]]}`
  //           );
  //         }

  //         objectos_modifi[indexObjReq]._attributes["columna"] =
  //           arrayColumnaLabel;
  //       }
  //     }
  //     console.log(
  //       `NUEVA COLUMNA VALOR DE LA ETIQUETA [${indexObjReq}]: ${objectos_modifi[indexObjReq]._attributes["columna"]}`
  //     );
  //   }
  // }

  // QUERIES
  // for (const keyQuery in queries) {
  //   // console.log(queries[keyQuery]);
  //   if (queries[keyQuery].name === columnaLabel) {
  //     let querySelect = queries[keyQuery].sql;
  //     for (const keyRef in refes) {
  //       console.log(refes[keyRef].ref);
  //       if (querySelect.includes(refes[keyRef].ref)) {
  //         console.log("SI INNLUYE");
  //         querySelect = querySelect.replace(
  //           `[${refes[keyRef].ref}]`,
  //           `'${refes[keyRef].value}'`
  //         );
  //       }
  //     }
  //     console.log(querySelect);
  //     // console.log(querySelect);
  //     const response = await client.query(querySelect);
  //     // console.log(response);
  //     let arrayColumnaLabel = [];
  //     for (
  //       let indexRes = 0;
  //       indexRes < Object.keys(response.rows).length;
  //       indexRes++
  //     ) {
  //       arrayColumnaLabel.push(
  //         `${response.rows[indexRes][Object.keys(response.rows[0])[0]]}`
  //       );
  //     }

  //     columnaLabel = arrayColumnaLabel;
  //   }
  //   if (queries[keyQuery].name === columnaValor) {
  //     let querySelect = queries[keyQuery].sql;

  //     for (const keyRef in refes) {
  //       console.log(refes[keyRef].ref);
  //       if (querySelect.includes(refes[keyRef].ref)) {
  //         console.log("SI INNLUYE");
  //         querySelect = querySelect.replace(
  //           `[${refes[keyRef].ref}]`,
  //           `'${refes[keyRef].value}'`
  //         );
  //       }
  //     }
  //     console.log(querySelect);

  //     // console.log(querySelect);
  //     const response = await client.query(querySelect);
  //     let arrayColumnaValor = [];
  //     for (
  //       let indexRes = 0;
  //       indexRes < Object.keys(response.rows).length;
  //       indexRes++
  //     ) {
  //       arrayColumnaValor.push(
  //         response.rows[indexRes][Object.keys(response.rows[0])[0]]
  //       );
  //     }
  //     columnaValor = arrayColumnaValor;
  //   }
  // }

  // console.log(colors.bgMagenta("ENVIO", columnaValor, columnaLabel));

  res.json([
    {
      newresObj: sendObj,
    },
  ]);
});

// START EXPRESS SERVER
app.listen(port, () =>
  console.log(colors.bgWhite(`Express server started on port ${port}`))
);
