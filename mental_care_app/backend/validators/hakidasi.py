import re

def hakidasiValidator(value):
    regexp = r"[<>`/~\|\*!=\$&\^%\(\)\+\?\.,;:’”＜＞'\"\[\{\]\}\s]"
    return re.search(regexp, value)

def isTextLength(text):
    if len(text) > 0 and len(text) <= 100:
        return True
    return False