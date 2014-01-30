// -- DOM準備完了後開始処理 (MAIN) --
$(document).ready(function(){

  updateDate();
  
  $("#System").click( function(){
    $(".UserChoicePane").append(
      "<div class=\"UserName\">test</div>"
      );
  });

  // -- オブジェクト生成時に画面更新関数を渡すパターン
  // var myDivPane = new Model_DivPane(View_updateDivPane);
  // myDivPane.updateObjArray();
  
  // -- オブジェクト生成後に画面更新関数を渡すパターン
  var myDivPane = new Model_DivPane();
  myDivPane.setUpdateView(View_updateDivPane);
  myDivPane.updateObjArray();

  //Debug
  // console.log( myDivPane.divObjArray );

});

// -- Model Object --
//
function Model_DivPane (callback) { // -- 課表示ペイン Model --
  // データ更新後の画面更新関数を callback として渡す

  // closed Propertys
  var updateView = callback;

  // Propertys
  this.divObjArray = new Array();     // 課名表示オブジェクトの配列

  // Setter Methods
  this.setUpdateView = function(func) { // --- 画面更新コールバック関数を設定する
    updateView = func;
  }

  // Objects
  var divObj = { 'name': "" ,
                 'ID'  : new Number('0000') }

  // Methods
  this.updateObjArray = function() { // --- データを取得して画面更新のためのコールバック関数を呼び出す
    $.get("DB/Master_Div.csv",function(data){
      var divArray = $.csv()(data);
      var divObjArray = new Array();
      for ( i=0 ; i < divArray.length ; i++ ) {
        divObjArray.push({'name': divArray[i][1] , 'ID': divArray[i][0]})
      }
      this.divObjArray = divObjArray;
      updateView ? updateView(this.divObjArray): 0 ;
      //Debug
      // console.log(this.divObjArray);
    });
  }

}


// -- View 関数 --
//
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

function View_updateDivPane(divObjArray) { // -- 各課表示を更新する --
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.DivButton').append(
     "<DIV id=\"" + divObjArray[i].ID + "\">" + divObjArray[i].name + "</div>" );
  }
}

// -- Tool 関数 --
//
function printProperties(obj) { // -- Debug関数 / オブジェクトのプロパティ一覧をalert --

    var properties = '';
    for (var prop in obj){
        properties += prop + "=" + obj[prop] + "\n";
    }
    alert(properties);
}


