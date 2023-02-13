export function isTextLength(text, lenght) {
    if (text.length > 0 && text.length <= lenght){ return true; }
    return false;
}

export function textAreaValidator(text){
    const regexp = /[<>`/~|*!=$&^+%()?.,;:’”＜＞'"[{\]}\s\\]+/gi;
    if (text.match(regexp)) { return false; }
    return true;
}