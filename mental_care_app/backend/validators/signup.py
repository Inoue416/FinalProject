import re


def userNameValidator(value):
    regexp = r"[<>`/~\|\*!=\$&\^%\(\)\+\?\.,;:’”＜＞'\"\[\{\]\}\s]"
    return re.search(regexp, value)

def emailValidator(email):
    if (email is None or len(email) <= 0):
        return None;  # 必須項目であることを表示する
    regexp = r'^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
    return re.match(regexp, email)

def passwordValidator(password):
    if (password == None or len(password) <= 0):
        return None
    regexp = r'^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$'
    return re.match(regexp, password)

if __name__ == "__main__":
    value = [
        "YUya<>a",
        "[]kd:;",
        ",dfa{}", 
        "sample@example.com",
        "dasdjo.com",
        "Inoue0811"
    ]
    for v in value:
        print(passwordValidator(v))
