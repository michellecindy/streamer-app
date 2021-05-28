import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component {

    componentDidMount() {
        // this is to tell the library to retrieve this library. This is because
        // google keeps the library as small as possible so you need to request the specific part
        window.gapi.load('client:auth2', () => {
            // when the library is loaded do andother request with the client key and scope
            // returns a promise, so will let us know when it is finished and then the 'then' statement will be executed.
            window.gapi.client.init({
                clientId: '596140655707-08dvnuouslafiejd1619o6jakp1psa3p.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    // To change the signed in text dynamically
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn == null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red button" onClick={this.onSignOutClick}>
                    <i className="google icon"></i>
                    Sign out
                </button>
            )
        } else {
            return (
                <button className="ui red button" onClick={this.onSignInClick}>
                    <i className="google icon"></i>
                    Sign in with Google
                </button>
            )
        }

    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);