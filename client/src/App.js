import React, { useState, useEffect } from "react";
import Routes from "./Nav/Routes";

// Implement sign in and cookies acceptance
const App = () => {
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const admin = ["jordantmullen11@gmail.com"];

  function readCookie(name) {
    var key = name + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(key) === 0) {
        return cookie.substring(key.length, cookie.length);
      }
    }
    return null;
  }

  // reloads the page if email is null everytime you come back to the window to reload forms
  const pageReload = () => {
    if (email === null) {
      setTimeout(function() {
        window.onblur = function() {
          window.onfocus = function() {
            window.location.reload(true);
          };
        };
      }, 2000);
    } else {
      return;
    }
  };

  // sets the email state to who is signed in
  const setEmailState = () => {
    setEmail(readCookie("Email"));
  };

  // used to clear state once user signs out
  const clearUserState = () => {
    setEmail(null);
  };

  // Sets admin state
  const setAdminState = () => {
    if (admin.includes(email) === true) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  // If browser is safari this shows just below the sign in until the user refreshes the page
  const browserRefreshWarning = props => (
    <div className="text-right">
      {email === null ? (
        <p>
          If you see this message after signing in please{" "}
          <a href={window.location.pathname}>Refresh</a> page
        </p>
      ) : null}
    </div>
  );

  // Clears email in state once user signs out
  document.getElementById("sign-out").addEventListener("click", clearUserState);

  useEffect(() => {
    setAdminState();
    setEmailState();
  });

  return (
    <>
      {/* Navbar is in HTML file */}
      {email === null ? pageReload() : null}

      {browserRefreshWarning()}

      <Routes isAdmin={isAdmin} email={email} />
    </>
  );
};

export default App;
