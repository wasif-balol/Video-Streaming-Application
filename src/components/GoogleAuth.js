import React from "react";
import { connect } from "react-redux";
import { gapi } from "gapi-script";
import { signIn, signOut } from "../Actions";
class GoogleAuth extends React.Component {
  componentDidMount() {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId:
            "645474566273-fh8m9s0go1bf6q91ontprurh9ivfgdqt.apps.googleusercontent.com",
          scope: "email",
        })
        .then(
          (onInit) => {
            this.auth = window.gapi.auth2.getAuthInstance();
            this.onAuthChanged(this.auth.isSignedIn.get());
            this.auth.isSignedIn.listen(this.onAuthChanged);
          },
          (onError) => {
            console.log("----------------------");
            console.log(onError);
          }
        );
    });
  }
  onAuthChanged = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with google
        </button>
      );
    }
  }

  render() {
    return (
      <div>
        <div>{this.renderAuthButton()}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
