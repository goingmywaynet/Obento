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
      if ( this.objArray[i].shop_id == selectedId ) {
        this.selectedObj = this.objArray[i];
      }
      if ( this.objArray[i].bento_id == selectedId ) {
        this.selectedObj = this.objArray[i];
      }
      if ( this.objArray[i].option_id == selectedId ) {
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

function Model_Shop(callback) { // -- Model の子クラス : SHOP --

  // 継承
  Model.call(this, callback); // Model を継承

  // Over Write Methods
  this.updateObjArray = function() { // --- csvデータを取得して画面更新
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller として宣言しておく

    $.get("DB/M_SHOP.csv",function(data){
      var divArray = $.csv(",", "", "\n")(data); // int(shop_id) , str(shop_name)
      var divObjArray = new Array();
      for ( i=0 ; i < divArray.length ; i++ ) {
        divObjArray.push({  'shop_id' : divArray[i][0],
                            'shop_name'  : divArray[i][1] } )
      }
      caller.objArray = divObjArray; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
      caller.updateViewFunc ? caller.updateViewFunc(caller.objArray) : 0 ; // 画面更新
    });
  }
}

function Model_Menu(callback) { // -- Model の子クラス : MENU --

  // 継承
  Model.call(this, callback); // Model を継承

  // Over Write Methods
  this.updateObjArray = function(id) { // --- csvデータを取得して画面
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller として宣言しておく

    $.get("DB/M_BENTO.csv",function(data){
      var divArray = $.csv(",", "", "\n")(data); 
      var divObjArray = new Array();
      for ( i=0 ; i < divArray.length ; i++ ) {
        if ( divArray[i][1] == id ) {
          divObjArray.push({  'bento_id' : divArray[i][0],
                              'shop_id' : divArray[i][1],
                              'bento_name'  : divArray[i][2],
                              'price'  : divArray[i][3],
                              'enable_flag': divArray[i][4] } )
        }
      }
      caller.objArray = divObjArray; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
      caller.updateViewFunc ? caller.updateViewFunc(caller.objArray) : 0 ; // 画面更新
    });
  }
}

function Model_Option(callback) { // -- Model の子クラス : OPTION --

  // 継承
  Model.call(this, callback); // Model を継承

  // 独自のプロパティ
  this.optionGroupArray = new Array();

  // Over Write Methods
  this.updateObjArray = function(id) { // --- csvデータを取得して画面
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller として宣言しておく
    $.get("DB/M_BENTO_OPT.csv",function(data){
      var divArray = $.csv(",", "", "\n")(data); 
      var divObjArray = new Array();
      for ( i=0 ; i < divArray.length ; i++ ) {
        if ( divArray[i][0] == id ) {
          divObjArray.push({  'bento_id' : divArray[i][0],
                              'option_group' : divArray[i][1] } )
        }
      }
      caller.optionGroupArray = divObjArray; // 呼び出し元オブジェクトの optionGroupArray プロパティに結果を格納

      $.get("DB/M_OPTION.csv",function(data){
        var divArray = $.csv(",", "", "\n")(data); 
        var divObjArray = new Array();
        for ( opt = 0 ; opt < caller.optionGroupArray.length ; opt++ ) {
          for ( i=0 ; i < divArray.length ; i++ ) {
            if ( divArray[i][1] == caller.optionGroupArray[opt].option_group ) {
              divObjArray.push({  'option_id' : divArray[i][0],
                                  'option_group' : divArray[i][1],
                                  'option_name' : divArray[i][2] } )
            }
          }
        }
      caller.objArray = divObjArray; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
      caller.updateViewFunc ? caller.updateViewFunc(caller.objArray) : 0 ; // 画面更新
      });
 
    });
  }
}

function Model_Order(callback) { // -- Model の子クラス : ORDER --

  // 継承
  Model.call(this, callback); // Model を継承

  // Over Write Methods
  this.updateObjArray = function(id) { // --- csvデータを取得して画面更新
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller として宣言しておく

    $.get("DB/T_ORDER.csv",function(data){
      var divArray = $.csv(",", "", "\n")(data); 
      var objDate = new Model_Date();
      var divObjArray = new Array();
      for ( i=0 ; i < divArray.length ; i++ ) {
        if ( divArray[i][1] == objDate.orderDate() ) {
          divObjArray.push({  'order_id' : divArray[i][0],
                              'order_date' : divArray[i][1],
                              'user_id'  : divArray[i][2],
                              'bento_id'  : divArray[i][3],
                              'selected_opt': divArray[i][4] } )
        }
      }
      caller.objArray = divObjArray; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
      caller.updateViewFunc ? caller.updateViewFunc(caller.objArray) : 0 ; // 画面更新
    });
  }
  this.setNewOrder = function(obj) { // --- ORDER をarrayに格納
    this.selectedObj = obj;
    // this.updateViewFunc ? this.updateViewFunc(obj) : 0 ; // 画面更新
    console.log(obj);
  }

}

function Model_Date() { // -- 日時モデル --

  this.clockText = function() { // -- 画面上部用日時表示テキストを返す
    var date = new Date(),
        yy = date.getYear(),  mm = date.getMonth() + 1, 
        dd = date.getDate(),  day = ["日","月","火","水","木","金","土"],
        HH = date.getHours(), MM = date.getMinutes();
        ss = date.getSeconds();
    if (yy < 2000) { yy += 1900; }
    if (mm < 10) { mm = "0" + mm; } if (dd < 10) { dd = "0" + dd; }
    if (HH < 10) { HH = "0" + HH; } if (MM < 10) { MM = "0" + MM; }
    if (ss < 10) { ss = "0" + ss; } 
    // return yy + "/" + mm + "/" + dd + " (" + day[date.getDay()] +") " + HH + ":" + MM + ":" + ss;
    return yy + "/" + mm + "/" + dd + " (" + day[date.getDay()] +") " + HH + ":" + MM;
  }

  this.orderDate = function() { // -- 注文日付定義を返す
    var date = new Date(),
        yy = date.getYear(),  mm = date.getMonth() + 1, dd = date.getDate();
    if (yy < 2000) { yy += 1900; }
    if (mm < 10) { mm = "0" + mm; } if (dd < 10) { dd = "0" + dd; }
    return yy + "/" + mm + "/" + dd;
  }

}

