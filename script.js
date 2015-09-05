

var Puppies = (function(){

  function init(){
    _startRefreshListener();
    _setSubmitListener();
    _startAdoptListener();
    _getBreeds();
    console.log("init");
  }

  function _getBreeds(){
    object = $.ajax({
      url: "https://pacific-stream-9205.herokuapp.com/breeds.json",
      type: "GET",
        success: function( json ){

        console.log("get breeds success");
        $breedMenu = $(".breed-menu");
        for (var i in json){
          var name = json[i].name;
          var id = json[i].id;
          var string = "<option value='" + id + "'>"+ name+"</option>";
          $breedMenu.append(string);
        }
      },
    });
  }

  function _startRefreshListener(){
    $('.refresh-puppies').click(function(){
      console.log("refresh puppies!");
      updatePuppies();
    });
  }

  function _startAdoptListener(){
    $('.puppies-list').on('click', 'a', function(e){
      console.log("adopted!");
      console.log(e.target);
      adoptPuppy(e.target);
    });
  }

  function _setSubmitListener(){
    $(".register").click(function(){
      console.log("add puppy!");
      addPuppy();
    });
  }

  function addPuppy(){
    var puppyName = $("#puppy-name").val();
    var puppyBreed = $("#breed-menu").val();
    $.ajax({
      url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
      type: "POST",
      data: JSON.stringify({name: puppyName, breed_id: puppyBreed}),
      success: function(){
        console.log("successful post");
        updateFlashBar("success");
        updatePuppies();},
      fail: function(){ console.log("fail post");},
      complete: function(){ console.log("complete post");},
      dataType: "json",
      contentType: "application/json",
      headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},
    });
  }

  function adoptPuppy(target){

    var puppyId = $(target).attr("id");
    console.log(puppyId);

    $.ajax({
      
      url: "https://pacific-stream-9205.herokuapp.com/puppies/"+puppyId+".json",

      type: 'DELETE',

      // data: JSON.stringify( puppyId),

      dataType: "json",

      contentType: "application/json",

      headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000'},



      success: function(result){
        updateFlashBar("success");
        updatePuppies();
      },

      error: function(result){
        updateFlashBar("failure");
      }
    });
  }

  function updateFlashBar(result){
    $bar = $(".flash-bar");
    $bar.addClass(result);
    if (result === "success"){
      $bar.text("Successful");
    } else {
      $bar.text("Failure");
    }
  }

  function updatePuppies(){


    $.ajax({
      url: "https://pacific-stream-9205.herokuapp.com/puppies.json",
      type: "GET",
      success: function( json ){
        console.log("success");
        buildPuppiesList( json );
      },

      error: function( xhr, status, errorThrown ){
        alert( "Sorry, there was a problem!" );
        console.log( "Error: "+ errorThrown );
        console.log( "Status: "+status );
      },

      complete: function( xhr, status ){
        console.log( "The request is complete! ");
      }

    });

    function buildPuppiesList( json ){
      // console.log(json);
      $list = $(".puppies-list");
      $list.empty();
      for( var i = json.length - 1; i >= 0; i-- ){
        var name = json[i].name;
        var breed = json[i].breed.name;
        var created = parseDate(json[i].created_at);
        var id = json[i].id;
        console.log(Date.now() - created)
        var timeString = getTimeAgo(Date.now() - created);
        var string = "<li>"+name+" ("+breed+"), created "+timeString+" <a id='"+id+"'>adopt</a></li>";
        $list.append(string);
      }


    }

    function parseDate(text) {
      return new Date(Date.parse(text.replace(/( +)/)));
    }

    function getTimeAgo(ms){
      var x = ms / 1000;
      seconds = Math.floor(x % 60);
      x /= 60;
      minutes =  Math.floor(x % 60);
      x /= 60;
      hours =  Math.floor(x % 24);
      x /= 24;
      days =  Math.floor(x);
      return days + " days " + hours + " hours " + minutes + " minutes ago.";
    }


  }

  return{
    update: updatePuppies,
    init: init
  };


})();

$(document).ready(function(){
  console.log("sdhfjsdhf");
  Puppies.init();
});
