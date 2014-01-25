// -- DOM準備完了後開始処理 (MAIN) --
$(document).ready(function(){

  updateDate();

  Model_Divs("./Master_Div.csv");

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
  
  $("#System").click( function(){
    $(".UserChoicePane").append(
      "<div class=\"UserName\">test</div>"
      );
  });


function View_updateDivButtons(divArray) { // -- 各課表示を更新する --

  for ( i=0 ; i < divArray.length ; i++ ) {
    $('.DivButton').append(
     "<DIV id=\"" + divArray[i][0] + "\">" + divArray[i][1] + "</div>" );
  }

}

function Model_Divs(filename) { // -- Model:課別のCSVファイルをボタンとして表示する --

  var myArray = $.get(filename,function(data){
    var myCsv = $.csv()(data);
    View_updateDivButtons(myCsv);
  });

}

});



// -- Debug関数 / オブジェクトのプロパティ一覧をalert --
function printProperties(obj) {
    var properties = '';
    for (var prop in obj){
        properties += prop + "=" + obj[prop] + "\n";
    }
    alert(properties);
}


