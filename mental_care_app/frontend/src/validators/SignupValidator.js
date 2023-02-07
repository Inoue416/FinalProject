function userNameValidator(value) {
    const regexp = /[<>\\\/`~|*!=$&^%()/?.,;:’”＜＞'"\[{\]}\s]+/gi;
    if (!(3 <= value.length && value.length <= 10)){
        return "3 ~ 10文字の範囲で入力してください"
    }
    else if (value.match(/^[<>/!?.,;:'"[{]}]/)){
        return "使用できない文字が含まれています";
    }
    return "1";
}


