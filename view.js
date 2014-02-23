// -- View 関数 --
//
function updateDate(){ // -- 時計(日時曜日)を更新する --
  var obj = new Model_Date();
  $('.today').html(obj.clockText());
  obj = null;
}

function View_updateDivPane(divObjArray) { // -- Section Pane を更新する --
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.SectionPane').append(
     "<DIV id=\"" + divObjArray[i].ID + "\">" + divObjArray[i].name + "</div>" );
  }
}

function View_updateUserPane(divObjArray) { // -- User Pane を更新する --
  $(".UserPane").empty();
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.UserPane').append(
     "<DIV class=\"UserName\" id=\"" + divObjArray[i].user_id + "\">" + divObjArray[i].user_name + "</div>" );
  }
}

function View_updateUserPane_UserSelected(sectionObj,userObj) { // -- User を選択された後での User Pane を更新する --
  $(".SectionPane").empty();  // セクション選択ペインを消去
  $(".UserPane").empty();     // ユーザ選択ペインを消去
  $(".UserPane").append("<p>" + sectionObj.selectedObj.name + " の " +
      userObj.selectedObj.user_name +" さん </p>"); // 選択されたセクションとユーザ名を表示する
}

function View_updateShopPane(divObjArray) { // -- Shop Pane を更新する --
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.ShopPane').append(
     "<DIV class=\"ShopName Button\" id=\"" + divObjArray[i].shop_id + "\">" + divObjArray[i].shop_name + "</div>" );
  }
}

function View_updateMenuPane(divObjArray) { // -- Menu Pane を更新する --
  $(".MenuPane").empty();
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.MenuPane').append(
     "<DIV class=\"MenuName Button\" id=\"" + divObjArray[i].bento_id + "\">" + divObjArray[i].bento_name + "</div>" );
  }
}

function View_updateOptionPane(divObjArray) { // -- Option Pane を更新する --
  $(".OptionPane").empty();
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.OptionPane').append(
     "<DIV class=\"OptionName Button\" id=\"" + divObjArray[i].option_id + "\">" + divObjArray[i].option_name + "</div>" );
  }
}
