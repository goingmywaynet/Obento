=========================
model.js
=========================

.. js:class:: Model(callback)

  :param function callback: 処理完了後に呼び出すコールバック関数（ view.js の画面更新処理がほとんど )

  obento 処理関連モデルオブジェクトの基本クラス

.. js:attribute:: Model.updateViewFunc

  viewを更新するためのfunctionを保持する。param callback が代入される。

.. js:attribute:: Model.objArray

  :rtype: array

  モデルの持つデータの配列を保持する
      

.. js:class:: Model_Menu(callback)

  :param function callback: 処理完了後に呼び出すコールバック関数（ view.js の画面更新処理がほとんど )

  弁当メニューを保持するモデル。基本モデルである :js:class:`Model` クラスを継承している。
