  $('#cProd').carousel({
    interval: 2500
  });
  $('.carousel-control-prod.left').click(function() {
    $('#cProd').carousel('prev');
  });

  $('.carousel-control-prod.right').click(function() {
    $('#cProd').carousel('next');
  });
  $('#cInst').carousel({
    interval: 2500
  });
  $('.carousel-control-inst.left').click(function() {
   const options = $("#cInst").data()['bs.carousel']["_config"];
   options.interval = 2000;
   $('#cInst').carousel('prev');
 }).mouseup(function(){
  const options = $("#cInst").data()['bs.carousel']["_config"];
  options.interval = 2500;
})
 $('.carousel-control-inst.right').click(function() {
   const options = $("#cInst").data()['bs.carousel']["_config"];
   options.interval = 2000;
   $('#cInst').carousel('next');
 }).mouseup(function(){
  const options = $("#cInst").data()['bs.carousel']["_config"];
  options.interval = 2500;
})

 $('.carousel-control-prod.right').mousedown(function() {
  const options = $("#cProd").data()['bs.carousel']["_config"];
  options.interval = 1000;
  $('#cProd').carousel('next');
}).mouseup(function(){
  const options = $("#cProd").data()['bs.carousel']["_config"];
  options.interval = 2500;
})
$('.carousel-control-prod.left').mousedown(function() {
  const options = $("#cProd").data()['bs.carousel']["_config"];
  options.interval = 1000;
  $('#cProd').carousel('prev');
}).mouseup(function(){
  const options = $("#cProd").data()['bs.carousel']["_config"];
  options.interval = 2500;
})