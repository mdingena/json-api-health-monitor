import React, { Component } from 'react';
import Report from './Report';

export default class extends Component {
    render() {
        const reports = this.props.reports.map(( report, index ) => <Report { ...report } key={ `${ this.props.timecode }.${ index }` } /> );
        return (
            <div
                className="reports"
                style={{
                    gridTemplateColumns : this.props.layout
                }}
            >
                { reports }
            </div>
        );
    }
}
