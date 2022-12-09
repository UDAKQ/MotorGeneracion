const fs = require("fs");
const path = require("path");
const colors = require("colors/safe");

// read XMI, create folder and return json
const readXMI = () => {
  try {
    // START DETECT LAST FILE
    const getMostRecentFile = (dir) => {
      const files = orderReccentFiles(dir);
      return files.length ? files[0] : undefined;
    };

    const orderReccentFiles = (dir) => {
      return fs
        .readdirSync(dir)
        .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
        .map((file) => ({
          file,
          mtime: fs.lstatSync(path.join(dir, file)).mtime,
        }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    };
    const dirPath = "./models";
    const nameFile = getMostRecentFile(dirPath).file;
    console.log(colors.bgBlue("File:", nameFile));

    // START READ XMI FILE
    let content = fs
      .readFileSync(process.cwd() + "/models/" + nameFile)
      .toString();
    var convert = require("xml-js");
    var xml = content;
    var result1 = convert.xml2json(xml, { compact: true, spaces: 2 });
    let obj = JSON.parse(result1); //HERE OBJ JSON

    // CREATE DIRECTORY
    // console.log(colors.bgBlue("***Start Create Dir***"));
    let pathDir = `./${obj["dashboard2:Dashboard"]["_attributes"]["Url"]}/views`;
    let createDir = pathDir;
    if (!fs.existsSync(createDir)) {
      fs.mkdirSync(createDir, { recursive: true });
    }
    let createDirLayout = pathDir + "/layouts";
    if (!fs.existsSync(createDirLayout)) {
      fs.mkdirSync(createDirLayout);
    }
    console.log(
      colors.bgBlue(
        "Path Directory:",
        `./${obj["dashboard2:Dashboard"]["_attributes"]["Url"]}`
      )
    );

    return obj["dashboard2:Dashboard"]; //RETURN OBJ JSON
    // console.log(JSON.stringify(obj, null, 1))
  } catch (error) {
    console.log(colors.red("Error:", error, "Check XMI and Folder Models"));
  }
};

const getMenu = (modelJSON) => {
  const objPaginas = modelJSON["pagina"];
  const numpPages = Object.keys(objPaginas).length;
  let arrayMenu = [];
  for (let index = 0; index < numpPages; index++) {
    const element = objPaginas[index]["_attributes"]["TituloMenu"];
    arrayMenu.push(element);
  }
  console.log(colors.bgBlue("Menu: ", arrayMenu));
  return arrayMenu;
};

const getQueries = (modelJSON) => {
  let v2Arrar = getQueriesv2(modelJSON);
  const objQueries = modelJSON["fuentedatos"];
  let arrayQueries = [];
  let headers = [];
  for (
    let indexFuente = 0;
    indexFuente < Object.keys(objQueries).length;
    indexFuente++
  ) {
    // Datos unicos - Ultimo dato de Fuente
    let isDatosUnicos = objQueries[indexFuente]._attributes.DatosUnicos;
    let isUltimoDato = objQueries[indexFuente]._attributes.UltimoDato;
    let isDistinct = objQueries[indexFuente]._attributes.Distinct;
    // Nombre Tabla
    let tableName = objQueries[indexFuente].tabla._attributes.Nombre;
    // Name Query
    let nameQuery = ``;
    // Columns Objects
    let columnsObj = [];
    for (
      let indexColumn = 0;
      indexColumn < Object.keys(objQueries[indexFuente].tabla.columna).length;
      indexColumn++
    ) {
      column = {
        Nombre:
          objQueries[indexFuente].tabla.columna[indexColumn]._attributes
            .Nombre || null,
        Titulo:
          objQueries[indexFuente].tabla.columna[indexColumn]._attributes
            .Titulo || null,
        Criterio:
          objQueries[indexFuente].tabla.columna[indexColumn]._attributes
            .Criterio || null,
        TipoAgregacion:
          objQueries[indexFuente].tabla.columna[indexColumn]._attributes
            .TipoAgregacion || null,
      };
      columnsObj.push({ column });
      // console.log(colors.bgGreen(column));

      nameQuery = `//@fuentedatos.${indexFuente}/@tabla.0/@columna.${indexColumn}`;
      // console.log(colors.bgCyan("Name Query: " + nameQuery));
    }

    // console.log(columnsObj);
    // WORK WTH COLMUNS OBJJS
    let queryCreate = ``;
    let selectPart = `SELECT `;
    let wherePart = `WHERE `;
    let isWhereAvalible = false;
    let groupbyPart = `GROUP BY `;
    let isGroupbyAvalible = false;
    let selectArray = [];

    for (const keyColumn in columnsObj) {
      // AUX
      let isPromedio = false;
      // CHECK TIPO AGREGACION
      if (columnsObj[keyColumn].column.TipoAgregacion) {
        if (columnsObj[keyColumn].column.TipoAgregacion === "Agrupar Por") {
          isGroupbyAvalible = true;
          groupbyPart += `(${columnsObj[keyColumn].column.Nombre}),`;
        }
        if (columnsObj[keyColumn].column.TipoAgregacion === "Promedio") {
          isPromedio = true;
          selectPart += `AVG(${
            columnsObj[keyColumn].column.Nombre
          })::numeric(10,2) AS ${columnsObj[keyColumn].column.Titulo.replace(
            /\s/g,
            ""
          )},`;
          headers.push(columnsObj[keyColumn].column.Titulo.replace(/\s/g, ""));
          selectArray.push(
            `AVG(${
              columnsObj[keyColumn].column.Nombre
            })::numeric(10,2) AS ${columnsObj[keyColumn].column.Titulo.replace(
              /\s/g,
              ""
            )}`
          );
        }
        if (columnsObj[keyColumn].column.TipoAgregacion === "Contar") {
          isPromedio = true;
          selectPart += `COUNT(${
            columnsObj[keyColumn].column.Nombre
          }) AS ${columnsObj[keyColumn].column.Titulo.replace(/\s/g, "")},`;
          headers.push(columnsObj[keyColumn].column.Titulo.replace(/\s/g, ""));
          selectArray.push(
            `COUNT(${columnsObj[keyColumn].column.Nombre}) AS ${columnsObj[
              keyColumn
            ].column.Titulo.replace(/\s/g, "")}`
          );
        }
      }
      // CHECK CRITERIO
      if (columnsObj[keyColumn].column.Criterio) {
        isWhereAvalible = true;
        wherePart += ` (${columnsObj[keyColumn].column.Criterio}) AND`;
      }
      // CHECK Nombre [SELECT]
      if (columnsObj[keyColumn].column.Nombre) {
        // console.log("EREE", columnsObj[keyColumn].column.Nombre,columnsObj[keyColumn].column, columnsObj[keyColumn].column.Titulo);
        if (!isPromedio) {
          selectPart += `(${
            columnsObj[keyColumn].column.Nombre
          }) AS ${columnsObj[keyColumn].column.Titulo.replace(/\s/g, "")},`;
          headers.push(columnsObj[keyColumn].column.Titulo.replace(/\s/g, ""));
          selectArray.push(
            `(${columnsObj[keyColumn].column.Nombre}) AS ${columnsObj[
              keyColumn
            ].column.Titulo.replace(/\s/g, "")}`
          );
        }
      }
    }

    // CHECK ORDER BY
    if (isUltimoDato) {
      groupbyPart += `(fecha),`;
    }

    if (isWhereAvalible && isGroupbyAvalible) {
      queryCreate = `FROM ${tableName} ${wherePart.slice(
        0,
        -4
      )} ${groupbyPart.slice(0, -1)}`;
      // CHECK ORDER BY
      if (isUltimoDato) {
        queryCreate += ` ORDER BY (fecha) DESC`;
      }
      isWhereAvalible = false;
      isGroupbyAvalible = false;
    }
    if (isWhereAvalible && !isGroupbyAvalible) {
      queryCreate = `FROM ${tableName} ${wherePart.slice(0, -4)}`;
      // CHECK ORDER BY
      if (isUltimoDato) {
        queryCreate += ` ORDER BY (fecha) DESC`;
      }
      isWhereAvalible = false;
      isGroupbyAvalible = false;
    }
    if (!isWhereAvalible && isGroupbyAvalible) {
      queryCreate = `FROM ${tableName} ${groupbyPart.slice(0, -1)}`;
      // CHECK ORDER BY
      if (isUltimoDato) {
        queryCreate += ` ORDER BY (fecha) DESC`;
      }
      isWhereAvalible = false;
      isGroupbyAvalible = false;
    }

    // isUniqueData
    if (isDatosUnicos) {
      queryCreate += ` LIMIT 1`;
    } else {
      queryCreate += ` LIMIT 10`;
    }

    // console.log(colors.red(queryCreate));
    // console.table(selectArray);
    for (let indexSelect = 0; indexSelect < selectArray.length; indexSelect++) {
      if (isDistinct) {
        arrayQueries.push({
          name: `//@fuentedatos.${indexFuente}/@tabla.0/@columna.${indexSelect}`,
          sql: `SELECT DISTINCT ${selectArray[indexSelect]}, fecha::date AS Fecha ${queryCreate}`,
        });
      } else {
        arrayQueries.push({
          name: `//@fuentedatos.${indexFuente}/@tabla.0/@columna.${indexSelect}`,
          sql: `SELECT ${selectArray[indexSelect]} ${queryCreate}`,
        });
      }
    }
  }
  // console.log(headers);
  // console.log(arrayQueries);
  return v2Arrar;
};

const getQueriesv2 = (modelJSON) => {
  const objQueries = modelJSON["fuentedatos"];
  let arrayQueries = [];
  for (
    let indexFuente = 0;
    indexFuente < Object.keys(objQueries).length;
    indexFuente++
  ) {
    // Datos unicos - Ultimo dato de Fuente
    let isDatosUnicos = objQueries[indexFuente]._attributes.DatosUnicos;
    let isUltimoDato = objQueries[indexFuente]._attributes.UltimoDato;
    // Nombre Tabla
    let tableName = objQueries[indexFuente].tabla._attributes.Nombre;
    // Name Query
    let nameQuery = ``;
    // Columns Objects
    let columnsObj = [];
    for (
      let indexColumn = 0;
      indexColumn < Object.keys(objQueries[indexFuente].tabla.columna).length;
      indexColumn++
    ) {
      columnsObj.push({
        Nombre:
          objQueries[indexFuente].tabla.columna[indexColumn]._attributes
            .Nombre || null,
        Titulo:
          objQueries[indexFuente].tabla.columna[indexColumn]._attributes
            .Titulo || null,
        Criterio:
          objQueries[indexFuente].tabla.columna[indexColumn]._attributes
            .Criterio || null,
        TipoAgregacion:
          objQueries[indexFuente].tabla.columna[indexColumn]._attributes
            .TipoAgregacion || null,
        Ordenar:
          objQueries[indexFuente].tabla.columna[indexColumn]._attributes
            .Ordenar || null,
      });

      // console.log(colors.bgGreen(column));

      nameQuery = `//@fuentedatos.${indexFuente}/@tabla.0/@columna.${indexColumn}`;
      // console.log(colors.bgCyan("Name Query: " + nameQuery));
    }
    // QUERY
    let queryCreation = ``;
    let selectqueryCreation = ``;
    let selectColumnsqueryCreation = ``;
    let arraySelectsColumns = [];

    let groupbyPart = `GROUP BY `;
    let wherePart = `WHERE `;
    let auxAvgSelect = false;
    let orderPart = `ORDER BY `;

    // DISTINC
    if (isDatosUnicos === "true") {
      selectqueryCreation = `SELECT DISTINCT `;
    } else {
      selectqueryCreation = `SELECT `;
    }
    // COLUMNS
    for (const keyColumn in columnsObj) {
      console.log(columnsObj[keyColumn].Nombre);
      // ORDERBY
      if (columnsObj[keyColumn].Ordenar === "true") {
        orderPart += ` (fecha::date) DESC`;
      }

      if (columnsObj[keyColumn].TipoAgregacion) {
        if (columnsObj[keyColumn].TipoAgregacion === "Promedio") {
          // SELECT COLUMN AVG
          arraySelectsColumns.push(
            `AVG(${
              columnsObj[keyColumn].Nombre
            })::numeric(10,2) AS ${columnsObj[keyColumn].Titulo.replace(
              /\s/g,
              ""
            )}`
          );
          auxAvgSelect = true;
        }
        if (columnsObj[keyColumn].TipoAgregacion === "Agrupar Por") {
          // SELECT COLUMN AVG
          groupbyPart += `(${columnsObj[keyColumn].Nombre}),`;
        }
      }

      if (columnsObj[keyColumn].Nombre) {
        console.log("deberia guardar", columnsObj[keyColumn].Nombre);
        if (auxAvgSelect === false) {
          arraySelectsColumns.push(
            `(${columnsObj[keyColumn].Nombre}) AS ${columnsObj[
              keyColumn
            ].Titulo.replace(/\s/g, "")}`
          );
        } else {
          auxAvgSelect = false;
        }
      }

      if (columnsObj[keyColumn].Criterio) {
        wherePart += ` (${columnsObj[keyColumn].Criterio}) AND`;
      }

      // CONSTRUCTION
      if (wherePart.length > 6) {
        queryCreation = `${selectqueryCreation} FROM metricas ${wherePart.slice(
          0,
          -4
        )}`;
      } else {
        queryCreation = `${selectqueryCreation} FROM metricas`;
      }
      if (groupbyPart.length > 9) {
        queryCreation += ` ${groupbyPart.slice(0, -1)}`;
      }
    }
    console.log(colors.bgBlack(arraySelectsColumns));

    console.log(colors.bgGreen(queryCreation));

    if (orderPart.length > 9) {
      queryCreation += ` ${orderPart}`;
    }

    // if (isUltimoDato === "true") {
    //   queryCreation += ` LIMIT 1`;
    // }

    // DATOS UNICOS
    if (isDatosUnicos === "true") {
      queryCreation += ` LIMIT 1`;
    }

    // DISTINC WITH FECHA

    console.log(colors.america("------------------"));
    for (
      let indexSelect = 0;
      indexSelect < arraySelectsColumns.length;
      indexSelect++
    ) {
      if (
        queryCreation.includes("DISTINCT") &&
        !queryCreation.includes("fecha::date")
      ) {
        arrayQueries.push({
          name: `//@fuentedatos.${indexFuente}/@tabla.0/@columna.${indexSelect}`,
          sql: `${queryCreation.slice(0, 15)} ${
            arraySelectsColumns[indexSelect]
          } ${queryCreation.slice(16)}`,
        });
      } else if (
        queryCreation.includes("DISTINCT") &&
        queryCreation.includes("fecha::date")
      ) {
        arrayQueries.push({
          name: `//@fuentedatos.${indexFuente}/@tabla.0/@columna.${indexSelect}`,
          sql: `${queryCreation.slice(0, 15)} ${
            arraySelectsColumns[indexSelect]
          }, fecha::date AS Fecha ${queryCreation.slice(16)}`,
        });
      } else {
        arrayQueries.push({
          name: `//@fuentedatos.${indexFuente}/@tabla.0/@columna.${indexSelect}`,
          sql: `${queryCreation.slice(0, 6)} ${
            arraySelectsColumns[indexSelect]
          } ${queryCreation.slice(7)}`,
        });
      }
    }
    console.log(arrayQueries);
  }

  return arrayQueries;
};

module.exports = { readXMI, getMenu, getQueries };
