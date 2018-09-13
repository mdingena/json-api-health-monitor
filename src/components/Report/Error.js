import React, { Component } from 'react';
import { Alert } from 'reactstrap';

export default class extends Component {
    render() {
        return(
            <td colSpan={ this.props.colSpan }>
                { this.props.endpoint }<br />
                { JSON.stringify( this.props.params ) }
                <Alert color="danger">
                    { this.props.error }
                </Alert>
            </td>
        );
    }
}
