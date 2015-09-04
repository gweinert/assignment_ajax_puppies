

var Puppies = (function(){

  function init(){
    _startRefreshListener();
    console.log("init");
  }

  function _startRefreshListener(){
    $('.refresh-puppies').click(function(){
      console.log("refresh puppies!");
      updatePuppies();
    });
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
      for( var i in json ){
        var name = json[i].name;
        var breed = json[i].breed.name;
        var created = parseDate(json[i].created_at);
        var timeString = getTimeAgo(created);
        var string = "<li>"+name+" ("+breed+"), created "+timeString+"</li>";
        $list.append(string);
      }
      

    }

    function parseDate(text) {
      return new Date(Date.parse(text.replace(/( +)/, ' UTC$1')));
    }

    function getTimeAgo(date){
      var str = '';
      str += date.getUTCDate()-1 + " days, ";
      str += date.getUTCHours() + " hours, ";
      str += date.getUTCMinutes() + " minutes, ";
      str += date.getUTCSeconds() + " seconds ago";
      console.log(str);
      return str;
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

