//var divAcc = document.getElementById("accordion");
var divAcc = $("#accordion")[0];


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

//		div = $("#accordion").append("<div class='divBox'></div>")[0];

function fillPageJQ(list) {

  var divBox;
  $(divAcc).empty();
  
  
  list.forEach(function(item, i, list) {
   //  divBox = $(divAcc).append("<div class='divBox'></div>");
    divTitle = $(divAcc).append("<a class='div-box accordion-section-title' href='#accordion"+i+"'>"+item.title+"</a>");
     $(divTitle).on('click', accoClickItem);
// 		// add handler on click
// 		divTitle.onclick = accoClickItem;
    
    $(divAcc).append("<a class='div-box rem' href='#remove"+i+"'>Remove node</a>").on('click', removeItem);
// 		// add handler on click
// 		remLink.onclick = removeItem;
		
    $(divAcc).append("<div class='div-box accordion-section-content' id='accordion"+i+"'>"+item.text+"</div>");
//    $(".div-box").wrap("<div class='divBox'></div>");
  });
}

fillPageJQ(jsList);


//-------------fill page with data---------------

function fillPage(list) {
	var remLink;
	var divBox;
	var i;
	
	//  clear divAcc befor create Accordion List
	//while(divAcc.firstChild) divAcc.removeChild(divAcc.firstChild); 
	$(divAcc).empty();
	
	
	for (i = 0; i < list.length; i++) {
    		divBox = document.createElement("div");
    		divBox.className = "divBox";
    		divAcc.appendChild(divBox);

		divTitle = document.createElement("a");
  		divTitle.className = "accordion-section-title";
		// add handler on click
		divTitle.onclick = accoClickItem;
  		divTitle.href = "#accordion"+i;
  		divBox.appendChild(divTitle);
		divTitle.appendChild(document.createTextNode(list[i].title));



		remLink = document.createElement("a");
  		remLink.className = "rem";
  		remLink.href = "#remove"+i;
		// add handler on click
		remLink.onclick = removeItem;
  		divBox.appendChild(remLink);
		remLink.appendChild(document.createTextNode("Remove node"));

		divText = document.createElement("div");
  		divText.id = "accordion"+i;
  		divText.className = "accordion-section-content";
  		divBox.appendChild(divText);
		divText.appendChild(document.createTextNode(list[i].text));
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
      fillPage(jsList);
    } else {
	$(this).removeClass("dec");
	$(this).addClass('inc');
	jsList.sort(compareObjects);
	fillPage(jsList);
    }
  });
});

//fillPage(jsList);


//-------------accordion---------------


    function closeAccoSection() {
        $('.accordion .accordion-section-title').removeClass('active');
        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }


function accoClickItem(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');
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
