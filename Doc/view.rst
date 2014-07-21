=======================
view.js
=======================

.. js:function:: updateDate()

  画面 :envvar:`today` 上の時計(日時曜日)を更新する。

.. js:function:: View_updateOrderPane(objMenuModel, objOptionModel) 

  :param object objMenuModel: :js:class:`Model_Menu()` object を渡す
  :param object objOptionModel: :js:class:`Model_Option()` object を渡す

  :envvar:`SectionPane` :envvar:`UserPane` :envvar:`ShopPane`
  :envvar:`MenuPane` :envvar:`OptionPane` の内容をクリアし、
  注文商品の名称、オプション、値段、注文決定ボタンを表示する。

