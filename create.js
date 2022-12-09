const fs = require("fs");
const path = require("path");
const colors = require("colors/safe");

const createLayout = (modelJSON) => {
  let pathSave = `./${modelJSON["_attributes"]["Url"]}/views/layouts/boilerplate.ejs`;
  let content = `
  <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><%= nameHome %></title>
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi"
            crossorigin="anonymous"
        />
        <script src="https://cdn.zingchart.com/zingchart.min.js"></script>



        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="//cdn.rawgit.com/Mikhus/canvas-gauges/gh-pages/download/2.1.7/all/gauge.min.js"></script>
        <style>
            .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
            }
    
            @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
            }
    
            .b-example-divider {
            height: 3rem;
            background-color: rgba(0, 0, 0, 0.1);
            border: solid rgba(0, 0, 0, 0.15);
            border-width: 1px 0;
            box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
                inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
            }
    
            .b-example-vr {
            flex-shrink: 0;
            width: 1.5rem;
            height: 100vh;
            }
    
            .bi {
            vertical-align: -0.125em;
            fill: currentColor;
            }
    
            .nav-scroller {
            position: relative;
            z-index: 2;
            height: 2.75rem;
            overflow-y: hidden;
            }
    
            .nav-scroller .nav {
            display: flex;
            flex-wrap: nowrap;
            padding-bottom: 1rem;
            margin-top: -1px;
            overflow-x: auto;
            text-align: center;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            }
        </style>
        <link href="/css/style.css" rel="stylesheet" type="text/css" />
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity=
        "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
        crossorigin="anonymous">
        </script>

        <script src="https://cdn.zingchart.com/zingchart.jquery.min.js"></script>
        
        </head>
        <body>
        <header
            class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
        >
            <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/"
            ><%= nameHome %></a
            >
            <button
            class="navbar-toggler position-absolute d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span class="navbar-toggler-icon"></span>
            </button>
        </header>
    
        <div class="container-fluid">
            <div class="row">
            <nav
                id="sidebarMenu"
                class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            >
                <div class="position-sticky pt-3 sidebar-sticky">
                <ul class="nav flex-column">
                    <% for(let item of menu) {%>
                    <li class="nav-item">
                    <a class="nav-link" href="/select/<%= item %>"
                        ><span
                        data-feather="file-text"
                        class="align-text-bottom"
                        ></span
                        ><%= item %>
                    </a>
                    </li>
                    <% } %>
                </ul>
                </div>
            </nav>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div class="align-items-center pt-3 pb-2 mb-3"><%- body %></div>
            </main>
            </div>
        </div>

        <script
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
            integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
            crossorigin="anonymous"
        ></script>
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js"
            integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk"
            crossorigin="anonymous"
        ></script>
        <script
            src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"
            integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE"
            crossorigin="anonymous"
        ></script>



        
        <script src="/js/dashboard.js"></script>
        </body>
    </html>
  `;
  try {
    fs.writeFileSync(pathSave, content);
    console.log(colors.bgBlue("New Layout: " + pathSave));
  } catch (error) {
    console.log("Error: " + error);
  }
};

const createLayoutV2 = (modelJSON) => {
  let pathSave = `./${modelJSON["_attributes"]["Url"]}/views/layouts/boilerplateV2.ejs`;
  let content = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title><%= nameHome %></title>
      <!--     Fonts and icons     -->
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Noto+Sans:300,400,500,600,700,800|PT+Mono:300,400,500,600,700"
        rel="stylesheet"
      />
      <!-- Nucleo Icons -->
      <link href="/assets2/css/nucleo-icons.css" rel="stylesheet" />
      <link href="/assets2/css/nucleo-svg.css" rel="stylesheet" />
      <!-- Font Awesome Icons -->
      <script
        src="https://kit.fontawesome.com/349ee9c857.js"
        crossorigin="anonymous"
      ></script>
      <link href="/assets2/css/nucleo-svg.css" rel="stylesheet" />
      <!-- CSS Files -->
      <link
        id="pagestyle"
        href="/assets2/css/corporate-ui-dashboard.css?v=1.0.0"
        rel="stylesheet"
      />
      <!-- MOTOR -->
      
      <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
      
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity=
        "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" 
        crossorigin="anonymous">
        </script>

        <script src="https://cdn.zingchart.com/zingchart.jquery.min.js"></script>
        
    </head>
  
    <body class="g-sidenav-show bg-gray-100">
      <!-- START MENU-LEFT -->
      <aside
        class="sidenav navbar navbar-vertical navbar-expand-xs border-0 bg-slate-900 fixed-start"
        id="sidenav-main"
      >
        <!-- START SIDENAV HEADER -->
        <div class="sidenav-header border-0">
          <a class="navbar-brand d-flex align-items-center mt-4 mb-0 ms-3 px-1" href="/">
            <span class="font-weight-bold"><%= nameHome %></span>
          </a>
        </div>
        <!-- END SIDENAV HEADER -->
        <!-- START BODY SIDENAV -->
        <div
          class="collapse navbar-collapse text-sm align-items-center"
          id="sidenav-collapse-main"
        >
          <ul class="navbar-nav">
            <% for(let item of menu) {%>
            <li class="nav-item">
              <a class="btn btn-outline-success" href="/select/<%= item %>">
                <div
                  class=""
                >
                </div>
                <span class="nav-link-text ms-1 text-sm"><%= item %></span>
              </a>
            </li>
            <% } %>
          </ul>
        </div>
        <!-- END BODY SIDENAV -->
        <!-- START SIDENAV FOOTER -->
        
        <!-- END SIDENAV HEADER -->
      </aside>
      <!-- END MENU-LEFT -->
      <main
        class="main-content position-relative max-height-vh-100 h-100 border-radius-lg"
      >
        <!-- Start Navbar -->
        <!-- -->
        <!-- End Navbar -->
        <!-- START MAIN_CONTAINER -->
        <div class="container-fluid py-4 px-5">
          <!-- START HELLO -->
          <!-- Start Content-Body -->
          <%- body %>
          <!-- End Content-Body -->
          <!-- END HELLO -->
          <!-- START FOOTER -->
          <!-- END FOOTER -->
        </div>
        <!-- END MAIN_CONTAINER -->
      </main>
      <!-- STAR PLUGIN -->
      
      <!-- END PLUGIN -->
      <!--   Core JS Files   -->
      <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
      <script src="/assets2/js/core/popper.min.js"></script>
      <script src="/assets2/js/core/bootstrap.min.js"></script>
      <script src="/assets2/js/plugins/perfect-scrollbar.min.js"></script>
      <script src="/assets2/js/plugins/smooth-scrollbar.min.js"></script>
      <script
        src="/assets2/js/plugins/swiper-bundle.min.js"
        type="text/javascript"
      ></script>
      <script>
        if (document.getElementsByClassName("mySwiper")) {
          var swiper = new Swiper(".mySwiper", {
            effect: "cards",
            grabCursor: true,
            initialSlide: 1,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        }
      </script>
      <script>
        var win = navigator.platform.indexOf("Win") > -1;
        if (win && document.querySelector("#sidenav-scrollbar")) {
          var options = {
            damping: "0.5",
          };
          Scrollbar.init(document.querySelector("#sidenav-scrollbar"), options);
        }
      </script>
      <!-- Github buttons -->
      <script async defer src="https://buttons.github.io/buttons.js"></script>
      <!-- Control Center for Corporate UI Dashboard: parallax effects, scripts for the example pages etc -->
      <script src="/assets2/js/corporate-ui-dashboard.min.js?v=1.0.0"></script>
    </body>
  </html>`;
  try {
    fs.writeFileSync(pathSave, content);
    console.log(colors.bgBlue("New Layout: " + pathSave));
  } catch (error) {
    console.log("Error: " + error);
  }
};

const createHome = (modelJSON) => {
  let pathSave = `./${modelJSON["_attributes"]["Url"]}/views/${modelJSON["_attributes"]["Nombre"]}.ejs`;
  let content = `<% layout('layouts/boilerplate') %>

    <div class="card bg-secondary text-white border-0">
    <div class="card-body">
    Descripcion: ${modelJSON["_attributes"]["Descripcion"]} | Autor: ${modelJSON["_attributes"]["Autor"]}
    </div>
      <img class="card-img" src="https://png.pngtree.com/thumb_back/fh260/background/20211118/pngtree-technology-round-dashboard-image_908915.jpg" alt="Card image">
    </div>
    `;
  try {
    fs.writeFileSync(pathSave, content);
    console.log(colors.bgBlue("New Home: " + pathSave));
  } catch (error) {
    console.log("Error: " + error);
  }
};

const createHomeV2 = (modelJSON) => {
  let pathSave = `./${modelJSON["_attributes"]["Url"]}/views/${modelJSON["_attributes"]["Nombre"]}V2.ejs`;
  let content = `<% layout('layouts/boilerplateV2') %>
  <div class="card card-blog card-plain" style="width: 48rem;">
    <div class="position-relative">
      <a class="d-block blur-shadow-image">
        <img src="https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1920&amp;q=80" alt="img-blur-shadow" class="img-fluid shadow border-radius-lg">
      </a>
    </div>
    <div class="card-body px-0 pt-4">
      <p class="text-primary font-weight-bold text-sm text-uppercase">Autor: ${modelJSON["_attributes"]["Autor"]}</p>
      <a href="javascript:;">
        <h5>
          Descripcion: ${modelJSON["_attributes"]["Descripcion"]}
        </h5>
      </a>
    </div>
  </div>
    `;
  try {
    fs.writeFileSync(pathSave, content);
    console.log(colors.bgBlue("New Home: " + pathSave));
  } catch (error) {
    console.log("Error: " + error);
  }
};

// NEW CREATE PAGES
const createPageNew = (modelJSON) => {
  const numpPages = Object.keys(modelJSON["pagina"]).length;
  console.log(colors.bgMagenta("Pages to create", numpPages));

  for (const keyPage in modelJSON["pagina"]) {
    let pathSave = `./${modelJSON["_attributes"]["Url"]}/views/${modelJSON["pagina"][keyPage]["_attributes"]["TituloPagina"]}.ejs`;
    let content = `<% layout('layouts/boilerplate') %>
        <section class="content-page">
            <div class="p-3 mb-2 bg-dark bg-gradient text-white">
            <h4 class="text-white">${modelJSON["pagina"][keyPage]["_attributes"]["TituloPagina"]}</h4>
            <strong>Descripcion: </strong> ${modelJSON["pagina"][keyPage]["_attributes"]["Descripcion"]}
            <strong>Frecuencia: </strong> ${modelJSON["pagina"][keyPage]["_attributes"]["FrecuenciaRecarga"]}
            </div>
        </section>
        <section class="content-panels border-top border-secondary rounded-1 border-1">
            <div style="position: relative">
                string-panels
            </div>
        </section>
    `;

    // Create Panels
    let stringPanel = createPanelsNew(modelJSON, keyPage);

    // // Replace string-panels
    content = content.replace("string-panels", stringPanel);

    try {
      fs.writeFileSync(pathSave, content);
      console.log(colors.bgBlue("New Page: " + pathSave));
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  console.log(colors.bgMagenta("-----------------------------"));
};

const createPanelsNew = (modelJSON, keyPage) => {
  const isArray = Array.isArray(modelJSON["pagina"][keyPage]["panel"]);
  let contentPanel = ``;
  if (isArray) {
    console.log("Panels to create in page [" + keyPage + "] > 1");
    contentPanel = `
    <% for(var i=0; i < Object.keys(objPanels).length; i++) { %>
        <div class="col-md-6 border border-1" style="position:absolute; top:<%= objPanels[i]["_attributes"]["Y"] %>px; left:<%= objPanels[i]["_attributes"]["X"] %>px; height:<%= objPanels[i]["_attributes"]["Height"] %>px; width:<%= objPanels[i]["_attributes"]["Weight"] %>px;">
            <h6><span class="badge bg-secondary"><%= objPanels[i]["_attributes"]["Titulo"] %></span></h6>
            <section class="content-panels-objects ">
                <div style="position: relative">
                    <!-- string-panels-objects -->
                </div>
            </section>
        </div>
    <% } %>
    `;
  } else {
    console.log("Panels to create in page [" + keyPage + "] = 1");
    contentPanel = `
    <div class="col-md-6 border border-1 bg-light text-dark border-primary" style="position:absolute; top:<%= objPanels["_attributes"]["Y"] %>px; left:<%= objPanels["_attributes"]["X"] %>px; height:<%= objPanels["_attributes"]["Height"] %>px; width:<%= objPanels["_attributes"]["Weight"] %>px;">
            <h6><span class="badge bg-secondary"><%= objPanels["_attributes"]["Titulo"] %></span></h6>
            <section class="content-panels-objects">
                <div style="position: relative">
                    <!-- string-panels-objects -->
                    <% if(Array.isArray(objPanels["objeto"])){ %>
                        <!-- Tiene mas de 1 objeto -->
                        <% for(var indexObj=0; indexObj < Object.keys(objPanels["objeto"]).length; indexObj++) { %>
                            <!-- Tiene 1 objeto (medidor)-->
                            <% if(objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] === 'Medidor'){ %>
                                <!-- Start Card Dark -->
                                <div class="card text-white bg-dark mb-2" style="position:absolute; top:<%= objPanels["objeto"][indexObj]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"][indexObj]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"][indexObj]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"][indexObj]["_attributes"]["Weight"] %>px;">
                                  <h5 class="card-header">Titulo: <%= objPanels["objeto"][indexObj]["_attributes"]["Titulo"] %></h5>
                                  <div class="card-body">
                                    <h5 class="card-title">Tipo: <%= objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] %></h5>
                                    <!-- CHART -->
                                    <div>
                                    <div id='myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Titulo"].replace(/\\s/g, '') %>'></div>
                                    <div class="mt-2"><strong>Umbral: </strong> <%= objPanels["objeto"][indexObj]["_attributes"]["Umbral"] %>
                                    </div>
                                    </div>
                                    <script>
                                    var myConfig<%- objPanels["objeto"][indexObj]["_attributes"]["Titulo"].replace(/\\s/g, '') %> = {
                                        "type":"gauge",
                                        "scale-r":{
                                          "aperture":200,
                                          "values":"0:1000:200",
                                          item:{
                                            offsetR:0,
                                            rules:[
                                              {
                                                rule:'%i == 9',
                                                offsetX:15
                                              }
                                            ]
                                          },
                                          ring:{
                                            size:10,
                                          },
                                        },
                                        "series":[
                                          {
                                            "values":[<%- objPanels["objeto"][indexObj]["_attributes"]["Umbral"] %>],
                                            "csize":"5%", //Needle Umbral Width
                                            "size":"100%",  //Needle Indicator Length
                                            "background-color":"#000000"      
                                          },
                                          {
                                            "values":[0],
                                            "csize":"15%", //Needle Indicator Width
                                            "size":"75%",  //Needle Indicator Length
                                            "background-color":"#CC0066" 
                                          },
                                        ]
                                      };
                                      
                                      zingchart.render({ 
                                        id : 'myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Titulo"].replace(/\\s/g, '') %>', 
                                        data : myConfig<%- objPanels["objeto"][indexObj]["_attributes"]["Titulo"].replace(/\\s/g, '') %>, 
                                        height : "200px", 
                                        width: "100%" 
                                      });
                                    </script>  
                                    <!-- END CHART -->    
                                    
                                    <div class="mt-2">
                                    <p id="input_<%- objPanels["objeto"][indexObj]["_attributes"]["Titulo"].replace(/\\s/g, '') %>"></p>
                                    </div>                   
                                  </div>
                                </div>
                                <!-- End Card Dark -->                          
                                </div>
                            <% } %>

                            <!-- Tiene 1 objeto (pastel)-->
                            <% if(objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] === 'Pastel'){ %>
                                <!-- Start Card Dark -->
                                <div class="card text-white bg-dark mb-2">
                                  <h5 class="card-header">Titulo: <%= objPanels["objeto"][indexObj]["_attributes"]["Titulo"] %></h5>
                                  <div class="card-body">
                                    <h5 class="card-title">Tipo: <%= objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] %></h5>
                                    <!-- CHART -->
                                    <div>
                                      <canvas id="myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Titulo"].replace(/\\s/g, '') %>"></canvas>
                                    </div>
                                    <script>
                                    let chartPastel = new Chart(document.getElementById("myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Titulo"].replace(/\\s/g, '') %>"), {
                                      type: 'pie',
                                      data: {
                                        labels: [],
                                        datasets: [{
                                          label: "Population (millions)",
                                          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                                          data: []
                                        }]
                                      },
                                      options: {
                                        title: {
                                          display: true,
                                          text: 'Predicted world population (millions) in 2050'
                                        }
                                      }
                                    });
                                    </script>  
                                    <!-- END CHART -->                      
                                  </div>
                                </div>
                                <!-- End Card Dark -->                          
                                </div>
                            <% } %>

                            <!-- Tiene 1 objeto (Etiqueta)-->
                            <% if(objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] === 'Etiqueta'){ %>
                              <div class="alert alert-info" id="etiqueta_<%- objPanels["objeto"][indexObj]["_attributes"]["id"] %>" style="position:absolute; top:<%= objPanels["objeto"][indexObj]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"][indexObj]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"][indexObj]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"][indexObj]["_attributes"]["Weight"] %>px;">
                                <%= objPanels["objeto"][indexObj]["_attributes"]["Texto"] || 'Esperando...'%>
                              </div>
                            <% } %> 

                            <!-- Tiene 1 objeto (filtro)-->
                            <% if(objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] === 'Filtro'){ %>
                              <% if(!Array.isArray(objPanels["objeto"][indexObj]["parametro"])){ %>
                                <div class="input-group mb-3" style="position:absolute; top:<%= objPanels["objeto"][indexObj]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"][indexObj]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"][indexObj]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"][indexObj]["_attributes"]["Weight"] %>px;">
                                    <input type="text" class="form-control" id="input_<%- objPanels["objeto"][indexObj]["parametro"]["_attributes"]["Nombre"] %>" placeholder="<%= objPanels["objeto"][indexObj]["parametro"]["_attributes"]["Etiqueta"] %>">
                                    <button class="btn btn-outline-secondary" type="button" id="btn_<%- objPanels["objeto"][indexObj]["_attributes"]["Titulo"].replace(/\\s/g, '') %>">Ingresar</button>
                                </div>                               
                                <script>
                                $(document).ready(function () {
                                    $("#btn_<%- objPanels["objeto"][indexObj]["_attributes"]["Titulo"].replace(/\\s/g, '') %>").click(function () {
                                        
                                        var refes = [];
                                        var x = document.getElementById("input_<%- objPanels["objeto"][indexObj]["parametro"]["_attributes"]["Nombre"] %>").value || 1;
                                        
                                        refes.push({ref: '<%- objPanels["objeto"][indexObj]["parametro"]["_attributes"]["Nombre"] %>', value: x})
                                        
                                        var arrayContent= <%- JSON.stringify(objPanels["objeto"]) %>;
                                        console.log(arrayContent)
                                        $.post("/request",
                                          {
                                            ref: JSON.stringify(refes),
                                            objectos_modifi: JSON.stringify(arrayContent),
                                            columnaLabel: '<%- objPanels["objeto"][indexObj-1]["_attributes"]["columnaLabel"].replace(/\\s/g, '') %>',
                                            columnaValor: '<%- objPanels["objeto"][indexObj-1]["_attributes"]["columnaValor"].replace(/\\s/g, '') %>'
                                          },
                                          function (data, status) {
                                             console.log(data[0].columna_Valor);
                                             console.log(data[0].columna_Label);
                                             
                                             console.log(data[0].newObjPanels);
                                             for (
                                              let indexNewPanels = 0;
                                              indexNewPanels < Object.keys(data[0].newObjPanels).length;
                                              indexNewPanels++
                                            ) {
                                              console.log(data[0].newObjPanels[indexNewPanels]._attributes['xsi:type']);
                                              if(data[0].newObjPanels[indexNewPanels]._attributes['xsi:type'].split(':')[1] === 'Etiqueta'){
                                               var nameX = 'etiqueta_' + data[0].newObjPanels[indexNewPanels]._attributes['id'];
                                               console.log('HERE',nameX);
                                               var x = document.getElementById(nameX);
                                               console.log(x)
                                               x.innerHTML = data[0].newObjPanels[indexNewPanels]._attributes['columna'] || data[0].newObjPanels[indexNewPanels]._attributes['Texto'];
                                              }
                                            }

                                             
                                             <% if(objPanels["objeto"][indexObj-1]["_attributes"]["xsi:type"].split(':')[1] === 'Medidor'){ %>
                                              <!-- Filtro (MEDIDOR)-->  
                                              document.getElementById("input_<%- objPanels["objeto"][indexObj-1]["_attributes"]["Titulo"].replace(/\\s/g, '') %>").innerHTML = data[0].columna_Label;
                                              var myConfig<%- objPanels["objeto"][indexObj-1]["_attributes"]["Titulo"].replace(/\\s/g, '') %> = {
                                                "type":"gauge",
                                                "scale-r":{
                                                  "aperture":200,
                                                  "values":"0:1000:200",
                                                  item:{
                                                    offsetR:0,
                                                    rules:[
                                                      {
                                                        rule:'%i == 9',
                                                        offsetX:15
                                                      }
                                                    ]
                                                  },
                                                  ring:{
                                                    size:10,
                                                  },
                                                },
                                                "series":[
                                                  {
                                                    "values":[<%- objPanels["objeto"][indexObj-1]["_attributes"]["Umbral"] %>],
                                                    "csize":"5%", //Needle Umbral Width
                                                    "size":"100%",  //Needle Indicator Length
                                                    "background-color":"#000000"      
                                                  },
                                                  {
                                                    "values":[parseFloat(data[0].columna_Valor)],
                                                    "csize":"15%", //Needle Indicator Width
                                                    "size":"75%",  //Needle Indicator Length
                                                    "background-color":"#CC0066" 
                                                  },
                                                ]
                                              };
                                              
                                              zingchart.render({ 
                                                id : 'myChart<%- objPanels["objeto"][indexObj-1]["_attributes"]["Titulo"].replace(/\\s/g, '') %>', 
                                                data : myConfig<%- objPanels["objeto"][indexObj-1]["_attributes"]["Titulo"].replace(/\\s/g, '') %>, 
                                                height : "200px", 
                                                width: "100%" 
                                              });
                                              <% } %>     
                                              
                                              <% if(objPanels["objeto"][indexObj-1]["_attributes"]["xsi:type"].split(':')[1] === 'Pastel'){ %>
                                                <!-- Filtro (PASTEL)-->  
                                                var pastelChart = chartPastel;
                                                pastelChart.data.labels = []
                                                pastelChart.data.labels = data[0].columna_Label;
                                                pastelChart.data.datasets[0].data = [];
                                                pastelChart.data.datasets[0].data = data[0].columna_Valor;
                                                pastelChart.update();
                                                console.log("entra", pastelChart)
                                                <% } %> 
                                            });
                                    });
                                });
                                </script> 
                              <% }  else {%>
                                    <div class="input-group mb-3" style="position:absolute; top:<%= objPanels["objeto"][indexObj]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"][indexObj]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"][indexObj]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"][indexObj]["_attributes"]["Weight"] %>px;">
                                      <% for(var indexParam=0; indexParam < Object.keys(objPanels["objeto"][indexObj]["parametro"]).length; indexParam++) { %>
                                        <input type="text" class="form-control" id="input_<%- objPanels["objeto"][indexObj]["parametro"][indexParam]["_attributes"]["Nombre"] %>" placeholder="<%= objPanels["objeto"][indexObj]["parametro"][indexParam]["_attributes"]["Etiqueta"] %>">
                                      <% } %>
                                    <button class="btn btn-outline-secondary" type="button" id="btn_<%- objPanels["objeto"][indexObj]["_attributes"]["Titulo"].replace(/\\s/g, '') %>">Ingresar</button>
                                    </div> 
                                <% }%>
                            <% } %>
                        <% } %> 
                    <% } else {%>
                        <!-- Tiene 1 objeto -->
                        <!-- Tiene 1 objeto (medidor)-->
                        <% if(objPanels["objeto"]["_attributes"]["xsi:type"].split(':')[1] === 'Medidor'){ %>
                            <!-- Start Card Dark -->
                            <div class="card text-white bg-dark mb-2">
                              <h5 class="card-header">Titulo: <%= objPanels["objeto"]["_attributes"]["Titulo"] %></h5>
                              <div class="card-body">
                                <h5 class="card-title">Tipo: <%= objPanels["objeto"]["_attributes"]["xsi:type"].split(':')[1] %></h5>
                                CHART MEDIDOR                     
                              </div>
                            </div>
                            <!-- End Card Dark -->
                        <% } %>
                        <!-- Tiene 1 objeto (Filtro)-->
                        <% if(objPanels["objeto"]["_attributes"]["xsi:type"].split(':')[1] === 'Filtro'){ %>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                            </div>
                        <% } %>
                    <% } %> 
                </div>
            </section>
    </div>
    `;
  }
  return contentPanel;
};

// NEW CREATE PAGES V2
const createPageNewV2 = (modelJSON) => {
  const numpPages = Object.keys(modelJSON["pagina"]).length;
  console.log(colors.bgMagenta("Pages to create V2", numpPages));

  for (const keyPage in modelJSON["pagina"]) {
    let pathSave = `./${modelJSON["_attributes"]["Url"]}/views/${modelJSON["pagina"][keyPage]["_attributes"]["TituloPagina"]}V2.ejs`;
    let content = `<% layout('layouts/boilerplateV2') %>
    <section class="content-pages">
    <div class="row">
      <div class="col-12">
        <div class="card border-0 shadow-xs mb-2">
          <div class="card-header bg-gradient-info text-white pb-0">
            <div class="d-sm-flex align-items-center">
              <div>
                <h6 class=" text-lg mb-0">
                  ${modelJSON["pagina"][keyPage]["_attributes"]["TituloPagina"]}
                </h6>
                <p class="text-sm mb-3"><strong>Descripcion: </strong> ${modelJSON["pagina"][keyPage]["_attributes"]["Descripcion"]}</p>
                
                </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 text-dark" style="position:relative; height:500px;">
        <div class="content-panels border-top border-secondary border-0 mt-0" style="position: relative">
          string-panels          
        </div>
      </div>
    </div>
    </section>    
    `;

    // Create Panels
    let stringPanel = createPanelsNewV2(modelJSON, keyPage);

    // // Replace string-panels
    content = content.replace("string-panels", stringPanel);

    try {
      fs.writeFileSync(pathSave, content);
      console.log(colors.bgBlue("New Page: " + pathSave));
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  console.log(colors.bgMagenta("-----------------------------"));
};

const createPanelsNewV2 = (modelJSON, keyPage) => {
  const isArray = Array.isArray(modelJSON["pagina"][keyPage]["panel"]);
  let contentPanel = ``;
  if (isArray) {
    console.log("Panels to create in page [" + keyPage + "] > 1");
    contentPanel = `
    CODE TO MORE THAT 1 PANEL
    `;
  } else {
    console.log("Panels to create in page [" + keyPage + "] = 1");
    contentPanel = `
    <div class="col-md-6 border border-3 border-light" style="position:absolute; top:<%= objPanels["_attributes"]["Y"] %>px; left:<%= objPanels["_attributes"]["X"] %>px; height:<%= objPanels["_attributes"]["Height"] %>px; width:<%= objPanels["_attributes"]["Weight"] %>px;">
      <div class="border-bottom border-0 border-light"><div class="bg-success text-sm text-white"><%= objPanels["_attributes"]["Titulo"] %></div></div>
      <section class="content-panels-objects">
        <!-- string-panels-objects -->
        <% if(Array.isArray(objPanels["objeto"])){ %>
          <!-- Tiene mas de 1 objeto -->
          <% for(var indexObj=0; indexObj < Object.keys(objPanels["objeto"]).length; indexObj++) { %>
            <!-- Tiene 1 objeto (medidor)-->
            <% if(objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] === 'Medidor'){ %>
              <div class="border border-1 border-light" style="position:absolute; top:<%= objPanels["objeto"][indexObj]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"][indexObj]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"][indexObj]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"][indexObj]["_attributes"]["Weight"] %>px;">
                  <div id='myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>'></div>
                  <div class='bg-primary text-white text-sm m-0 p-0'><%= objPanels["objeto"][indexObj]["_attributes"]["columnaLabel"]%></div>
                  <!-- SCRIPT CHART MEDIDOR -->
                  <script>
                  var myConfig<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%> = {
                    type: "gauge",
                    "scale-r": {                      
                      aperture: 200,
                      values: "0:100:20",
                    },
                    series: [
                      {
                        values: [<%- objPanels["objeto"][indexObj]["_attributes"]["columnaValor"]%>],
                        csize: "15%", //Needle Indicator Width
                        size: "75%", //Needle Indicator Length
                        "background-color": "#CC0066",
                      },
                    ],
                  };
                
                  zingchart.render({
                    id: "myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>",
                    data: myConfig<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>,
                    height: "230px",
                    width: "300px",
                  });
                  </script>  
                  <!-- END SCRIPT CHART MEDIDOR -->
              </div>
            <% } %> 

            <!-- Tiene 1 objeto (lineas)-->
            <% if(objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] === 'Lineas'){ %>
              <div class="border border-1 border-light" style="position:absolute; top:<%= objPanels["objeto"][indexObj]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"][indexObj]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"][indexObj]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"][indexObj]["_attributes"]["Weight"] %>px;">
                  <div id='myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>'></div>
              </div>
            <% } %> 

            <!-- Tiene 1 objeto (etiqueta)-->
            <% if(objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] === 'Etiqueta'){ %>
              <div class="border border-0 border-light" style="position:absolute; top:<%= objPanels["objeto"][indexObj]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"][indexObj]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"][indexObj]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"][indexObj]["_attributes"]["Weight"] %>px;">
                  <div id='myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>' class="alert bg-gradient-info text-dark  text-white ">
                    <%= objPanels["objeto"][indexObj]["_attributes"]["columna"]%>
                  </div>
              </div>
            <% } %> 

            <!-- Tiene 1 objeto (Link)-->
            <% if(objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] === 'Link'){ %>
              <div class="border border-0 border-light" style="position:absolute; top:<%= objPanels["objeto"][indexObj]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"][indexObj]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"][indexObj]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"][indexObj]["_attributes"]["Weight"] %>px;">
                <a href="<%- objPanels["objeto"][indexObj]["_attributes"]["url"] || menu[objPanels["objeto"][indexObj]["_attributes"]["pagina"].split('.')[1]] %>" class="text-info">
                  <u><%= objPanels["objeto"][indexObj]["_attributes"]["url"] || 'Pagina ' + objPanels["objeto"][indexObj]["_attributes"]["pagina"].split('.')[1] %></u>
                </a>
              </div>
            <% } %>

            <!-- Tiene 1 objeto (pastel)-->
            <% if(objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] === 'Pastel'){ %>
              <div class="border border-2 border-light" style="position:absolute; top:<%= objPanels["objeto"][indexObj]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"][indexObj]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"][indexObj]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"][indexObj]["_attributes"]["Weight"] %>px;">
                  <div id='myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>'></div>
                  <!-- SCRIPT CHART PASTEL -->
                  <script>
                  var myConfig<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%> = {
                    type: "pie",
                    legend: {
                      x: "78%",
                      y: "5%",
                      'border-width': 1,
                      'border-color': "gray",
                      'border-radius': "5px",
                      header: {
                        text: "Leyenda",
                        'font-family': "Open Sans",
                        'font-size':12,
                        'font-color': "#3333cc",
                        'font-weight': "normal"
                      },
                      marker: {
                        type: "circle"
                      },
                      'toggle-action': "remove",
                      'minimize': true,
                      'icon': {
                        'line-color': "#9999ff"
                      },
                      'max-items':8,
                      'overflow': "scroll"
                    },
                    plot: {
                      borderColor: "#2B313B",
                      borderWidth: 5,
                      // slice: 90,
                      valueBox: {
                        placement: "out",
                        text: "%npv%",
                        fontFamily: "Open Sans",
                      },
                      tooltip: {
                        fontSize: "18",
                        fontFamily: "Open Sans",
                        padding: "5 10",
                        text: "%t",
                      },
                      animation: {
                        effect: 2,
                        method: 5,
                        speed: 900,
                        sequence: 1,
                        delay: 3000,
                      },
                    },
                    plotarea: {
                      margin: "20 0 0 0",
                    },
                    series: [
                      {
                        values: [<%- objPanels["objeto"][indexObj]["_attributes"]["columnaValor"][0]%>],
                        text: <%- objPanels["objeto"][indexObj]["_attributes"]["columnaLabel"][0]%>,
                        backgroundColor: "#50ADF5",
                      },
                      {
                        text: <%- objPanels["objeto"][indexObj]["_attributes"]["columnaLabel"][1]%>,
                        values: [<%- objPanels["objeto"][indexObj]["_attributes"]["columnaValor"][1]%>],
                        backgroundColor: "#6877e5",
                      },
                      {
                        text: <%- objPanels["objeto"][indexObj]["_attributes"]["columnaLabel"][2]%>,
                        values: [<%- objPanels["objeto"][indexObj]["_attributes"]["columnaValor"][2]%>],
                        backgroundColor: "#6FB07F",
                      },
                    ],
                  };
                
                  zingchart.render({
                    id: "myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>",
                    data: myConfig<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>,
                    height: "85%",
                    width: "99%",
                  });
                  </script>  
                  <!-- END SCRIPT CHART PASTEL -->
              </div>
            <% } %>  

            <!-- Tiene 1 objeto (barras)-->
            <% if(objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] === 'Barras'){ %>
              <div class="border border-2 border-light" style="position:absolute; top:<%= objPanels["objeto"][indexObj]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"][indexObj]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"][indexObj]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"][indexObj]["_attributes"]["Weight"] %>px;">
                  <div id='myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>'></div>
                  <div class='text-sm m-0 p-0'><%= objPanels["objeto"][indexObj]["_attributes"]["columnaLabel"]%></div>
                  <!-- SCRIPT CHART BARRAS -->
                  <script>
                  let chartConfigBarras<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%> = {
                    type: "bar",
                    plot: {
                      valueBox: {
                        text:"%t",
                        backgroundColor: 'black',
                      }
                    },
                    scaleX: {
                      values: [<%- objPanels["objeto"][indexObj]["_attributes"]["columnaLabel"]%>],
                    },
                    series: [
                      {
                        values: [20, 40, 25, 50, 15, 45, 33, 34],
                      },
                    ],
                  };
                
                  zingchart.render({
                    id: "myChart<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>",
                    data: chartConfigBarras<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>,
                    height: "80%",
                    width: "80%",
                  });
                  </script>  
                  <!-- END SCRIPT CHART BARRAS -->
              </div>
            <% } %> 

            <!-- Tiene 1 objeto (filtro)-->
            <% if(objPanels["objeto"][indexObj]["_attributes"]["xsi:type"].split(':')[1] === 'Filtro'){ %>
              <div class="border border-2 border-primary rounded-1" style="position:absolute; top:<%= objPanels["objeto"][indexObj]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"][indexObj]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"][indexObj]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"][indexObj]["_attributes"]["Weight"] %>px;">
              <div class="border-bottom border-0 border-light"><div class="p-1 bg-primary text-white rounded-1"><%= objPanels["objeto"][indexObj]["_attributes"]["Titulo"] %></div></div>
              <% if(!Array.isArray(objPanels["objeto"][indexObj]["parametro"])){ %>
                  <div id='filtro<%- objPanels["objeto"][indexObj]["_attributes"]["Id"]%>'>
                    <div class="form-group mb-1">
                      <input type="text" class="form-control" id="input<%- objPanels["objeto"][indexObj]["parametro"]["_attributes"]["Nombre"] %>" placeholder="<%= objPanels["objeto"][indexObj]["parametro"]["_attributes"]["Etiqueta"] %>">
                    </div>
                    <button class="btn btn-dark btn-sm" type="button" onclick='sendObj(<%- JSON.stringify(objPanels["objeto"]) %>)'>Ingresar</button>
                  </div>
                  <script>
                    function sendObj(obj) {
                      var objSend = obj;
                      var value = $("#input<%- objPanels["objeto"][indexObj]["parametro"]["_attributes"]["Nombre"] %>").val();
                      var referencia = <%- JSON.stringify(objPanels["objeto"][indexObj]["parametro"]["_attributes"]["Nombre"]) %>
                      $.post(
                        "/request",
                        {
                          objSend: JSON.stringify(objSend),
                          value: JSON.stringify(value),
                          referencia: JSON.stringify(referencia)
                        },
                        function (data, status) {
                          console.log(data[0].newresObj[0]['_attributes']['columnaLabel']);
                          console.log(data[0].newresObj[0]['_attributes']['columnaValor']);
                          var myConfig = {
                            type: "line",
                            plotarea: {
                              "adjust-layout": true,
                            },
                            "scale-x": {
                              label: {
                                text: data[0].newresObj[0]['_attributes']['Titulo'],
                              },
                              labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                            },
                            series: [
                              {
                                values: data[0].newresObj[0]['_attributes']['columnaValor'],
                              },
                            ],
                          };

                          var nameChart = 'myChart' + data[0].newresObj[0]["_attributes"]["Id"];
                          console.log(nameChart)
                        
                          zingchart.render({
                            id: nameChart,
                            data: myConfig,
                            height: "80%",
                            width: "80%",
                          });
                        }
                      );
                    }
                  </script>
              <% } else { %>
                <!-- Tiene mas de 1 parametro el filtro -->
                <div>
                  <% for(var indexParams=0; indexParams < Object.keys(objPanels["objeto"][indexObj]["parametro"]).length; indexParams++) { %>
                      <div class="form-group mb-1">
                        <input type="text" class="form-control" id="input<%- objPanels["objeto"][indexObj]["parametro"][indexParams]["_attributes"]["Nombre"] %>" placeholder="<%= objPanels["objeto"][indexObj]["parametro"][indexParams]["_attributes"]["Etiqueta"] %>" value="<%= objPanels["objeto"][indexObj]["parametro"][indexParams]["_attributes"]["Predeterminado"] || '' %>">
                      </div>                  
                  <% } %> 
                  <button class="btn btn-dark btn-sm" type="button" onclick='sendObj(<%- JSON.stringify(objPanels["objeto"]) %>)'>Ingresar</button>
                </div>
                <script>
                    function sendObj(obj) {
                      var objSend = obj;
                      var valueIni = $("#input<%- objPanels["objeto"][indexObj]["parametro"][0]["_attributes"]["Nombre"] %>").val();
                      var valueFin = $("#input<%- objPanels["objeto"][indexObj]["parametro"][1]["_attributes"]["Nombre"] %>").val();

                      var referenciaIni = <%- JSON.stringify(objPanels["objeto"][indexObj]["parametro"][0]["_attributes"]["Nombre"]) %>;
                      var referenciaFin = <%- JSON.stringify(objPanels["objeto"][indexObj]["parametro"][1]["_attributes"]["Nombre"]) %>;

                      $.post(
                        "/request",
                        {
                          objSend: JSON.stringify(objSend),
                          valueIni: JSON.stringify(valueIni),
                          valueFin: JSON.stringify(valueFin),
                          referenciaIni: JSON.stringify(referenciaIni),
                          referenciaFin: JSON.stringify(referenciaFin),
                        },
                        function (data, status) {
                          console.log(data[0].newresObj[0]['_attributes']['columnaLabel']);
                          console.log(data[0].newresObj[0]['_attributes']['columnaValor']);
                          var myConfig = {
                            type: "line",
                            plotarea: {
                              "adjust-layout": true,
                            },
                            "scale-x": {
                              label: {
                                text: data[0].newresObj[0]['_attributes']['Titulo'],
                              },
                              labels: data[0].newresObj[0]['_attributes']['columnaLabel'],
                            },
                            series: [
                              {
                                values: data[0].newresObj[0]['_attributes']['columnaValor'],
                              },
                            ],
                          };

                          var nameChart = 'myChart' + data[0].newresObj[0]["_attributes"]["Id"];
                          console.log(nameChart)
                        
                          zingchart.render({
                            id: nameChart,
                            data: myConfig,
                            height: "80%",
                            width: "80%",
                          });
                        
                        }
                      );
                    }
                </script>
              <% } %>
              </div>
            <% } %> 
          <% } %> 
        <% } else {%>
          <!-- Tiene 1 objeto (barras)-->
            <% if(objPanels["objeto"]["_attributes"]["xsi:type"].split(':')[1] === 'Barras'){ %>
              <div class="border border-2 border-light" style="position:absolute; top:<%= objPanels["objeto"]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"]["_attributes"]["Weight"] %>px;">
                  <div id='myChart<%- objPanels["objeto"]["_attributes"]["Id"]%>'></div>
                  <!-- SCRIPT CHART BARRAR -->
                  <script>
                  let chartConfig<%- objPanels["objeto"]["_attributes"]["Id"]%> = {
                    type: "bar",
                    scaleX: {
                      values: [<%- objPanels["objeto"]["_attributes"]["columnaLabel"]%>],
                    },
                    series: [
                      {
                        values: [<%- objPanels["objeto"]["_attributes"]["columnaValor"] %>],
                      },
                    ],
                  };
                
                  zingchart.render({
                    id: "myChart<%- objPanels["objeto"]["_attributes"]["Id"]%>",
                    data: chartConfig<%- objPanels["objeto"]["_attributes"]["Id"]%>,
                    height: "90%",
                    width: "99%",
                  });
                  </script>  
                  <!-- END SCRIPT CHART BARRAS -->
              </div>
            <% } %> 
            <!-- Tiene 1 objeto (pastel)-->
            <% if(objPanels["objeto"]["_attributes"]["xsi:type"].split(':')[1] === 'Pastel'){ %>
              <div class="border border-2 border-light" style="position:absolute; top:<%= objPanels["objeto"]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"]["_attributes"]["Weight"] %>px;">
                  <div id='myChart<%- objPanels["objeto"]["_attributes"]["Id"]%>'></div>
                  <!-- SCRIPT CHART PASTEL -->
                  <script>
                  var myConfig<%- objPanels["objeto"]["_attributes"]["Id"]%> = {
                    type: "pie",
                    plot: {
                      borderColor: "#2B313B",
                      borderWidth: 5,
                      // slice: 90,
                      valueBox: {
                        placement: "out",
                        text: "%t",
                        fontFamily: "Open Sans",
                      },
                      tooltip: {
                        fontSize: "18",
                        fontFamily: "Open Sans",
                        padding: "5 10",
                        text: "%npv%",
                      },
                      animation: {
                        effect: 2,
                        method: 5,
                        speed: 900,
                        sequence: 1,
                        delay: 3000,
                      },
                    },
                    plotarea: {
                      margin: "20 0 0 0",
                    },
                    series: [
                      {
                        values: [<%- objPanels["objeto"]["_attributes"]["columnaValor"][0]%>],
                        text: <%- objPanels["objeto"]["_attributes"]["columnaLabel"][0]%>,
                        backgroundColor: "#50ADF5",
                      },
                      {
                        text: <%- objPanels["objeto"]["_attributes"]["columnaLabel"][1]%>,
                        values: [<%- objPanels["objeto"]["_attributes"]["columnaValor"][1]%>],
                        backgroundColor: "#6877e5",
                      },
                      {
                        text: <%- objPanels["objeto"]["_attributes"]["columnaLabel"][2]%>,
                        values: [<%- objPanels["objeto"]["_attributes"]["columnaValor"][2]%>],
                        backgroundColor: "#6FB07F",
                      },
                    ],
                  };
                
                  zingchart.render({
                    id: "myChart<%- objPanels["objeto"]["_attributes"]["Id"]%>",
                    data: myConfig<%- objPanels["objeto"]["_attributes"]["Id"]%>,
                    height: "85%",
                    width: "99%",
                  });
                  </script>  
                  <!-- END SCRIPT CHART PASTEL -->
              </div>
            <% } %> 
            <!-- Tiene 1 objeto (barras)-->
            <% if(objPanels["objeto"]["_attributes"]["xsi:type"].split(':')[1] === 'Barras'){ %>
              <div class="border border-2 border-light" style="position:absolute; top:<%= objPanels["objeto"]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"]["_attributes"]["Weight"] %>px;">
                  <div id='myChart<%- objPanels["objeto"]["_attributes"]["Id"]%>'></div>
                  <!-- SCRIPT CHART BARRAR -->
                  <script>
                  let chartConfigBarras<%- objPanels["objeto"]["_attributes"]["Id"]%> = {
                    type: "bar",
                    stacked: true,
                    plot: {
                      valueBox: {
                        text:"Total: %stack-total",
                        backgroundColor: '',
                      }
                    },
                    scaleX: {
                      values: [<%- objPanels["objeto"]["_attributes"]["columnaLabel"]%>],
                    },
                    series: [
                      {
                        values: [<%- objPanels["objeto"]["_attributes"]["columnaValor"] %>],
                      },
                    ],
                  };
                
                  zingchart.render({
                    id: "myChart<%- objPanels["objeto"]["_attributes"]["Id"]%>",
                    data: chartConfigBarras<%- objPanels["objeto"]["_attributes"]["Id"]%>,
                    height: "90%",
                    width: "99%",
                  });
                  </script>  
                  <!-- END SCRIPT CHART BARRAS -->
              </div>
            <% } %> 
            <!-- Tiene 1 objeto (grilla)-->
            <% if(objPanels["objeto"]["_attributes"]["xsi:type"].split(':')[1] === 'Grilla'){ %>
              <div class="border border-2 border-light" style="position:absolute; top:<%= objPanels["objeto"]["_attributes"]["Y"] %>px; left:<%= objPanels["objeto"]["_attributes"]["X"] %>px; height:<%= objPanels["objeto"]["_attributes"]["Height"] %>px; width:<%= objPanels["objeto"]["_attributes"]["Weight"] %>px;">
                  <div id='myChart<%- objPanels["objeto"]["_attributes"]["Id"]%>'>
                  <table class="table">
                    <thead class="bg-gray-100">
                      <tr>
                      <th scope="col" class="text-secondary text-xs font-weight-semibold opacity-7 border-light ps-2">ID</th>
                      <th scope="col" class="text-secondary text-xs font-weight-semibold opacity-7 border-light ps-2">Metrica</th>
                      <th scope="col" class="text-secondary text-xs font-weight-semibold opacity-7 border-light ps-2">Valor</th>
                      <th scope="col" class="text-secondary text-xs font-weight-semibold opacity-7 border-light ps-2">Tipo</th>

                      </tr>
                    </thead>
                    <tbody>                      
                        <% for(var ix=0; ix < Object.keys(objPanels["objeto"]["_attributes"]["columna"][0]).length; ix++) { %>                     
                          <tr>
                          <% for(var iy=0; iy < Object.keys(objPanels["objeto"]["_attributes"]["columna"]).length; iy++) { %>
                            <td class="text-sm text-secondary mb-0"><%= objPanels["objeto"]["_attributes"]["columna"][iy][ix]%></td>                  
                          <% } %>
                          </tr>
                        <% } %>
                    </tbody>
                  </table>
                  </div>
                  <!-- SCRIPT CHART GRILLA -->
                  <script>
                  </script>  
                  <!-- END SCRIPT CHART GRILLA -->
              </div>
            <% } %>
        <% }%> 
      </section>
    </div>
    `;
  }
  return contentPanel;
};

module.exports = {
  createLayout,
  createHome,
  createPageNew,
  createLayoutV2,
  createHomeV2,
  createPageNewV2,
};
