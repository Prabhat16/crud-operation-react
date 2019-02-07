import React from "react";
import {connect} from "react-redux";
import {signIn, signOut} from "../actions"

class GoogleAuth extends React.Component{

        componentDidMount() {

        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                        clientId : '217822015178-pdc32kade26412jqq8d0695uj1q5u900.apps.googleusercontent.com',
                        scope : "email"
            }).then(() =>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChanged(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChanged);
            })
        })

    };

    onSignInClick = ()=>{
        this.auth.signIn()

    };

    onSignOutClick = ()=>{

        this.auth.signOut()

    };

    onAuthChanged = (isSignedIn) =>{

        if(isSignedIn){
         this.props.signIn(this.auth.currentUser.get().getId())
        }
        else{
            this.props.signOut()
        }

    };

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null;
        }else if(this.props.isSignedIn){
            return (
                <button onClick = {this.onSignOutClick} className = "ui red google button">
                <i className = "google icon" />
                Sign Out
                </button>
            )
        }
        else{
            return (
                <button onClick = {this.onSignInClick} className = "ui red google button">
                <i className = "google icon" />
                Sign In with Google
                </button>
            )
        }
    }

    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        )
    }
};

const mapStateToProps = (state)=>{
    return{
        isSignedIn : state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {signIn,signOut})(GoogleAuth);