class transValidation {
    email_incorrect = "Email phải có dạng Example@gmail.com."
    user_incorrect = "Tên đăng nhập phải ít nhất 3 kí tự, bao gồm chữ hoa, chữ thường, chữ số."
    password_incorrect = "Mật khẩu phải ít nhất 6 ký  tự, bao gồm chữ hoa, chữ thường, chữ số và ký tự đặc biệt."
    re_password_incorrect = "Mật khẩu nhập lại chưa chính xác."
    account_in_use = "Email đã được sử dụng."
    login_failed = "Email hoặc mật khẩu không chính xác."
    server_errors = "Có lỗi ở phía Server."

    registration_success = "Chúc mừng bạn đã đăng kí thành công."
    
}

module.exports = new transValidation;



