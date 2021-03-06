
let paramsObj = {};

if (params) {
  paramsObj = JSON.parse('{"' + decodeURI(params.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');

  //  if Url has emailverification vtype make an ajax request to email verification API

  if (paramsObj.vtype === "emailverification") {
    $.ajax({
      method: "POST",
      url: domainName + "/ajax_handler/login",
      dataType: "json",
      data: $.param({
        vtoken: paramsObj.vtoken,
        action: "emailVerify"
      }),
      error: function (xhr) {
        $(".messages").text(xhr.responseJSON);
        $(".messages").attr("class", "error-message");
      }
    }).done(function (ret) {
      if (ret.status == "success") {
        localStorage.setItem("LrEmailStatus", "verified");
        $(".messages").text(ret.message).delay(2500).fadeOut(300);
        $(".messages").text(ret.message);
        $(".messages").attr("class", "success-message");
      } else if (ret.status == "error") {
        $(".messages").text(ret.message).delay(2500).fadeOut(300);
        $(".messages").attr("class", "error-message");
      }
    });
  }
  //  if Url has forgotpassword action_completed, display message


  else if (paramsObj.action_completed === "forgotpassword") {

    $("#messages").text("Forgot Password Link Send Successfully, Check your Mailbox").attr("class", "success-message").delay(2500).fadeOut(300);
  }

  //  if Url has register action_completed, display message

  else if (paramsObj.action_completed === "register") {

    $("#messages").text("Registered Successfully, Check your Mailbox").attr("class", "success-message").delay(2500).fadeOut(300);
  }

  //  if Url has vytpe reset, redirect to the reset password page

  else if (paramsObj.vtype === "reset") {
    let resettoken = paramsObj.vtoken;
    window.location.replace("resetpassword.html?vtype=reset&vtoken=" + resettoken);
  }

}


// function to get the URL parameters

function getParameterByName(name) {
  name = name.replace(/[[]/, '\[').replace(/[]]/, '\]');
  var regex = new RegExp('[\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search); return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// function to set the cookie



function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


var access_token = getParameterByName("token");

if (access_token != "" && access_token != null) {
  setCookie("lr-session-token", access_token, "No Days")
  localStorage.setItem("lr-session-token", access_token); // First parameter will be the local storage name and 2nd parameter will be access_token
}

// Checking if access token exist in the localStorage if so redirecting to the profile page


function checkSession() {
  var accesstoken = localStorage.getItem("lr-session-token");
  if (accesstoken != "" && accesstoken != null) {
    window.location.replace("profile.html");
    return;
  }
}
checkSession();

