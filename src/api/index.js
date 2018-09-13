import request from 'request-promise';
import { traverse } from '../utils';
import config from '../config';

export default class {
    constructor( options = {} ) {
        this.options = Object.assign( config, options );
    }

    /**
     * Turns object's key-value pairs into query string.
     * @argument {Object} params - Object with key-value pairs.
     * @returns {String} Returns query string.
     */
    buildQueryString = params => {
        let query = [];
        Object.keys( params ).forEach( key => {
            query.push( `${ key }=${ params[ key ] }` );
        });
        return encodeURI( `?${ query.join( '&' ) }` );
    }

    /**
     * Promises an API response object.
     * @argument {String} endpoint - The URI path to the API resource.
     * @argument {Object} params - Object with key-value pairs for query string.
     * @returns {Object} Returns a Promise of the API response object.
     */
    get = ( endpoint, params = {}, dataKeyPath = '' ) => {
        return new Promise(( resolve, reject ) => {
            request({
                url : `${ this.options.apiBaseUrl }${ endpoint }${ Object.keys( params ).length > 0 ? `${ this.buildQueryString( params ) }` : '' }`
            }).then( response => JSON.parse( response )).then( json => {
                const data = dataKeyPath.trim() === '' ? json : traverse( json, dataKeyPath );
                if( typeof data === "object" ) {
                    resolve( data );
                } else {
                    reject( data );
                }
            }).catch( error => reject( error.message ) );
        });
    }
}
