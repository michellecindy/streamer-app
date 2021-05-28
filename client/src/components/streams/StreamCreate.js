import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {


    // When the user submits the form:
    // the inputs will be validated
    // the createStream method will be called with all the formValues
    // the actioncreator 'createStream' will be called (because it is hooked up in the bottom of this file)
    // the actioncreator will make a post request using axios to our json server to create a new stream
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    // The field component needs a component prop in order to show something on the screen
    // the form needs to have a classname of error for the error message created in the renderError method to show up
    render() {
        return (
            <div>
                <h3>Create a stream</h3>
                <StreamForm onSubmit={this.onSubmit}>

                </StreamForm>
            </div>
            
        )
    }
    
};

export default connect(null, { createStream })(StreamCreate);