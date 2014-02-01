$(document).ready(function(){ // -- DOM準備完了後開始処理 (MAIN Controller) --

  updateDate(); // 日付を更新する
  
  // -- 課の一覧を表示する -- 
  // オブジェクト生成後に画面更新関数を渡すパターン
  var myDivPane = new Model_SectionPane();
  myDivPane.setUpdateView(View_updateDivPane);
  myDivPane.updateObjArray();
    // ちなみに、オブジェクト生成時に画面更新関数を渡すパターン
    // var myDivPane = new Model_DivPane(View_updateDivPane);
    // myDivPane.updateObjArray();

  // -- ユーザの一覧を表示するためのオブジェクトを生成しておく --
  var myUserPane = new Model_UserPane(View_updateUserPane);

  // -- 課ボタンを押したときの処理 --
  $(".DivButton > div").live("click", function() {
    //Debug
    // console.log( "DivButton Clicked " + $(this).attr("id") );
    $(".UserChoicePane").empty();
    myUserPane.updateObjArray($(this).attr("id"));
  });

  // -- ユーザボタンを押したときの処理 --
  $(".UserName").live("click", function() {
    //Debug
    // console.log( "UserName Clicked " + $(this).attr("id") + $(this).text() );
    window.open("http://www.google.co.jp/search?q=" + $(this).text() + "&tbm=isch");
  });

});

// -- Model Object --
//
function Model_SectionPane (callback) { // -- SECTION表示ペイン Model --
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
  this.updateObjArray = function() { // --- csvデータを取得して画面更新のためのコールバック関数を呼び出す
    $.get("DB/M_SECTION.csv",function(data){
      var divArray = $.csv(",", "", "\n")(data);
        // int(ID) , str(name)
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

function Model_UserPane (callback) { // -- User表示ペイン Model --
  // SectionID を渡して該当するユーザ名を表示する
  // データ更新後の画面更新関数を callback として渡す

  // closed Propertys
  var updateView = callback;

  // Propertys
  this.sectionID  = new Number();     // セクションID保持
  this.divObjArray = new Array();     // 表示オブジェクトの配列

  // Setter Methods
  this.setUpdateView = function(func) { // --- 画面更新コールバック関数を設定する
    updateView = func;
  }

  // Objects
  var divObj = { 'name': "" ,
                 'ID'  : new Number('0000') }
  var userObj = { 'user_id' : "",
                  'section_id' : "",
                  'user_name'  : "",
                  'enable_flag': "" }

  // Methods
  this.updateObjArray = function(id) { // --- csvデータを取得して画面更新のためのコールバック関数を呼び出す
    $.get("DB/M_USER.csv",function(data){
      var divArray = $.csv(",", "", "\n")(data);
        // int(user_id) , str(section_id) , str(user_name) , int(enable_flat)
      var divObjArray = new Array();
      for ( i=0 ; i < divArray.length ; i++ ) {
        if ( divArray[i][1] == id ) {
          divObjArray.push({  'user_id' : divArray[i][0],
                              'section_id' : divArray[i][1],
                              'user_name'  : divArray[i][2],
                              'enable_flag': divArray[i][3] } )
        }
      }
      this.divObjArray = divObjArray;
      updateView ? updateView(this.divObjArray): 0 ;
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

function View_updateDivPane(divObjArray) { // -- Section Pane を更新する --
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.DivButton').append(
     "<DIV id=\"" + divObjArray[i].ID + "\">" + divObjArray[i].name + "</div>" );
  }
}

function View_updateUserPane(divObjArray) { // -- User Pane 表示を更新する --
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.UserChoicePane').append(
     "<DIV class=\"UserName\" id=\"" + divObjArray[i].user_id + "\">" + divObjArray[i].user_name + "</div>" );
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


