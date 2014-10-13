=========================
model.js
=========================

Class
=========================

Model
-------------------------

.. js:class:: Model(callback)

  :param function callback: 処理完了後に呼び出すコールバック関数（ view.js の画面更新処理がほとんど )

  obento 処理関連モデルオブジェクトの基本クラス

.. js:function:: Model.updateViewFunc

  viewを更新するためのfunctionを保持する。:js:class:`Model` の param callback が代入される。

.. js:attribute:: Model.objArray

  :rtype: array

  モデルの持つデータの配列を保持する

.. js:attribute:: Model.selectedID

  :rtype: number

  :js:attr:`Model.objArray` 内で選択されたデータのIDを保持する

     
.. js:attribute:: Model.selectedObj

  :rtype: object

  :js:attr:`Model.objArray` 内で選択されたデータを保持する

.. js:function:: Model.setUpdateView(func)

  :param function func: 上書き関数

  :js:attr:`Model.updateViewFunc` を上書き定義する

.. js:function:: Model.setSelectedID(selectedID)

  :param number selectedID: :js:attr:`Model.objArray` 内の配列番号

  IDをキーとして、選択したオブジェクトを :js:attr:`Model.selectedObj` に代入する

  .. note::
    id , user_id , shop_id , bento_id をキーとして処理する

Model_Section
-------------------------

.. js:class:: Model_Section(callback)

  :param function callback: 処理完了後に呼び出すコールバック関数（ view.js の画面更新処理がほとんど )
  :prototype: :js:class:`Model`

  部署名を保持するモデル。
  基本モデルである :js:class:`Model` クラスを継承している。

.. js:function:: Model_Section.updateObjArray

  :callback: :js:attr:`Model.updateViewFunc`
  :throws error alert: "XML-RPC ERROR : See console.log"
  :throws error console: response + status + jqXHR

  XML-RPC 呼び出しメソッド :py:server:method:`getM_section_ALL` で
  XML-RPC サーバとの通信によって、課一覧を :js:attr:`Model.objArray` に取得する

.. js:attribute:: Model_Section.objArray

  array key 一覧

  :key id: 課ID
  :key name: 課名称

Model_User
-------------------------

.. js:class:: Model_User(callback)

  :param function callback: 処理完了後に呼び出すコールバック関数（ view.js の画面更新処理がほとんど )
  :prototype: :js:class:`Model`

  ユーザ名を保持するモデル。
  基本モデルである :js:class:`Model` クラスを継承している。

.. js:function:: Model_User.updateObjArray

  :callback: :js:attr:`Model.updateViewFunc`
  :throws error alert: "XML-RPC ERROR : See console.log"
  :throws error console: response + status + jqXHR

  XML-RPC 呼び出しメソッド :py:server:method:`getM_user_FLAG` 引数 ``1`` で
  XML-RPC サーバとの通信によって、ユーザ一覧を :js:attr:`Model.objArray` に取得する

.. js:attribute:: Model_User.objArray

  array key 一覧

  :key user_id: ユーザID
  :key section_id: 課ID
  :key user_name: ユーザ名
  :key enable_flag: 有効フラグ

Model_Shop
------------------------------

.. js:class:: Model_Shop(callback)

  :param function callback: 処理完了後に呼び出すコールバック関数（ view.js の画面更新処理がほとんど )
  :prototype: :js:class:`Model`

  店舗・業者名を保持するモデル。
  基本モデルである :js:class:`Model` クラスを継承している。

.. js:function:: Model_Shop.updateObjArray

  :callback: :js:attr:`Model.updateViewFunc`
  :throws error alert: "XML-RPC ERROR : See console.log"
  :throws error console: response + status + jqXHR

  XML-RPC 呼び出しメソッド :py:server:method:`getM_shop_FLAG` 引数 ``1`` で
  XML-RPC サーバとの通信によって、ユーザ一覧を :js:attr:`Model.objArray` に取得する

.. js:attribute:: Model_Shop.objArray

  array key 一覧

  :key shop_id: 店舗ID
  :key shop_name: 店舗名

Model_Menu
-------------------------------

.. js:class:: Model_Menu(callback)

  :param function callback: 処理完了後に呼び出すコールバック関数（ view.js の画面更新処理がほとんど )
  :prototype: :js:class:`Model`

  弁当メニュー名を保持するモデル。
  基本モデルである :js:class:`Model` クラスを継承している。

.. js:function:: Model_Menu.updateObjArray

  :callback: :js:attr:`Model.updateViewFunc`
  :throws error alert: "XML-RPC ERROR : See console.log"
  :throws error console: response + status + jqXHR

  XML-RPC 呼び出しメソッド :py:server:method:`getM_menu_SHOP_FLAG` 引数 [shop_id,``1``] で
  XML-RPC サーバとの通信によって、ユーザ一覧を :js:attr:`Model.objArray` に取得する

.. js:attribute:: Model_Menu.objArray

  array key 一覧

  :key bento_id: 弁当ID
  :key shop_id: 店舗ID
  :key bento_name: 弁当名
  :key price: 弁当価格
  :enable_flag: 有効フラグ

Model_Option
----------------------------------

.. js:class:: Model_Option(callback)

  :param function callback: 処理完了後に呼び出すコールバック関数（ view.js の画面更新処理がほとんど )
  :prototype: :js:class:`Model`

  各弁当の選択可能なオプションを保持するモデル。
  基本モデルである :js:class:`Model` クラスを継承している。

.. js:attribute:: Model_Option.optionCounts

  :rtype: Number

  選択可能なオプション数

.. js:attribute:: Model_Option.selectedIDs

  :rtype: array

  選択済みオプションのID配列

.. js:attribute:: Model_Option.selectedObjs

  :rtype: array

  選択済みオプションのオブジェクト配列

.. js:function:: Model_Option.setSelectedID(selectedID)

  :param number selectedID: 選択されたオプションの option_id

  指定されたoption_idを元に :js:attr:`Model_Option.selectedObjs` にオプションのオブジェクトを追加する

  もし既に :js:attr:`Model_Option.selectedIDs` にすでに登録されている option_id を指定した場合は
  選択をキャンセルした物と見なして :js:attr:`Model_Option.selectedIDs` より削除し、
  :js:attr:`Model.updateViewFunc` に :js:attr:`Model.Option.objArray` と :js:attr:`Model_Option.selectedIDs`
  を引数として渡して画面を更新する。

  選択したオプションが :js:attr:`Model_Option.optionCounts` 数に達した場合は選択したオプションすべてを
  array として :js:attr:`Model.selectedObj` に格納する。


.. js:function:: Model_Option.updateObjArray(id)

  :param number id: menu_id
  :callback: :js:attr:`Model.updateViewFunc`
  :throws error alert: "XML-RPC ERROR : See console.log"
  :throws error console: response + status + jqXHR

  XML-RPC 呼び出しメソッド :py:server:method:`getM_option_group_MENU` 引数 ``id`` でオプショングループIDの
  id と オプション数を取得し、

  XML-RPC サーバとの通信によって、ユーザ一覧を :js:attr:`Model.objArray` に取得する

  .. todo:: ここ変だから直す必要あり

.. js:attribute:: Model_Option.objArray

  array key 一覧

  :key bento_id: 弁当ID
  :key shop_id: 店舗ID
  :key bento_name: 弁当名
  :key price: 弁当価格
  :enable_flag: 有効フラグ
----

.. js:class:: Model_Order(callback)

  :param function callback: 処理完了後に呼び出すコールバック関数（ view.js の画面更新処理がほとんど )
  :prototype: :js:class:`Model`

  注文内容を保持するモデル。
  基本モデルである :js:class:`Model` クラスを継承している。

----

