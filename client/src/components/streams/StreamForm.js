// See the refactoring of streactcreate to be using streamForm in video 364 
// in react course 

import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    // destructuring out the 'meta' property
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error">
                    <div className="ui error message">{error}</div>
                </div>
            )
        }
    }

    // destructuring out the 'formProps' property
    renderInput = ({ input, label, meta }) => {

        const className = `field ${meta.error && meta.touched ? 'error' : ""}`;

        console.log(meta);
        // this syntax takes the keyvalue pairs and add them as props to the input element
        // it uses the onchange and value ones, and some other ones as well
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                <div>{this.renderError(meta)}</div>
            </div>

        )
    }

    // When the user submits the form:
    // the inputs will be validated
    // the createStream method will be called with all the formValues
    // the actioncreator 'createStream' will be called (because it is hooked up in the bottom of this file)
    // the actioncreator will make a post request using axios to our json server to create a new stream
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    // The field component needs a component prop in order to show something on the screen
    // the form needs to have a classname of error for the error message created in the renderError method to show up
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">  
                <Field name="title" component={this.renderInput} label="Enter title"/>
                <Field name="description" component={this.renderInput} label="Enter description"/>
                <button className="ui button">Submit</button>
            </form>
        )
    }
    
};

const validate = (formValues) => {
    const errors = {}

    if (!formValues.title) {
        // no title filled in
        errors.title = "You must enter a title";
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    
    return errors;
};

// Streamform gets wrapped inside the reduxForm helper. So if we pass props to this component
// we are technically passing props to reduxForm which we can then use. So this
// gives some extra functionality that we can use. (An example is initialValues)
export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);



//// Below from the original StreamCreate component is shown how you can do it 
// if you have two exports / wraps in the connect function

// const formWrapped = reduxForm({
//     form: 'streamCreate',
//     validate: validate
// })(StreamCreate);

// export default connect(null, { createStream })(formWrapped);