
var divAcc = $("#accordion");

var jsList = [{"title":"United Kingdom","text":"The United Kingdom of Great Britain and Northern Ireland, commonly known as the United Kingdom (UK) or Britain, is a sovereign state in Europe."}, 
{"title":"France","text":"France, officially the French Republic (French: R\u00e9publique fran\u00e7aise), is a unitary sovereign state comprising territory in western Europe and several overseas regions and territories."}, 
{"title":"Spain","text":"Spain (Spanish: Espa\u00f1a), officially the Kingdom of Spain (Spanish: Reino de Espa\u00f1a), is a sovereign state located on the Iberian Peninsula in southwestern Europe."}, 
{"title":"Germany","text":"Germany, officially the Federal Republic of Germany (German: Bundesrepublik Deutschland), is a federal parliamentary republic in western-central Europe."}];

//-------------compare for sorting INC---------------

function compareObjects (a, b) {
  if (a.title > b.title) return 1;
  if (a.title < b.title) return -1;
  return 0;
}

//-------------compare for sorting DEC---------------

function compareObjectsDec (a, b) {
  if (a.title < b.title) return 1;
  if (a.title > b.title) return -1;
  return 0;
}

jsList.sort(compareObjects);


//-------------fill page with data---------------

function fillPage(list) {
  var divBox;

  divAcc.empty();
  
  list.forEach(function(item, i, list) {
    divBox = $("<div class='divBox'></div>").appendTo(divAcc);
    $("<a class='accordion-section-title' id='#accordion"+i+"' href='#accordion"+i+"'></a>")
	.appendTo(divBox)
	.text(item.title)
	.on('click', accoClickItem);
    $("<a class='rem' id='#remove"+i+"' href='#remove"+i+"'>Remove node</a>")
	.appendTo(divBox)
	.on('click', removeItem);

    $("<div class='accordion-section-content' id='accordion"+i+"'></div>")
	.appendTo(divBox)
	.text(item.text);

  });
}

$(document).ready(fillPage(jsList));

$(document).ready(function(){
  
  $("<button class='btn inc'>Click me!</button>").appendTo("body").on('click', function(){
    if($(this).is('.inc')) {
      $(this).removeClass("inc");
      $(this).addClass('dec');
      jsList.sort(compareObjectsDec);
      fillPage(jsList);
    } else {
	$(this).removeClass("dec");
	$(this).addClass('inc');
	jsList.sort(compareObjects);
	fillPage(jsList);
    }
  });
});


//-------------accordion---------------


function closeAccoSection() {
  $('.accordion .accordion-section-title').removeClass('active');
  $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
}


function accoClickItem(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('id');
	//alert(currentAttrValue);

        if($(e.target).is('.active')) {
            closeAccoSection();
        }else {
            closeAccoSection();

            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
        }

        e.preventDefault();
}

//-------------remove item---------------

function removeItem(){

    var remDiv = $(this).parent('div');
    var remDivText = remDiv.text();
    var divTitle = remDivText.substring(0, remDivText.indexOf('Remove',0));
    
    remDiv.remove();

  for (i = 0; i < jsList.length; i++) {
    if(jsList[i].title === divTitle) {
      jsList.splice(i,1);
    } 
  } return false;
}
