var json_data = '[{"title":"United Kingdom","text":"The United Kingdom of Great Britain and Northern Ireland, commonly known as the United Kingdom (UK) or Britain, is a sovereign state in Europe."}, \
{"title":"France","text":"France, officially the French Republic (French: R\u00e9publique fran\u00e7aise), is a unitary sovereign state comprising territory in western Europe and several overseas regions and territories."}, \
{"title":"Spain","text":"Spain (Spanish: Espa\u00f1a), officially the Kingdom of Spain (Spanish: Reino de Espa\u00f1a), is a sovereign state located on the Iberian Peninsula in southwestern Europe."}, \
{"title":"Germany","text":"Germany, officially the Federal Republic of Germany (German: Bundesrepublik Deutschland), is a federal parliamentary republic in western-central Europe."} \
]';

var div_acc = document.getElementById("accordion");
var rem_link;
var div_box;
var div_title;
var div_text;
var input;

var js_list = JSON.parse(json_data);

//-------------compare for sorting---------------

function compareObjects (a, b) {
  if (a.title > b.title) return 1;
  if (a.title < b.title) return -1;
  return 0;
};

js_list.sort(compareObjects);


//-------------fill page with data---------------

function fillpage(list) {
	var i;

	for (i = 0; i < list.length; i++) {
		//document.clear();
  		div_box = document.createElement("div");
  		div_box.className = "div_box";
  		div_acc.appendChild(div_box);

		div_title = document.createElement("a");
  		div_title.id = "div_title"+i;
  		div_title.className = "accordion-section-title";
  		div_title.href = "#accordion"+i;
  		div_box.appendChild(div_title);
		div_title.appendChild(document.createTextNode(list[i].title));

		rem_link = document.createElement("a");
  		rem_link.className = "rem";
  		rem_link.href = "#remove"+i;
  		div_box.appendChild(rem_link);
		rem_link.appendChild(document.createTextNode("Remove node"));

		div_text = document.createElement("div");
  		div_text.id = "accordion"+i;
  		div_text.className = "accordion-section-content";
  		div_box.appendChild(div_text);
		div_text.appendChild(document.createTextNode(list[i].text));
}
input = document.createElement("input");
input.id = "button";
input.type = "button";
input.className = "input";
div_box.appendChild(input);
input.value ="Re-order";

  
}

fillpage(js_list);

//-------------accordion---------------

$('document').ready(function() {
    function close_accordion_section() {
        $('.accordion .accordion-section-title').removeClass('active');
        $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
    }

    $('.accordion-section-title').click(function(e) {
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');

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

    $(this).parent('div').remove();

    return false;
  });
});




