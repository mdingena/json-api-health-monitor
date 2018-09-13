import Api from '.';

describe( "Api", () => {
    let api = new Api();
    
    it( "builds a query string from given parameters", () => {
        const params = {
            'param1' : 'value1',
            'param with space' : 'value with space'
        };
        expect( api.buildQueryString( params ) ).toEqual('?param1=value1&param%20with%20space=value%20with%20space');
    });
});
