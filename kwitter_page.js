var firebaseConfig = {
      apiKey: "AIzaSyClaXyQtfGcsWV9kALBAXXOH7S_Ab44nZo",
      authDomain: "test-3a486.firebaseapp.com",
      databaseURL: "https://test-3a486-default-rtdb.firebaseio.com",
      projectId: "test-3a486",
      storageBucket: "test-3a486.appspot.com",
      messagingSenderId: "398828509268",
      appId: "1:398828509268:web:dfa990eee1e991da8cb5c1"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var user_name = localStorage.getItem("user_name");
    var room_name = localStorage.getItem("room_name");

    function send()
    {
         var msg = document.getElementById("msg").value;
         firebase.database().ref(room_name).push({
               name:user_name,
               message:msg,
               like:0
         });
         document.getElementById("msg").value = " ";
    }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);

var name = message_data['name'];
var message = message_data['message'];
var like = message_data['like'];+

var name_with_tag = "<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
var message_with_tag = "<h4 class='message_h4'>"+message+"</h4>";
var like_button = "<button class='btn btn-success' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
var span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like : " +like+ "</span> </button><hr>";
var row = name_with_tag + message_with_tag + like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
      console.log("Clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update
      ({
           like:updated_likes
      });
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}