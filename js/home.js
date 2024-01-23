const btn = document.getElementById("loginButton");
const targetDiv = document.getElementById("toggle_hidden");
const usrnameinputfield = document.querySelectorAll("#usrinputholder").value;
const pwdnameinputfield = document.querySelectorAll("#pwdinputholder").value;

// if (Array.from(usrnameinputfield && pwdnameinputfield).filter( input => input.value !== "");){

// }

btn.onclick = function() {
  if (pwdnameinputfield && usrnameinputfield !== "") {
      // targetDiv.style = 'display:none'
      if (targetDiv.style.display !== "none") {
        targetDiv.style.display = "none";
      } else {
        targetDiv.style.display = "none";
      }
}
};

// function login (){
//   var usernamecheck = document.getElementById("usrinputholder").value
//   var passwordcheck = document.getElementById("pwdinputholder").value
// if (usernamecheck && passwordcheck){
//   localStorage.clear()
//   localStorage.setItem("Login_data_Form",JSON.stringify({uname:usernamecheck,pwd:passwordcheck}))
// }
// }
// window.onload = function () {
//   var Login_data_Form = localStorage.getItem("Login_data_Form")
//   if (Login_data_Form){
//     var Login_data_Form_Obj = JSON.parse(Login_data_Form)
//   // document.getElementById("logindataform").innerHTML = Login_data_Form_Obj.uname
//   }
// }

