const btn = document.getElementById("loginButton");
const targetDiv = document.getElementById("toggle_hidden");
// const usr_login = document.querySelectorAll("#usr-glogin").value;
// const pwd_login = document.querySelectorAll("#pwd-glogin").value;
// const usr_login = document.getElementById("usr-glogin").getAttribute('Value');
// const pwd_login = document.getElementById("pwd-glogin").getAttribute('Value');

// const pattern_usr = /^[a-zA-Z0-9]{5,10}$/i;
// const pattern_pwd = /^[a-zA-Z0-9@#$]{6,11}[a-z]{1}[A-Z]{1}$/i

// function checkPatternusr() {
//   var pattern_usr = /^[a-zA-Z0-9]{5,10}$/i;
//   result1 =  pattern_usr.test(usr_login.value);
// }
// function checkPattern_pwd() {
//   var pattern_pwd = /^[a-zA-Z0-9@#$]{6,11}[a-z]{1}[A-Z]{1}$/i
//   result2 =  pattern_pwd.test(pwd_login.value);
// }
// function check_pattern_usr_pwd (){
// if(pattern_usr.test(usr_login.value) === true || pattern_pwd.test(pwd_login.value) ===   true){
// function req (){
//   if (usr_login.length == 0){
//     alert("message");
//     return false;
//   }
//   alert("message2");
//   return true;
// }
btn.onclick = function () {
    targetDiv.style = 'display:none'
      if (targetDiv.style.display !== "none") {
      targetDiv.style.display = "none";
      } else {
      targetDiv.style.display = "block";
      }
    };
