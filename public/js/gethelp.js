function validateTextbox() {

  var name = document.getElementById("name");
  var phone = document.getElementById("phone");
  var address = document.getElementById("address");
  var email = document.getElementById("email");
  var msg;
  var namep = /[0-9]/;
  var phonep = /[A-Za-z]/;
  var em = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (em.test(email.value.trim())) {
    document.getElementById("demo4").style.visibility = "hidden";
  }

  if (/[^a-zA-Z0-9]/.test(name.value.trim()) == false) {

    document.getElementById("demo1").style.visibility = "hidden";
  }

  if ((phone.value.length == 10) && (/[^a-zA-Z0-9]/.test(phone.value.trim()) == false)) {

    document.getElementById("demo3").style.visibility = "hidden";

  }

  if (address.value.length > 10) {

    document.getElementById("demo2").style.visibility = "hidden";

  }


  if (name.value.trim() == " " || email.value.trim() == "" || phone.value.trim() == "" || address.value.trim() == "") {
    alert("Fill all the fields to continue");
    return false;
  }
  else {
    if (name.value != "") {
      document.getElementById("demo1").style.visibility = "visible";

      if (name.value.length < 5) {

        msg = "*Enter valid name";
        document.getElementById("demo1").innerHTML = msg;
        return false;
      }
      if (namep.test(name.value.trim())) {

        msg = "*Name should not contain digits.";
        document.getElementById("demo1").innerHTML = msg;
        return false;
      }

      /*if(!namep.test(name.value.trim())||!phonep.test(name.value.trim())) {
           msg="*no special characters allowed";
            document.getElementById("demo1").innerHTML = msg;
          return false;}*/

      if (/[^a-zA-Z0-9\s]/.test(name.value.trim())) {
        msg = "*No special characters allowed.";
        document.getElementById("demo1").innerHTML = msg;
        /*alert('Input is not alphanumeric');*/
        return false;
      }

      if (name.value.length > 5) {
        document.getElementById("demo1").style.visibility = "hidden";
      }

      if (!namep.test(name.value.trim())) {
        document.getElementById("demo1").style.visibility = "hidden";

      }
    }
    if (address.value != "") {
      if (address.value.length < 10) {
        document.getElementById("demo2").style.visibility = "visible";

        msg = "*Minimum 10 characters required.";
        document.getElementById("demo2").innerHTML = msg;
        return false;

      }
      /*if(  /[^a-zA-Z0-9\-\/]/.test( address.value.trim() ) )
        {
           document.getElementById("demo2").style.visibility = "visible";
           msg="*only -,/allowed";
           document.getElementById("demo2").innerHTML = msg;
         return false;
       }*/

    }

    if (address.value.length > 10) {
      document.getElementById("demo2").style.visibility = "hidden";


    }



    if (phone.value != "") {
      if (phone.value.length == 10) {

        document.getElementById("demo3").style.visibility = "hidden";

      }

      if (phone.value.length != 10) {
        msg = "*Phone number must contain 10 digits.";
        document.getElementById("demo3").style.visibility = "visible";
        document.getElementById("demo3").innerHTML = msg;
        return false;
      }

      if (phonep.test(phone.value.trim())) {
        msg = "*Phone number should not contain letters.";
        document.getElementById("demo3").style.visibility = "visible";
        document.getElementById("demo3").innerHTML = msg;
        return false;
      }

      if (/[^a-zA-Z0-9]/.test(phone.value.trim())) {
        msg = "*No special characters allowed.";
        document.getElementById("demo3").style.visibility = "visible";

        document.getElementById("demo3").innerHTML = msg;
        /*alert('Input is not alphanumeric');*/
        return false;
      }
    }

    if (em.test(email.value.trim()) == false) {
      msg = "*Invalid email.";
      document.getElementById("demo4").style.visibility = "visible";
      document.getElementById("demo4").innerHTML = msg;
      /*alert('Input is not alphanumeric');*/
      return false;

    }

  }

  alert("Your form is filled successfully.");
  return true;

}

function redirectPage() {
  let check = validateTextbox();
  if (check == true) {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    fetch('http://localhost:5500/gethelp', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name: name, phone: phone,address:address,email:email })
    })
      .then((response) => 
      {
        if (response.status==200)
        {
          location.reload();
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
  }
}