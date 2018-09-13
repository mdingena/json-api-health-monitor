import React, { Component } from 'react';
import { mapDataToColumns } from '../../utils';

export default class extends Component {
    render() {
        const { data, columns } = this.props;
        const cells = mapDataToColumns( data, columns );
        return (
            <tr>
                { cells.map(( cell, index ) => <td key={ index }>{ cell }</td> ) }
            </tr>
        );
    }
}
