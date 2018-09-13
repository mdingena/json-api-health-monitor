/**
 * Transforms a value according to the destination type.
 * @argument {String|Number} value - Value taken from API response object.
 * @argument {String} transform - Transform the value according to `views.json`.
 * @returns {String} Returns transformed value.
 */
export const transform = ( value, transform ) => {
    switch( transform ) {
        case "percentage":
            return `${ ( value * 100 ).toFixed( 2 ) }%`;
        case "noIso8601Milliseconds":
            return value.substr( 0, 19 );
        case "none":
        default:
            return value;
    }
};

/**
 * Traverses `data` object using dot-separated keys.
 * This allows you to have nested objects in the API response, but still provide the flat column's key.
 * @example
 * // Returns "Hello World" in data = { foo : { bar : { baz : "Hello World" } } }
 * traverse( data, 'foo.bar.baz' )
 * @returns {String|Number} Value from the API response object at the key's location.
 */
export const traverse = ( data, indentifier ) => {
    let keys = indentifier.split('.');
    let value = data;
    while( keys.length && typeof value === 'object' ) {
        const key = keys.shift();
        value = value[ key ];
    }
    return value;
};

/**
 * Takes API response object and returns an array of columns according to `views.json` configuration.
 * @argument {Object} data - API response object.
 * @argument {Object} columns - Configured `columns` from `views.json`.
 * @returns {Array} Returns array with cells to display in the report.
 */
export const mapDataToColumns = ( data, columns ) => {
    return Object.keys( columns ).map( key => transform( traverse( data, key ), columns[ key ].transform ));
};
