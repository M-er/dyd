var app = angular.module('institucionalApp', ['ngMaterial']);
app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    '*://www.youtube.com/**'
  ]);
});

app.controller('institucionalCtrl', function($scope, $q, $http) {
  $scope.videos = [];
  $scope.hayDoc = false;
  $scope.hayVid = false;
  $scope.colores = ['badge-success','badge-warning','badge-danger', 'badge-info'];

  $scope.institucional = [];
  $scope.documentacion = [];

  $scope.d_construccion = [];
  $scope.d_agro = [];
  $scope.d_mineria = [];
  $scope.d_profesionales = [];
  $scope.d_generales = [];
  $scope.d_protocolos = [];
  $scope.d_seguridad = [];

  $scope.init = function() {
    var deferred;
    deferred = $q.defer();
    $http.get('../admin/api/institucional/all').then( function(resultado){
      var response = resultado['data'];
      angular.forEach(response, function(value, key) {
        if(value.habilitado){
          if(value.tipo==1){
            $scope.documentacion.push(value);
            switch (value.categoria) {
              case 'De la construcción':$scope.d_construccion.push(value);break;
              case 'Del agro':$scope.d_agro.push(value);break;
              case 'De la mineria':$scope.d_mineria.push(value);break;
              case 'Enfermedades profesionales':$scope.d_profesionales.push(value);break;
              case 'Leyes generales':$scope.d_generales.push(value);break;
              case 'Protocolos':$scope.d_protocolos.push(value);break;
              case 'Servicios de salud y seguridad':$scope.d_seguridad.push(value);break;
              default:
              break;
            }
          }
          else{
            value['url']="https://www.youtube.com/embed/"+value['path'];
            $scope.videos.push(value);
            console.dir(value);
          }
        }
      });
      console.dir($scope.d_construccion);
      $scope.hayDoc = ($scope.documentacion.length === 0)?false:true;
      $scope.hayVid = ($scope.videos.length === 0)?false:true;
    }).catch(function(resultado){
      deferred.reject(resultado);
    });
    return deferred.promise;
  };

});
$(document).ready(function() {
  init();

});
function init(){
  //loadInst();
  //loadVid();
}

function loadInst(){
  $.ajax({
    type: "post",
    data: {"t": "tInst"},
    url: "../co/macros.php",
    dataType: 'json',
    cache: false,
    success: function(datos, textStatus, jqXHR) {
      if (datos.err == 0) {
        if(datos.cant){
          $("#rowCarrouselInst").empty();
          var carrItem = document.createElement("div");
          var duplas = 0;
          carrItem.classList.add("active");
          var row = document.createElement("div");
          for(var i=0; i<datos.cant; i++){
            if(duplas == 2){
              row = document.createElement("div");
              duplas = 0;
              carrItem = document.createElement("div");
            }
            carrItem.classList.add("carousel-item");
            var col = document.createElement("div");
            var a = document.createElement("a");
            var font = document.createElement("i");
            var p = document.createElement("p");
            font.classList.add("far");
            font.classList.add("fa-file-pdf");
            font.classList.add("fa-3x");
            a.setAttribute("href", "./pdf/"+datos.documentacion[i].pathdocu);
            p.style.marginTop = "5px";
            p.style.marginBottom = "5px";
            p.innerHTML = datos.documentacion[i].vigdocu;
            a.innerHTML = datos.documentacion[i].nombdocu;
            row.classList.add("row");
            col.classList.add("col-sm-6");
            col.append(font);
            col.append(p);
            col.append(a);
            row.append(col);
            carrItem.append(row);
            duplas++;
            $("#rowCarrouselInst").append(carrItem);
          }
        }
      } else {
        console.log("Error: "+datos.txerr);
      }
    },

  });
}

function loadVid(){
  $.ajax({
    type: "post",
    data: {"t": "tVid"},
    url: "../co/macros.php",
    dataType: 'json',
    cache: false,
    success: function(datos, textStatus, jqXHR) {
      if (datos.err == 0) {
        if(datos.cant){
          $("#vidInst").append(col).empty();
          for(var i=0; i<datos.cant; i++){
            var col = document.createElement("div");
            col.classList.add("col-sm-4");
            var card = document.createElement("div");
            card.classList.add("card");
            card.classList.add("card-block");
            var emb = document.createElement("div");
            emb.classList.add("embed-responsive");
            emb.classList.add("embed-responsive-16by9");
            var iframe = document.createElement("iframe");
            iframe.classList.add("embed-responsive-item");
            iframe.src = datos.videos[i].urlvideo;
            emb.append(iframe);
            card.append(emb);
            col.append(card);
            $("#vidInst").append(col);
          }
        }
      } else {
        console.log("Error: "+datos.txerr);
      }
    },

  });
}
