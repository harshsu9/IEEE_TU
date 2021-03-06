import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getEvent, updateEvent, clearEvent, deleteEvent } from "../../actions";

class EditEvent extends PureComponent {
  state = {
    formdata: {
      _id: this.props.match.params.id,
      title: "",
      image: "",
      description: "",
      date: ""
    }
  };

  handleInput = (event, name) => {
    const newFormdata = {
      ...this.state.formdata
    };
    newFormdata[name] = event.target.value;
    this.setState({
      formdata: newFormdata
    });
  };

  submitForm = e => {
    e.preventDefault();
    this.props.dispatch(updateEvent(this.state.formdata));
  };

  componentWillMount() {
    this.props.dispatch(getEvent(this.props.match.params.id));
  }

  deletePost = () => {
    this.props.dispatch(deleteEvent(this.props.match.params.id));
  };

  redirectUser = time => {
    setTimeout(() => {
      this.props.history.push("/ieee/events");
    }, time);
  };

  componentWillReceiveProps(nextProps) {
    let event = nextProps.events.event;
    this.setState({
      formdata: {
        _id: event._id,
        title: event.title,
        image: event.image,
        description: event.description,
        date: event.date
      }
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearEvent());
  }

  render() {
    return (
      <div className="container">
        {this.props.events.updateEvent ? (
          <div>{this.redirectUser(0)}</div>
        ) : null}

        <form onSubmit={this.submitForm}>
          <h2 className="text-center">Edit Event</h2>
          <hr />
          <div>
            <label>Title:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter the Title"
              value={this.state.formdata.title}
              onChange={event => this.handleInput(event, "title")}
            />
            <br />
            <label>Image:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Enter the Image"
              value={this.state.formdata.image}
              onChange={event => this.handleInput(event, "image")}
            />
            <br />
            <label>Date:</label>
            <input
              className="form-control"
              type="date"
              value={this.state.formdata.date}
              onChange={event => this.handleInput(event, "date")}
            />
            <br />
            <label>Description:</label>
            <textarea
              value={this.state.formdata.description}
              rows="11"
              className="form-control"
              placeholder="Enter a description"
              onChange={event => this.handleInput(event, "description")}
            />
          </div>
          <br />
          <button className="btn btn-block btn-warning" type="submit">
            Edit Event
          </button>
          <div className="btn btn-block btn-danger" onClick={this.deletePost}>
            Delete Post
          </div>
        </form>

        {this.props.events.postDeleted ? (
          <div className="btn btn-block btn-success">
            Post Deleted!!!
            {this.redirectUser(2000)}
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.events
  };
}

export default connect(mapStateToProps)(EditEvent);
