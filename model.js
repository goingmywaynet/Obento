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
  //   var section = { 'name': "" ,
  //                   'ID'  : new Number('0000') }

  //   var user    = { 'user_id' : "",
  //                   'section_id' : "",
  //                   'user_name'  : "",
  //                   'enable_flag': "" }


  // Setter Methods
  this.setUpdateView = function(func) { // --- 画面更新コールバック関数を設定する
    this.updateViewFunc = func;
  }

  this.setSelectedID = function(selectedId) { // --- 選択された id を元に selectedObj に代入
    this.selectedID = selectedId;
    for ( i=0 ; i < this.objArray.length ; i++ ) {
      if ( this.objArray[i].id == selectedId ) {
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
      // if ( this.objArray[i].option_id == selectedId ) {
      //   this.selectedObj = this.objArray[i];
      // }
    }
  }

  // Methods
  this.updateObjArray = function() { // --- データを取得して画面更新のためのコールバック関数を呼び出す
    console.log(this.constructor.name + " 画面更新メソッドがオーバーライトされていません！");
  }

}

function Model_Section(callback) { // -- Model の子クラス : SECTION --

  // 継承
  Model.call(this, callback); // Model を継承

  // Over Write Methods
  this.updateObjArray = function() { // --- csvデータを取得して画面
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller として宣言しておく
    // XML-RPC サーバとの通信によって、課一覧を取得する
    $.xmlrpc({
      url: xmlrpcURL,
      methodName: 'getM_section_ALL',
      // params: obj,
      success: function(response, status, jqXHR) {
        var divObjArray = new Array();
        for ( i=0 ; i < response[0].length ; i++ ) {
          divObjArray.push({'id': response[0][i][0] ,
                            'name': response[0][i][1]})
        }
        caller.objArray = divObjArray; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
        caller.updateViewFunc ? caller.updateViewFunc(caller.objArray) : 0 ; // 画面更新
        // Debug
        // console.log(caller.objArray);
      },
      error: function(response, status, jqXHR){ alert("XML-RPC ERROR : See console.log"); console.log(response + status + jqXHR); }
    });
  } 
}

function Model_User(callback) { // -- Model の子クラス : USER --

  // 継承
  Model.call(this, callback); // Model を継承

  // Over Write Methods
  this.updateObjArray = function(id) { // --- csvデータを取得して画面
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller として宣言しておく
    // XML-RPC サーバとの通信によって、課一覧を取得する
    $.xmlrpc({
      url: xmlrpcURL,
      methodName: 'getM_user_FLAG',
      params: '1',
      success: function(response, status, jqXHR) {
        var divObjArray = new Array();
        for ( i=0 ; i < response[0].length ; i++ ) {
          divObjArray.push({'user_id': response[0][i][0] ,
                            'section_id' : response[0][i][1],
                            'user_name'  : response[0][i][2],
                            'enable_flag': response[0][i][3] } )
        }
        caller.objArray = divObjArray; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
        caller.updateViewFunc ? caller.updateViewFunc(caller.objArray) : 0 ; // 画面更新
        // Debug
        // console.log(caller.objArray);
      },
      error: function(response, status, jqXHR){ alert("XML-RPC ERROR : See console.log"); console.log(response + status + jqXHR); }
    });
  }
}

function Model_Shop(callback) { // -- Model の子クラス : SHOP --

  // 継承
  Model.call(this, callback); // Model を継承

  // Over Write Methods
  this.updateObjArray = function() { // --- csvデータを取得して画面更新
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller として宣言しておく
    // XML-RPC サーバとの通信によって、課一覧を取得する
    $.xmlrpc({
      url: xmlrpcURL,
      methodName: 'getM_shop_FLAG',
      params: '1',
      success: function(response, status, jqXHR) {
        var divObjArray = new Array();
        for ( i=0 ; i < response[0].length ; i++ ) {
          divObjArray.push({'shop_id': response[0][i][0] ,
                            'shop_name' : response[0][i][1] } )
        }
        caller.objArray = divObjArray; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
        caller.updateViewFunc ? caller.updateViewFunc(caller.objArray) : 0 ; // 画面更新
        // Debug
        // console.log(caller.objArray);
      },
      error: function(response, status, jqXHR){ alert("XML-RPC ERROR : See console.log"); console.log(response + status + jqXHR); }
    });
  }
}

function Model_Menu(callback) { // -- Model の子クラス : MENU --

  // 継承
  Model.call(this, callback); // Model を継承

  // Over Write Methods
  this.updateObjArray = function(id) { // --- データを取得して画面
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller として宣言しておく
    // XML-RPC サーバとの通信によって、一覧を取得する
    $.xmlrpc({
      url: xmlrpcURL,
      methodName: 'getM_menu_SHOP_FLAG',
      params: [id,'1'],
      success: function(response, status, jqXHR) {
        var divObjArray = new Array();
        for ( i=0 ; i < response[0].length ; i++ ) {
          divObjArray.push({'bento_id': response[0][i][0] ,
                            'shop_id' : id,
                            'bento_name': response[0][i][1],
                            'price': response[0][i][2],
                            'enable_flag' : "1" } )
        }
        caller.objArray = divObjArray; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
        caller.updateViewFunc ? caller.updateViewFunc(caller.objArray) : 0 ; // 画面更新
        // Debug
        // console.log(caller.objArray);
      },
      error: function(response, status, jqXHR){ alert("XML-RPC ERROR : See console.log"); console.log(response + status + jqXHR); }
    });
  }
}

function Model_Option(callback) { // -- Model の子クラス : OPTION --

  // 継承
  Model.call(this, callback); // Model を継承

  // 独自のプロパティ
  this.optionCounts = new Number();    // 選択可能なオプション数
  this.selectedObjs = new Array();     // 選択済みオプション（複数対応）
  this.selectedIDs  = new Array();     // 選択済みオプションID (複数対応)

  //
  // Over Write Methods
  //

  // 選択処理 Method
  this.setSelectedID = function(selectedID){ // --- 選択された id を元に selectedObjs に代入

    if ( this.selectedIDs.indexOf( selectedID ) >= 0 ) { // -- 選択済みのものを選択した場合
      // 当該オプションの選択をキャンセル
      this.selectedIDs.splice(this.selectedIDs.indexOf( selectedID ),1);  // selectedIDs より消去
      this.selectedObjs.splice(this.selectedIDs.indexOf( selectedID ),1); // selectedObjsより消去
      this.updateViewFunc ? this.updateViewFunc(this.objArray, this.selectedIDs) : 0 ; // 画面更新

    } else { // -- 未選択の物を選択した場合

      this.selectedIDs.push(selectedID);  // 選択済み option_id を配列へpush
      for ( i=0 ; i < this.objArray.length ; i++ ) { // 選択済み option_name を配列へpush
        if ( this.objArray[i].option_id == selectedID ) {
          this.selectedObjs.push( this.objArray[i] );
        }
      }

    }

    if ( this.selectedIDs.length == this.optionCounts ) { // -- 選択数に達した場合
      var selectedName = new Array();
      for ( i=0 ; i < this.selectedObjs.length ; i++ ) { // 選択済み option_name を配列へpush
        selectedName.push(this.selectedObjs[i].option_name);
      }
      this.selectedObj = {'option_name' : selectedName.toString()};
    }

  }
 
  // 画面更新 Method
  this.updateObjArray = function(id) { // --- データを取得して画面更新

    this.objArray = new Array(); // メニューを変えての再読み込みに備えて一旦一覧を消去する
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller とする

    // XML-RPC サーバとの通信によって、選択可能数 optionCounts を取得する
    $.xmlrpc({
      url: xmlrpcURL,
      methodName: 'getM_option_group_MENU',
      params: [id],
      success: function(response, status, jqXHR) {
        caller.optionCounts = response[0][0][1];
        // Debug
        //console.log(caller.optionCounts);
        
        if (caller.optionCounts > 0) { //-- オプションが選択可能なら、オプション一覧を取得 --

          // XML-RPC サーバとの通信によって、オプション一覧 objArray を取得する
          $.xmlrpc({
            url: xmlrpcURL,
            methodName: 'getM_option_MENU',
            params: [id],
            success: function(response, status, jqXHR) {
              var divObjArray = new Array();
              for ( i=0 ; i < response[0].length ; i++ ) {
                divObjArray.push({'option_id': response[0][i][0] ,
                                  'option_group' : 0,
                                  'option_name': response[0][i][1] })
              }
              caller.objArray = divObjArray; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
              caller.updateViewFunc ? caller.updateViewFunc(caller.objArray, caller.selectedIDs) : 0 ; // 画面更新
              // Debug
              // console.log(caller.objArray);
            },
            error: function(response, status, jqXHR){ alert("XML-RPC ERROR : See console.log"); console.log(response + status + jqXHR); }
          });

        } else {

          caller.updateViewFunc ? caller.updateViewFunc(caller.objArray, caller.selectedIDs) : 0 ; // 画面更新

        }

      },
      error: function(response, status, jqXHR){ alert("XML-RPC ERROR : See console.log"); console.log(response + status + jqXHR); }
    });
  }
}

function Model_Order(callback) { // -- Model の子クラス : ORDER --

  // 継承
  Model.call(this, callback); // Model を継承

  // Over Write Methods
  this.updateObjArray = function(id) { // --- csvデータを取得
    var caller = this; // この後 jQuery が this. を上書きしてしまうので、呼び出しもとを caller として宣言しておく
    // XML-RPCサーバよりオーダ内容を全件取得
    $.xmlrpc({
      url: xmlrpcURL,
      methodName: 'T_ORDER-SELECT-ALL',
      // params: obj,
      success: function(response, status, jqXHR) {
        caller.objArray = response; // 呼び出し元オブジェクトの objArray プロパティに結果を格納
        caller.updateViewFunc ? caller.updateViewFunc(caller.objArray) : 0 ; // 画面更新
        // Debug
        // console.log(caller.objArray);
      },
      error: function(response, status, jqXHR){ alert("XML-RPC ERROR : See console.log"); console.log(response + status + jqXHR); }
    });
  }

  this.setNewOrder = function(obj) { // --- ORDER をarrayに格納
    this.selectedObj = obj;

    // Debug
    // console.log(obj);
    
    // XML-RPCサーバへ送信
    $.xmlrpc({
      // url: 'http://localhost:8000/RPC2',
      url: xmlrpcURL,
      methodName: 'T_ORDER-INSERT',
      params: obj,
      success: function(response, status, jqXHR) { },
      error: function(response, status, jqXHR){ alert("XML-RPC ERROR : See console.log"); console.log(response + status + jqXHR); }
    });

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

