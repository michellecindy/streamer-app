import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

// The streamdelete component is basically only a modal component
class StreamDelete extends React.Component {

    // the id you can get out of props because of the ":id" part in the route in the App component
    componentDidMount() {
        console.log("This.props in componentDidMount()", this.props);
        this.props.fetchStream(this.props.match.params.id);
    }

    // pass the actions separately so you can customize the modal for each usage
    renderActions() {

        const id = this.props.match.params.id;

        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button ">Cancel</Link>
            </React.Fragment>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return "Are you sure you want to delete this stream"
        }
        return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
    }

    render() {
        return (
            <Modal 
                title="Delete stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
}

// we want to call it with ownProps so we can get the match object with the id from the props
const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);