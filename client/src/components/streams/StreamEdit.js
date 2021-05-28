import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        // make something happen when clicking the submit button
        console.log("Formvalues upon onSubmit call:", formValues);
        this.props.editStream(this.props.match.params.id, formValues)
    }

    // If you console.log props you can get the 'match' variables, which will match what is in the url
    // e.g. for url /streams/edit/:id match.params will contain the id variable.
    render() {
        console.log(this.props);
        if (!this.props.stream) {
            return <div>Loading</div>
        }
        // initialValues is a special prop that is coming from reduxform to pass the initial values in an edit component. 
        // Shorter can be in this prop just to pass the {this.props.stream} because that is exactly the object as im passing below,
        // but leaving it like this for clarity for now.
        // every property that you add in there will show up in the console.log(this.props)
        // you can also use lodash: _pick(this.props.stream, 'title', 'description')
        return (
            <div>
                <h3>Edit the stream: {this.props.stream.title}</h3>
                <StreamForm 
                    onSubmit={this.onSubmit} 
                    initialValues={{title: this.props.stream.title, description:this.props.stream.description}}>
                </StreamForm>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // the state object contains our streams, and the ownProps contains the id 
    // of the stream we want in the match parameter.
    return (
        { stream: state.streams[ownProps.match.params.id] }
    )
}
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);