// -- DOM準備完了後開始処理 (MAIN) --
$(document).ready(function(){

// function name(){
//   var a = new String("");
//   a = "てすと人";
//   $('.n1').text(a);
// }
  updateDate();

function updateDate(){ // -- 時計(日時曜日)を更新する --
  var date = new Date(),
      yy = date.getYear(),  mm = date.getMonth() + 1, 
      dd = date.getDate(),  day = ["日","月","火","水","木","金","土"],
      HH = date.getHours(), MM = date.getMinutes();
  if (yy < 2000) { yy += 1900; }
  if (mm < 10) { mm = "0" + mm; } if (dd < 10) { dd = "0" + dd; }
  if (HH < 10) { HH = "0" + HH; } if (MM < 10) { MM = "0" + MM; }
  var clockText = yy + "/" + mm + "/" + dd + " (" + day[date.getDay()] +") " + HH + ":" + MM;
  $('.today').html(clockText);
}

//---------------------  
  $("#System").click( function(){
//    $(".UserChoicePane").append(
//      "<div class=\"UserName\">test</div>"
//      );
   $(".UserChoicePane").append(
	"<FORM class=\"myForm\"><INPUT TYPE=button VALUE=\"TEXT\" NAME=\"object\" ONCLICK=expression> </FORM>"
    );

  });
//--------------------

});





