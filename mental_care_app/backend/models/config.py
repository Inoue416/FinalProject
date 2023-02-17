JWT_TOKEN_LOCATION = ['cookies']
# クッキーの有効期限を無効化する
JWT_ACCESS_TOKEN_EXPIRES = False
JWT_REFRESH_TOKEN_EXPIRES = False
# httpsでなくてもクッキーを送る
JWT_COOKIE_SECURE = False
# クッキーのpath属性
JWT_ACCESS_COOKIE_PATH = '/api/'
JWT_REFRESH_COOKIE_PATH = '/api/auth/refresh'
# GET以外のときにCSRFトークンチェックを行うか
JWT_COOKIE_CSRF_PROTECT = True
# JWT署名鍵
JWT_SECRET_KEY = b'xxxxx'