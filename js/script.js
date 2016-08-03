$(document).ready(function(){

  $("#pokemonSelect").autocomplete({
    //Grab data from Pokémon Array
    source: pokemonArray.sort(SortByName),
    autoFocus: true,
    minLength: 1,
  });
  //Sort Pokémon Array in select alphabetically
  function SortByName(a, b) {
    var aName = a.species.toLowerCase();
    var bName = b.species.toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
  };
  // Overrides the default autocomplete filter function to search only from the beginning of the string
  $.ui.autocomplete.filter = function (array, term) {
    var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
    return $.grep(array, function (value) {
      return matcher.test(value.label || value.value || value);
    });
  };

  resetForm = function(){
    $('#pokemon-desc').remove();
    $('.number-input__wrapper').remove();
    $('.pokemon-avatar__wrapper li').remove();
    $('#addPokemonSpecies').remove();
    $('#pokemonSelect').val(''); return false;
    $('#pokemonNumber').val(''); return false;
  };

  // Reset entire field
  $('#resetPokemonSelect').on('click', function(e){
    e.preventDefault();
    resetForm();
  });

  //Pokémon Selector
  $('#pokemonSelect').on('autocompleteselect', function (e, ui) {

    //Remove former selection
    $('#pokemon-desc').remove();
    $('#addPokemonSpecies').remove();
    $("#pokemonFields").html('');

    $pokemonAvatar = function(){
      $("#pokemonFields").append('<li id="pokemon1" class="pokemon-avatar ' + ui.item.resourceName + '">' + '</li>');
      $('#poke-img').addClass(ui.item.resourceName);
      $('#poke-img').addClass('pokemon-avatar');
    };

    $pokemonNumberInput = function(){
      $('#pokemon-desc').append('<div class="number-input__wrapper"><label for="pokemonNumber">Number of <span class="species-instance">' + ui.item.value + ':</span></label> <input id="pokemonNumber" type="number" name="pokemonNumber" class="pokemon-number" min="0" value="1"></div>');
    }

    //Evolution is not possible on end states
    if(ui.item.evolve != true) {
      $pokemonAvatar(); //Generate first Pokémon avatar
      $('.number-input__wrapper').remove();  //Remove number selection if it's there
      $('.ui-widget').append('<p id="pokemon-desc">You chose <span class="species-instance">' + ui.item.value + '! </span> Unfortunately <span class="species-instance">' + ui.item.value + '</span> does not evolve. :( </p>'); //Inform user
      $('#pokemonSelect').val(''); return false;
    }

    //Add multiple Pokémon of one species
    else {
      //Generate first Pokémon avatar
      $pokemonAvatar();
      //Add choice + number input
      $('.ui-widget').append('<p id="pokemon-desc">You chose <span class="species-instance">' + ui.item.value + '!&nbsp;</span>').append($pokemonNumberInput());
      $('.buttons').append('<a id="addPokemonSpecies" href="javascript:void(0)" onclick="addPokemonSpecies();">Add Pokémon to Table</a>');
    }



    //Generate Pokémon avatars based on number input
    $('#pokemonNumber').on('keyup change', function() {
      var $numberPokemon = parseInt($("input[name='pokemonNumber']").val());

      //Reset avatars from previous selection
      $("#pokemonFields").html("");

      //Number input loop
      for (i = 1; i <= $numberPokemon; i++) {
        $pokemonAvatar();
      } // Reset value if input reaches 0
      if ( $("input[name='pokemonNumber']").val() < 1) {
        $('#pokemon-desc').remove();
        $('#pokemonFields').html('');
        $('#pokemonSelect').val(''); return false;
      }
    });

    //remove Pokémon on avatar close button and reset field data
    $(document).on('click','.pokemon-delete',function() {
      $(this).closest(".pokemon-avatar").remove();

      //Recalculate number input value on avatar removal
      var $numberPokemon = parseInt($("input[name='pokemonNumber']").val());
      var $newVal = $numberPokemon -=1;
      $("input[name='pokemonNumber']").val($newVal);

      //Remove Pokémon description if value reaches 0
      if ($newVal < 1){
        resetForm();
      }
    });

    //Remove Pokémon description if value reaches 0
    if ( $("input[name='pokemonNumber']").val() === 0) {
      resetForm();
    }


    // Add Pokémon to Table
    addPokemonSpecies = function(){

      var num = parseInt($('#pokemonNumber').val());
      var $tableInner = $('#finalDestination').find('tbody');
      $tableInner.append('<tr>').append('<td>' + num + '</td><td class="pokemon-avatar ' + ui.item.resourceName + '"></td>');
      resetForm();

    };
  });
});




// var $curNumberPokemon = function(num){
//   $(document).on('change', $('#pokemonNumber'), function(){
//     num = parseInt($('#pokemonNumber', this).val());
//     console.log(num);
//   })
// };

// $curNumberPokemon();
