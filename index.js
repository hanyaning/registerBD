//获取节点
var userName = $('#userName');
var loginSubmit = $('#loginSubmit');
var userNameError = $('#userNameError');
var userName_msg = $('#userName_msg');
var userPhone = $('#userPhone');
var userPhoneError = $('#userPhoneError');
var userPassword_msg = $('#userPassword_msg');
var userPassword = $('#userPassword');
var passwordMsg = $('#passwordMsg');
var userPasswordError = $('#userPasswordError');
var userCode = $('#userCode');
var userCodeError = $('#userCodeError');
var inputVerifyCode = $('#inputVerifyCode');


//用户名判断
function userNameCheck() {
    //用户名支持内容
    var userNameMsg = userName.val();
    if (userNameMsg === '') {
        userNameError.html("用户名仅支持中英文数字和下划线,且不能为纯数字的正则表达式");
        userName.select();
        return false;
    } else {
        if (!(/^(?!(\d+)$)[\u4e00-\u9fff\w]+$/.test(userNameMsg))) {
            userNameError.html("用户名仅支持中英文数字和下划线,且不能为纯数字的正则表达式");
            userName.select();
            return false;
        }
        //用户名长度判断
        var textFlag = /^[\u4E00-\u9FA5]+$/.test(userNameMsg);
        var textLength = userNameMsg.length;
        if (textFlag && textLength > 7) {
            userNameError.html('用户名不能超过7个汉字或者14个字符');
            userName.select();
            return false;
        } else if (!textFlag && textLength > 14) {
            userNameError.html('用户名不能超过7个汉字或者14个字符');
            userName.select();
            return false;
        }
    }
}
//手机号判断
function userPhoneCheck() {
    var userPhone_msg = userPhone.val();
    if (userPhone_msg === '') {
        userPhoneError.html('手机号格式不正确');
        userPhone.select();
        return false;
    } else {
        if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(userPhone_msg))) {
            userPhoneError.html('手机号格式不正确');
            userPhone.select();
            return false;
        }
    }
}
//密码为空的判断
function userPwdCheck() {
    var userPasswordMsg = userPassword.val();
    if (userPasswordMsg === '') {
        userPasswordError.html('密码设置不符合要求');
        userPassword.select();
        return false;
    }
}
//验证码为空的验证
function userCodeCheck() {
    var userCodeMsg = userCode.val();
    if (userCodeMsg === '') {
        userCodeError.html('验证码不能为空!');
        userCode.select();
        return false;
    }
}
//获取验证码
inputVerifyCode.click(function () {
    if (userName.val() === '') {
        userNameCheck();
    } else if (userPhone.val() === '') {
        userPhoneCheck();
    } else if (userPassword.val() === '') {
        userPwdCheck();
    } else {
        var time = 10;
        var timer = setInterval(function () {
            time = time - 1;
            if (time !== 0) {
                inputVerifyCode.attr('value', "验证码获取中(" + time + ")");
                inputVerifyCode.attr("disabled",'disabled');
            } else {
                inputVerifyCode.attr('value', "获取验证码");
                userCodeError.html('验证码超时');
                clearInterval(timer);
            }
        }, 1000);
    }
})

//密码的判断
var isRightArr = [true, true, true];
userPassword.bind("input propertychange", function () {
    var userPasswordMsg = userPassword.val();
    if (userPasswordMsg !== '') {
        for (var i = 0; i < isRightArr.length; i++) {
            switch (i) {
                case 0:
                    //判断长度
                    if (userPasswordMsg.length < 8 || userPasswordMsg.length > 14) {
                        isRightArr[0] = false;
                    } else {
                        isRightArr[0] = true;
                    }
                    break;
                case 1:
                    //字母和数字
                    if (!(/((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-z\d#@!~%^&*]{1,14}/.test(userPasswordMsg))) {
                        isRightArr[1] = false;
                    } else {
                        isRightArr[1] = true;
                    }
                    break;
                case 2:
                    //空格
                    if (userPasswordMsg.indexOf(" ") > -1) {
                        isRightArr[2] = false;
                    } else {
                        isRightArr[2] = true;
                    }
                    break;
                default:
                    return;
            }
        }
        for (var i = 0; i < isRightArr.length; i++) {
            if (isRightArr[i] === true) {
                $('#isRight' + i).html("✓");
            } else {
                $('#isRight' + i).html("x");
            }
        }
    }

})

function validate(filed) {
    if (filed === '#userName') {
        //console.log(userNameCheck());
        userNameCheck();
    } else if (filed === '#userPhone') {
        userPhoneCheck();
    } else if (filed === '#userPassword') {
        userPwdCheck();
    } else if (filed === '#userCode') {
        userCodeCheck();
    }
    //return true;
}

loginSubmit.click(function () {
    if (!validate('#userName') || !validate('#userPhone') || !validate('#userPassword') || !validate('#userCode'))
        return;
})
//用户名框提示内容
userName.focus(function () {
    userName_msg.css("display", 'block');
});
userName.focusout(function () {
    userName_msg.css("display", 'none');
});
//密码框提示内容
userPassword.focus(function () {
    userPassword_msg.css("display", "block");
});
userPassword.focusout(function () {
    userPassword_msg.css("display", "none");
});
//问号按钮的提示
passwordMsg.click(function () {
    userPassword_msg.css("display", "block");
})
function focusoutCheck(filed, nameflag) {
    $(filed).focusout(function () {
        //console.log(nameflag());
        if (nameflag() === false) {
            $(filed).select();
        } else {
            $(filed + 'Error').html('');
            return true;
        }
    })
}
focusoutCheck('#userName', userNameCheck);
focusoutCheck('#userPhone', userPhoneCheck);
focusoutCheck('#userPassword', userPwdCheck);
focusoutCheck('#userCode', userCodeCheck);
