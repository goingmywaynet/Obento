# -*- coding: utf-8 -*-
# vim: fileencoding=utf-8
#
# Obento Project
# - XML-RPC Server Side Program -
#

# Obento XML-RPC Server
from SimpleXMLRPCServer import SimpleXMLRPCServer
from SimpleXMLRPCServer import SimpleXMLRPCRequestHandler
import sqlite3

#
# XML-RPC Server
#

# Restrict to a particular path.
class RequestHandler(SimpleXMLRPCRequestHandler):
    rpc_paths = ('/RPC2',)

# Create server
server = SimpleXMLRPCServer(("localhost", 8000),
                            requestHandler=RequestHandler)
server.register_introspection_functions()


# Register pow() function; this will use the value of
# pow.__name__ as the name, which is just 'pow'.
server.register_function(pow)

# Register a function under a different name
def adder_function(x,y):
    return x + y
server.register_function(adder_function, 'add')

# Register an instance; all the methods of the instance are
# published as XML-RPC methods (in this case, just 'div').
class MyFuncs:
    def div(self, x, y):
        return x // y

server.register_instance(MyFuncs())

#
# Server側処理実装
#

# T_ORDER への INSERT
def InsertT_ORDER(order_date,user_id,bento_id,selected_opt):
    db = sqlite3.connect('ObentoDB.db', isolation_level=None)
    sql = u"INSERT INTO T_ORDER (order_date, user_id, bento_id, selected_opt) VALUES (?, ?, ?, ?)"
    db.execute(sql, (order_date,user_id,bento_id,selected_opt))
    db.close()
    return 1
server.register_function(InsertT_ORDER,'T_ORDER-INSERT')

# T_ORDER への SELECT ALL
def SelectT_ORDER():
    db = sqlite3.connect('ObentoDB.db', isolation_level=None)
    sql = u"SELECT order_id,order_date, user_id, bento_id, selected_opt FROM T_ORDER"
    cursor = db.execute(sql)
    # Debug
    # print cursor
    # for row in cursor:
    #     print row
    return cursor.fetchall()
    db.close()
    # return 1
server.register_function(SelectT_ORDER,'T_ORDER-SELECT-ALL')




# Run the server's main loop
server.serve_forever()
