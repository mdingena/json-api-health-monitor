import React, { Component } from 'react';
import { Col, Badge } from 'reactstrap';

export default class extends Component {
    render() {
        let badge;
        if( this.props.loading ) {
            badge = <Badge color="secondary">Loading</Badge>;
        } else if( this.props.count === 0 ) {
            badge = <Badge color="success">Clean</Badge>;
        } else {
            badge = <Badge color="danger">{ this.props.count }</Badge>;
        }
        return(
            <Col className="title">
                <h2>{ this.props.children } { badge }</h2>
            </Col>
        );
    }
}
