
var divAcc = document.getElementById("accordion");


var divTitle;
var divText;
var input;

var jsList = [{"title":"United Kingdom","text":"The United Kingdom of Great Britain and Northern Ireland, commonly known as the United Kingdom (UK) or Britain, is a sovereign state in Europe."}, 
{"title":"France","text":"France, officially the French Republic (French: R\u00e9publique fran\u00e7aise), is a unitary sovereign state comprising territory in western Europe and several overseas regions and territories."}, 
{"title":"Spain","text":"Spain (Spanish: Espa\u00f1a), officially the Kingdom of Spain (Spanish: Reino de Espa\u00f1a), is a sovereign state located on the Iberian Peninsula in southwestern Europe."}, 
{"title":"Germany","text":"Germany, officially the Federal Republic of Germany (German: Bundesrepublik Deutschland), is a federal parliamentary republic in western-central Europe."}];

//-------------compare for sorting INC---------------

function compareObjects (a, b) {
  if (a.title > b.title) return 1;
  if (a.title < b.title) return -1;
  return 0;
};

//-------------compare for sorting DEC---------------

function compareObjectsDec (a, b) {
  if (a.title < b.title) return 1;
  if (a.title > b.title) return -1;
  return 0;
};


jsList.sort(compareObjects);
// var initJsList = {};
// initJsList = jsList;//.sort(compareObjects);
// 
// 
// $(document).ready(function(){
//   var elButton = "<button class='btn-reload'>Reload</button>";
//   $("body").append(elButton);
//   $(".btn-reload").on('click', function(){
//     fillpage(initJsList);
//   });
// });


//-------------fill page with data---------------

function fillpage(list) {
	var remLink;
	var divBox;
	var i;
	var test;
	
	//  clear divAcc befor create Accordion List
	while(divAcc.firstChild) divAcc.removeChild(divAcc.firstChild); 
	
	for (i = 0; i < list.length; i++) {
  		divBox = document.createElement("div");
  		divBox.className = "divBox";
  		divAcc.appendChild(divBox);

		divTitle = document.createElement("a");
//   		divTitle.id = "divTitle"+i;
  		divTitle.className = "accordion-section-title";
  		divTitle.href = "#accordion"+i;
  		divBox.appendChild(divTitle);
		divTitle.appendChild(document.createTextNode(list[i].title));

		remLink = document.createElement("a");
  		remLink.className = "rem";
  		remLink.href = "#remove"+i;
  		divBox.appendChild(remLink);
		remLink.appendChild(document.createTextNode("Remove node"));

		divText = document.createElement("div");
  		divText.id = "accordion"+i;
  		divText.className = "accordion-section-content";
  		divBox.appendChild(divText);
		divText.appendChild(document.createTextNode(list[i].text));
		//alert("Done!");
}
  
}
$(document).ready(function(){
  var elButton = "<button class='btn inc'>Click me!</button>";
  $("body").append(elButton);
  $(".btn").on('click', function(){
    if($(this).is('.inc')) {
      $(this).removeClass("inc");
      $(this).addClass('dec');
      jsList.sort(compareObjectsDec);
      fillpage(jsList);
    } else {
	$(this).removeClass("dec");
	$(this).addClass('inc');
	jsList.sort(compareObjects);
	fillpage(jsList);
    }
  });
});

fillpage(jsList);


//-------------accordion---------------

$('document').ready(function() {
    function close_accordion_section() {
        $('.accordion .accordion-section-title').removeClass('active');
        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }

    $('.accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');
	//alert(currentAttrValue);

        if($(e.target).is('.active')) {
            close_accordion_section();
        }else {
            close_accordion_section();

            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
        }

        e.preventDefault();
    });
});

//-------------remove item---------------

$('document').ready(function(){
  $('#accordion .rem').click(function(){

    var remDiv = $(this).parent('div');
    var remDivText = remDiv.text();
    var divTitle = remDivText.substring(0, remDivText.indexOf('Remove',0));
    
//     alert(divTitle);
    remDiv.remove();

  for (i = 0; i < jsList.length; i++) {
    if(jsList[i].title === divTitle) {
      jsList.splice(i,1);
//       alert(jsList);
    } 
  }

     
    return false;
  });
});




