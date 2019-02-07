import React from "react";
import {Field,reduxForm} from "redux-form";

class StreamForm extends React.Component{

    renderError({error, touched}){
        if(touched && error){
            return(
                <div className = "ui error message">
                <div className = "header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {

        const className = `field ${meta.error && meta.touched ? 'error' : ""}`

       return (
        <div className = {className}>
            <label>{label}</label>
            <input {...input} autoComplete ="off" />
            {this.renderError(meta)}
        </div>
       )

    };

    onFormSubmit = (formValues)=> {
        this.props.onFormSubmit(formValues)
    }

    render(){
       
            return(
                <form onSubmit = {this.props.handleSubmit(this.onFormSubmit)} className = "ui form error">
                    <Field name="title" component = {this.renderInput} label = "Enter a Title" />
                    <Field name="description" component = {this.renderInput} label = "Enter a Description" />
                    <button className = "ui button primary">Submit</button>
                </form>
        )   

    }
};

const validate = (formValues)=>{
    const error = {};

    if(!formValues.title){
        error.title = "You must enter a title"
    }

    if(!formValues.description){
        error.description = "You must enter a description"
    }

    return error;
};



export default reduxForm({
    form:"StreamCreate",
    validate : validate
})(StreamForm);
