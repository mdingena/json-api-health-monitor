import React, { Component } from 'react';

export default class extends Component {
    constructor( props ) {
        super( props );
        this.state = {
            width: '0%',
            transitionDuration : '0ms'
        };
    }

    componentDidMount() {
        const delay = 25;
        setTimeout( () => {
            this.setState({
                width: '100%',
                transitionDuration : `${( this.props.duration * 1000 ) - delay }ms`
            });
        }, delay );
    }
    
    render() {
        return(
            <div className="viewtimer">
                <div className="viewtimer-progress" style={ this.state }></div>
            </div>
        );
    }
}
