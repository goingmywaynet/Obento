// -- View 関数 --
//
function View_updateDate(){ // -- 時計(日時曜日)を更新する --
  var obj = new Model_Date();
  $('.today').html(obj.clockText());
  obj = null;
}

function View_updateDivPane(divObjArray) { // -- Section Pane を更新する --
  View_clearAllPanes();
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.SectionPane').append(
     "<DIV id=\"" + divObjArray[i].id + "\">" + divObjArray[i].name + "</div>" );
  }
}

function View_updateUserPane(divObjArray) { // -- User Pane を更新する --
  View_clearAllPanes(); // 各ペインをクリアし、Orderペインを非表示にする
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.UserPane').append(
     "<DIV class=\"UserName\" id=\"" + divObjArray[i].user_id + "\">" + divObjArray[i].user_name + "</div>" );
  }
}

function View_updateUserPane_UserSelected(sectionObj,userObj) { // -- User を選択された後での User Pane を更新する --
  View_clearAllPanes(); // 各ペインをクリアし、Orderペインを非表示にする
  $(".UserPane").append("<p>" + sectionObj.selectedObj.name + " の " +
      userObj.selectedObj.user_name +" さん </p>"); // 選択されたセクションとユーザ名を表示する
}

function View_updateShopPane(divObjArray) { // -- Shop Pane を更新する --
  View_clearAllPanes(); // 各ペインをクリアし、Orderペインを非表示にする
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.ShopPane').append(
     "<DIV class=\"ShopName Button\" id=\"" + divObjArray[i].shop_id + "\">" + divObjArray[i].shop_name + "</div>" );
  }
}

function View_updateMenuPane(divObjArray) { // -- Menu Pane を更新する --
  View_clearAllPanes(); // 各ペインをクリアし、Orderペインを非表示にする
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.MenuPane').append(
     "<DIV class=\"MenuName Button\" id=\"" + divObjArray[i].bento_id + "\">" + divObjArray[i].bento_name + "</div>" );
  }
}

function View_updateOptionPane(divObjArray,selectedIDs) { // -- Option Pane を更新する --
  View_clearAllPanes(); // 各ペインをクリアし、Orderペインを非表示にする
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.OptionPane').append(
     "<DIV class=\"OptionName Button\" id=\"" + divObjArray[i].option_id + "\">" + divObjArray[i].option_name + "</div>" );
  }

  if (selectedIDs.length != 0) { // -- 複数選択の場合は、選択済みのoptionを反転させる
    //Debug
    // console.log(divObjArray + selectedIDs);
    for ( i=0 ; i < selectedIDs.length ; i++ ) {
      $('.OptionPane > #' + selectedIDs[i]).css("background-color","red");
    }
  }

}

function View_updateOrderPane(objMenuModel, objOptionModel) { // -- Order Pane 更新 (注文する商品を表示) --
  View_clearAllPanes(); // 各ペインをクリアし、Orderペインを非表示にする
  // OrderPane に注文内容を表示する
  $(".OrderPane > .OrderItem").append(
      "ご注文は " 
      + objMenuModel.selectedObj.bento_name     // 弁当名
      + objOptionModel.selectedObj.option_name  // オプション名
      + " " 
      + objMenuModel.selectedObj.price          // 価格
      + "円 ");
  // 注文ボタン表示
  $(".OrderPane").append( "<DIV class=\"Button\" id=\"orderSubmit\">" + "内容確定" + "</div>" );

  // 注文ペイン表示
  $(".OrderPane").show();
}

function View_clearAllPanes(){ // -- 各ペインをクリアする --
   $(".OrderPane").hide();
   $(".OrderItem").empty();
   $(".PaymentTotal").empty();
   $(".SectionPane").empty();
   $(".UserPane").empty();
   $(".ShopPane").empty(); 
   $(".MenuPane").empty();
   $(".OptionPane").empty();
}

function View_breadCrumbs(obj) { // -- パンくず表示処理
  if (!obj) {
    $(".breadCrumbs").empty();
    $(".breadCrumbs").append(
        "<li><p>" + "課を選択してください" + "</p></li>" );
  }

  if (obj instanceof Model_Section) {
    $(".breadCrumbs").empty();
    $(".breadCrumbs").append(
        "<li id=\"Section\"><a href=\"#\">" + obj.selectedObj.name 
        + "</a><strong></strong></li>" );
    $(".breadCrumbs").append(
        "<li><p>" + "氏名を選択" + "</p></li>" );
  }

  if (obj instanceof Model_User) {
    $(".breadCrumbs > li:last").remove();
    $(".breadCrumbs").append(
        "<li id=\"User\"><a href=\"#\">" + obj.selectedObj.user_name 
        + "</a><strong></strong></li>" );
    $(".breadCrumbs").append(
        "<li><p>" + "店名を選択" + "</p></li>" );
  }

  if (obj instanceof Model_Shop) {
    $(".breadCrumbs > li:last").remove();
    $(".breadCrumbs").append(
        "<li id=\"Shop\"><a href=\"#\">" + obj.selectedObj.shop_name 
        + "</a><strong></strong></li>" );
    $(".breadCrumbs").append(
        "<li><p>" + "メニューを選択" + "</p></li>" );
  }

  if (obj instanceof Model_Menu) {
    $(".breadCrumbs > li:last").remove();
    $(".breadCrumbs").append(
        "<li id=\"Menu\"><a href=\"#\">" + obj.selectedObj.bento_name 
        + "</a><strong></strong></li>" );
    $(".breadCrumbs").append(
        "<li><p>" + "オプションを選択</p></li>" );
  }

}

