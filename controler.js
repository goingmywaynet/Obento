// -- Controller --
//
$(document).ready(function(){ // -- DOM準備完了後開始処理 (MAIN Controller) --

  // オブジェクト生成
  //

  // -- 課オブジェクト生成 -- 
  // オブジェクト生成後に画面更新関数を渡すパターン
  var objSectionModel = new Model_Section();            // 定義したclass Model_Section を元にインスタンスを生成
  objSectionModel.setUpdateView(View_updateDivPane);    // 画面更新のためのview関数をjQueryのコールバック関数として指定
  // objSectionModel.updateViewFunc=View_updateDivPane; // という書き方もok
  // var objSectionModel = new Model_Section(View_updateDivPane);
                                                        // オブジェクト生成時に画面更新関数を渡すパターン
 
  // -- ユーザオブジェクト生成 --
  var objUserModel = new Model_User(View_updateUserPane);

  // 各種処理定義
  //

  // -- 課ボタンを押したときの処理 --
  $(".DivButton > div").live("click", function() {
    //Debug
    // console.log( "DivButton Clicked " + $(this).attr("id") );
    objSectionModel.setSelectedID($(this).attr("id"));
    $(".UserChoicePane").empty();
    objUserModel.updateObjArray(objSectionModel.selectedID);
  });

  // -- ユーザボタンを押したときの処理 --
  $(".UserName").live("click", function() {
    //Debug
    // console.log( "UserName Clicked " + $(this).attr("id") + $(this).text() );
    objUserModel.setSelectedID($(this).attr("id"));
    // window.open("http://www.google.co.jp/search?q=" + $(this).text() + "&tbm=isch");
    $(".topic").append("<p>" + objSectionModel.selectedObj.name + "の " +
        objUserModel.selectedObj.user_name +"さんですね！</p>");
    $(".DivButton").empty();
    $(".UserChoicePane").empty();
  });

  // 画面初期起動処理
  //

  // -- 画面初期起動処理 --
  updateDate();                     // 日付を更新する
  objSectionModel.updateObjArray(); // 課のデータを取得して画面更新

});

// -- Model Object Class --
//
function Model(callback) { // -- モデルの継承用親クラス --
  // このクラスを各モデルが継承することで、重複する定義を省略する

  // Propertys
  this.updateViewFunc = callback; // Viewを更新するためのコールバック関数
  this.objArray = new Array();    // モデルデータ配列
  this.selectedObj = {};          // モデル被選択object
  this.selectedID = new Number();    // モデル被選択ID

  // Objects
  var section = { 'name': "" ,
                  'ID'  : new Number('0000') }

  var user    = { 'user_id' : "",
                  'section_id' : "",
                  'user_name'  : "",
                  'enable_flag': "" }


  // Setter Methods
  this.setUpdateView = function(func) { // --- 画面更新コールバック関数を設定する
    this.updateViewFunc = func;
  }

  this.setSelectedID = function(selectedId) { // --- 選択された id を元に selectedObj に代入
    this.selectedID = selectedId;
    for ( i=0 ; i < this.objArray.length ; i++ ) {
      if ( this.objArray[i].ID == selectedId ) {
        this.selectedObj = this.objArray[i];
      }
      if ( this.objArray[i].user_id == selectedId ) {
        this.selectedObj = this.objArray[i];
      }
    }
  }


  // Methods
  this.updateObjArray = function() { // --- csvデータを取得して画面更新のためのコールバック関数を呼び出す
    console.log(this.constructor.name + " hogeメソッドがオーバーライトされていません！");
  }

}

function Model_Section(callback) { // -- Model の子クラス : SECTION --

  // 継承
  Model.call(this, callback); // Model を継承

  // Over Write Methods
  this.updateObjArray = function() { // --- csvデータを取得して画面
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller として宣言しておく

    $.get("DB/M_SECTION.csv",function(data){
      var divArray = $.csv(",", "", "\n")(data); // int(ID) , str(name)
      var divObjArray = new Array();
      for ( i=0 ; i < divArray.length ; i++ ) {
        divObjArray.push({'name': divArray[i][1] , 'ID': divArray[i][0]})
      }
      caller.objArray = divObjArray; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
      caller.updateViewFunc ? caller.updateViewFunc(caller.objArray) : 0 ; // 画面更新
      //Debug
      // console.log(this.divObjArray);
    });
  } 
}

function Model_User(callback) { // -- Model の子クラス : USER --

  // 継承
  Model.call(this, callback); // Model を継承

  // Over Write Methods
  this.updateObjArray = function(id) { // --- csvデータを取得して画面
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller として宣言しておく

    $.get("DB/M_USER.csv",function(data){
      var divArray = $.csv(",", "", "\n")(data); // int(user_id) , str(section_id) , str(user_name) , int(enable_flat)
      var divObjArray = new Array();
      for ( i=0 ; i < divArray.length ; i++ ) {
        if ( divArray[i][1] == id ) {
          divObjArray.push({  'user_id' : divArray[i][0],
                              'section_id' : divArray[i][1],
                              'user_name'  : divArray[i][2],
                              'enable_flag': divArray[i][3] } )
        }
      }
      caller.objArray = divObjArray; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
      caller.updateViewFunc ? caller.updateViewFunc(caller.objArray) : 0 ; // 画面更新
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

function View_updateUserPane(divObjArray) { // -- User Pane を更新する --
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

function inherit (p) { // -- class 継承用関数 IE8 対応 --
  // サイ本(125p)
  if (p == null) throw TypeError(); // p が null ではないオブジェクトか確認
  if (Object.create)                // Object.create() が定義されていれば (ECMAScript 5)
    return Object.create(p);        // 使う。
  var t = typeof p;                 // 定義されていなければ型チェック
  if (t !== "object" && t!== "function") throw TypeError();
  function f() {};                  // ダミーのコンストラクタ関数（オブジェクト生成関数）
  f.prototype = p;                  // prototype プロパティに p を設定する。
  return new f();                   // f()を使って p を継承するオブジェクトを生成する。
}

