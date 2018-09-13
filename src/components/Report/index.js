import React, { Component } from 'react';
import { Table } from 'reactstrap';
import Title from './Title';
import Row from './Row';
import Error from './Error';
import Api from '../../api';

export default class extends Component {
    constructor( props ) {
        super( props );
        this.api = new Api();
        this.state = {
            loading : true,
            data    : []
        };
    }

    componentDidMount() {
        const { endpoint, params, dataKeyPath } = this.props;
        this.getData( endpoint, params, dataKeyPath );
    }

    /**
     * Sends GET request to API, gets the response object.
     * @argument {String} endpoint - The URI path to the API resource.
     * @argument {Object} params - Object with key-value pairs for query string.
     * @argument {String} dataKeyPath - String notation of object path to the API resource's data.
     * @returns {Object} Returns API response object.
     */
    getData = ( endpoint, params, dataKeyPath ) => {
        return this.api
            .get( endpoint, params, dataKeyPath )
            .then( data => this.setState({
                loading : false,
                data
            }))
            .catch( error => this.setState({
                loading : false,
                data    : {
                    endpoint,
                    params,
                    error
                }
            }));
    }

    /**
     * Turns data and configuration into table rows.
     * @argument {Array} data - The API response object.
     * @argument {Object} columns - Columns configuration according to `views.json`.
     * @returns {JSX|Array} Returns JSX with error, or an array of JSX rows.
     */
    createRows = ( data, columns ) => {
        if( data.error ) {
            return <tr><Error colSpan={ Object.keys( columns ).length } { ...data } /></tr>;
        } else {
            return data.map(( row, index ) => <Row data={ row } columns={ columns } key={ index } /> );
        }
    }
    
    render() {
        const { title, columns } = this.props;
        const { loading, data } = this.state;
        const headers = Object.keys( columns ).map( key => columns[ key ].header );
        const rows = this.createRows( data, columns );
        return (
            <div className="report">
                <Title loading={ loading } count={ data.length }>{ title }</Title>
                <Table striped bordered>
                    <thead>
                        <tr>{ headers.map(( header, index ) => <th key={ index }>{ header }</th> ) }</tr>
                    </thead>
                    <tbody>{ rows }</tbody>
                </Table>
            </div>
        );
    }
}
