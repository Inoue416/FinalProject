export function userNameValidator(value) {
    const regexp = /[<>`/~|*!=$&^+%()?.,;:’”＜＞'"[{\]}\s\\]+/gi;
    if (!(3 <= value.length && value.length <= 10)){
        return "3 ~ 10文字の範囲で入力してください"
    }
    else if (value.match(regexp)){
        return "使用できない文字が含まれています";
    }
    return null;
}

export function emailValidator(email) {
    if (email === null || email === undefined || email.length <= 0) return null; // null: 必須項目であることを表示する
    const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email); // true or false. true: 正しい形式, false: 間違っている
}

export function passwordValidator(password) {
    if (password === null || password === undefined || password.length <= 0) return null; // null: 必須項目であることを表示する
    const re = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/;
    return re.test(password);
}

export function passwordConfirmValidator(is_ok, password, password_confirm){
    if (is_ok == false){
        return null;
    }
    if (password == password_confirm) {
        return true;
    }
    return false;
}