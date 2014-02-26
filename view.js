// -- View 関数 --
//
function updateDate(){ // -- 時計(日時曜日)を更新する --
  var obj = new Model_Date();
  $('.today').html(obj.clockText());
  obj = null;
}

function View_updateDivPane(divObjArray) { // -- Section Pane を更新する --
  $(".SectionPane").empty(); $(".UserPane").empty();
  $(".ShopPane").empty(); $(".MenuPane").empty();
  $(".OptionPane").empty();
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.SectionPane').append(
     "<DIV id=\"" + divObjArray[i].ID + "\">" + divObjArray[i].name + "</div>" );
  }
}

function View_updateUserPane(divObjArray) { // -- User Pane を更新する --
  $(".SectionPane").empty(); $(".UserPane").empty();
  $(".ShopPane").empty(); $(".MenuPane").empty();
  $(".OptionPane").empty();
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.UserPane').append(
     "<DIV class=\"UserName\" id=\"" + divObjArray[i].user_id + "\">" + divObjArray[i].user_name + "</div>" );
  }
}

function View_updateUserPane_UserSelected(sectionObj,userObj) { // -- User を選択された後での User Pane を更新する --
  $(".SectionPane").empty(); $(".UserPane").empty();
  $(".ShopPane").empty(); $(".MenuPane").empty();
  $(".OptionPane").empty();
  $(".UserPane").append("<p>" + sectionObj.selectedObj.name + " の " +
      userObj.selectedObj.user_name +" さん </p>"); // 選択されたセクションとユーザ名を表示する
}

function View_updateShopPane(divObjArray) { // -- Shop Pane を更新する --
  $(".SectionPane").empty(); $(".UserPane").empty();
  $(".ShopPane").empty(); $(".MenuPane").empty();
  $(".OptionPane").empty();
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.ShopPane').append(
     "<DIV class=\"ShopName Button\" id=\"" + divObjArray[i].shop_id + "\">" + divObjArray[i].shop_name + "</div>" );
  }
}

function View_updateMenuPane(divObjArray) { // -- Menu Pane を更新する --
  $(".SectionPane").empty(); $(".UserPane").empty();
  $(".ShopPane").empty(); $(".MenuPane").empty();
  $(".OptionPane").empty();
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.MenuPane').append(
     "<DIV class=\"MenuName Button\" id=\"" + divObjArray[i].bento_id + "\">" + divObjArray[i].bento_name + "</div>" );
  }
}

function View_updateOptionPane(divObjArray) { // -- Option Pane を更新する --
  $(".SectionPane").empty(); $(".UserPane").empty();
  $(".ShopPane").empty(); $(".MenuPane").empty();
  $(".OptionPane").empty();
  for ( i=0 ; i < divObjArray.length ; i++ ) {
    $('.OptionPane').append(
     "<DIV class=\"OptionName Button\" id=\"" + divObjArray[i].option_id + "\">" + divObjArray[i].option_name + "</div>" );
  }
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
        "<li><p>" + "氏名を選択してください" + "</p></li>" );
  }

  if (obj instanceof Model_User) {
    $(".breadCrumbs > li:last").remove();
    $(".breadCrumbs").append(
        "<li id=\"User\"><a href=\"#\">" + obj.selectedObj.user_name 
        + "</a><strong></strong></li>" );
    $(".breadCrumbs").append(
        "<li><p>" + "店名を選択してください" + "</p></li>" );
  }

  if (obj instanceof Model_Shop) {
    $(".breadCrumbs > li:last").remove();
    $(".breadCrumbs").append(
        "<li id=\"Shop\"><a href=\"#\">" + obj.selectedObj.shop_name 
        + "</a><strong></strong></li>" );
    $(".breadCrumbs").append(
        "<li><p>" + "メニューを選択してください" + "</p></li>" );
  }

  if (obj instanceof Model_Menu) {
    $(".breadCrumbs > li:last").remove();
    $(".breadCrumbs").append(
        "<li id=\"Menu\"><a href=\"#\">" + obj.selectedObj.bento_name 
        + "</a><strong></strong></li>" );
    $(".breadCrumbs").append(
        "<li><p>" + "オプションを選択してください" + "</p></li>" );
  }

}

