// -- Controller --
//
$(document).ready(function(){ // -- DOM準備完了後開始処理 (MAIN Controller) --

  //
  // オブジェクト生成
  //

  // -- 課オブジェクト生成 -- 
  // オブジェクト生成後に画面更新関数を渡すパターン
  var objSectionModel = new Model_Section();              // 定義したclass Model_Section を元にインスタンスを生成
  objSectionModel.setUpdateView(View_updateDivPane);      // 画面更新のためのview関数をjQueryのコールバック関数として指定
  // objSectionModel.updateViewFunc=View_updateDivPane;   // という書き方もok
  var objUserModel   = new Model_User(View_updateUserPane);     // user Model オブジェクト生成
  var objShopModel   = new Model_Shop(View_updateShopPane);     // shop Model オブジェクト生成
  var objMenuModel   = new Model_Menu(View_updateMenuPane);     // Menu Model オブジェクト生成
  var objOptionModel = new Model_Option(View_updateOptionPane); // Option Model オブジェクト生成
  var objOrderModel  = new Model_Order(View_updateOrderPane);   // Order Model オブジェクト生成
  var objDateModel   = new Model_Date();                        // Date Model オブジェクト生成

  //
  // 各種処理定義
  //
 
  $(".SectionPane > div").live("click", function() {  // -- Sectionボタンを押したときの処理 --
    //Debug
    // console.log( "SectionPane Clicked " + $(this).attr("id") );
    objSectionModel.setSelectedID($(this).attr("id"));        // Model object に選択した物を記憶させる
    objUserModel.updateObjArray(objSectionModel.selectedID);  // User ペインを更新
    View_breadCrumbs(objSectionModel); // パンくず更新
  });
  
  $(".UserName").live("click", function() {  // -- Userボタンを押したときの処理 --
    objUserModel.setSelectedID($(this).attr("id"));           // User object に選択した物を記憶させる
    // window.open("http://www.google.co.jp/search?q=" + $(this).text() + "&tbm=isch"); // ネタ
    // View_updateUserPane_UserSelected(objSectionModel,objUserModel); // 選択済み情報を表示する
    objShopModel.updateObjArray();                                  // SHOPボタンを表示する
    View_breadCrumbs(objUserModel); // パンくず更新
  });

  $(".ShopName").live("click", function() {  // -- shopボタンを押したときの処理 --
    objShopModel.setSelectedID($(this).attr("id"));           // Shop object に選択した物を記憶させる
    objMenuModel.updateObjArray(objShopModel.selectedID);     // Menuボタンを表示する
    View_breadCrumbs(objShopModel);                           // パンくず更新
  });

  $(".MenuName").live("click", function() {  // -- Menuボタンを押したときの処理 --
    objMenuModel.setSelectedID($(this).attr("id"));           // Menu object に選択した物を記憶させる
    objOptionModel.updateObjArray(objMenuModel.selectedID);   // Optionボタンを表示する
    View_breadCrumbs(objMenuModel); // パンくず更新
  });

  $(".OptionName").live("click", function() {  // -- Optionボタンを押したときの処理 --
    objOptionModel.setSelectedID($(this).attr("id"));         // Option object に選択した物を記憶させる
    View_breadCrumbs(objOptionModel); // パンくず更新
    
    if ( objOptionModel.selectedIDs.length < objOptionModel.optionCounts ) { // -- 選択数に達してない場合
      objOptionModel.updateViewFunc(objOptionModel.objArray, objOptionModel.selectedIDs); // 画面更新
    } else { // -- 選択数に達した場合
      objOptionModel.updateViewFunc(objOptionModel.objArray, objOptionModel.selectedIDs); // 画面更新

      View_updateOrderPane(objMenuModel,objOptionModel); // 注文内容表示

      // Debug
      // console.log(objOptionModel.selectedIDs);
      // console.log(objOptionModel.selectedIDs.length);

      // objOrderModel.setNewOrder({ order_date: objDateModel.orderDate(),
      //                             user_id:    objUserModel.selectedID,
      //                             bento_id:   objMenuModel.selectedID,
      //                             selected_opt: objOptionModel.selectedID });
      
      // Debug
      // console.log( "order_date:" + objDateModel.orderDate() +
      //                             "user_id:" +   objUserModel.selectedID +
      //                             "bento_id:" +  objMenuModel.selectedID +
      //                             "selected_opt:" + objOptionModel.selectedID );

     console.log(objOptionModel.selectedObjs);
    }

    // objOrderModel.updateObjArray();

  });

  $(".orderSubmit").live("click", function() {  // -- 注文ボタンを押したときの処理 --
    objMenuModel.setSelectedID($(this).attr("id"));           // Menu object に選択した物を記憶させる
    objOptionModel.updateObjArray(objMenuModel.selectedID);   // Optionボタンを表示する
    View_breadCrumbs(objMenuModel); // パンくず更新
  });

  $(".breadCrumbs > li ").live("click", function() {  // -- パンくずボタンを押したときの処理 --
    //Debug
    // console.log( $(this).attr("id") );
    switch ( $(this).attr("id") ) {
      case "Section":
        View_breadCrumbs();
        objSectionModel.updateObjArray();  // 課のデータを取得して画面更新
        break;
      case "User":
        View_breadCrumbs();
        View_breadCrumbs(objSectionModel);
        objUserModel.updateObjArray(objSectionModel.selectedID);  // User ペインを更新
        break;
      case "Shop":
        View_breadCrumbs();
        View_breadCrumbs(objSectionModel);
        View_breadCrumbs(objUserModel);
        objShopModel.updateObjArray();
        break;
      case "Menu":
        View_breadCrumbs();
        View_breadCrumbs(objSectionModel);
        View_breadCrumbs(objUserModel);
        View_breadCrumbs(objShopModel);
        objMenuModel.updateObjArray(objShopModel.selectedID);     // Menuボタンを表示する
        break;
      case "Option":
        View_breadCrumbs();
        View_breadCrumbs(objSectionModel);
        View_breadCrumbs(objUserModel);
        View_breadCrumbs(objShopModel);
        View_breadCrumbs(objMenuModel);
        objOptionModel.updateObjArray(objMenuModel.selectedID);   // Optionボタンを表示する
        break;
    }
  });

  //
  // 画面初期起動処理
  //

  // -- 画面初期起動処理 --
  updateDate();                      // 日付を表示する(初回表示)
  setInterval( updateDate ,20000);   // 日付の自動更新を定義
  objSectionModel.updateObjArray();  // 課のデータを取得して画面更新
  View_breadCrumbs();                // パンくずリスト初期化
  
});

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

