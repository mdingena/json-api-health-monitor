import React from 'react';
import { shallow } from 'enzyme';
import Row from './Row';

const mockData = {
    "ApiLogId": 1248,
    "HotelId": 1,
    "HotelName": "Demo Hotel",
    "MockPercentage": 0.8476666666,
    "Reason": null,
    "RequestDateTime": "2018-06-26T13:59:54.8883479",
    "LastSuccessfulRequest": "2018-06-26T15:08:17.4264805"
};

const mockColumns = {
    "ApiLogId": {
        "header": "Log",
        "transform": "none"
    },
    "HotelName": {
        "header": "Hotel",
        "transform": "none"
    },
    "RequestDateTime": {
        "header": "Requested on",
        "transform": "noIso8601Milliseconds"
    },
    "LastSuccessfulRequest": {
        "header": "Last successful request",
        "transform": "noIso8601Milliseconds"
    },
    "MockPercentage": {
        "header": "Fake percentage for test",
        "transform": "percentage"
    }
};

describe( 'Row', () => {
    let row;

    beforeEach( () => {
        row = shallow( <Row data={ mockData } columns={ mockColumns } key={ 1 } /> );
    });

    it( 'renders correctly', () => {
        expect( row ).toMatchSnapshot();
    });

    it( 'renders requested cells', () => {
        expect( row.find( 'tr' ).children().length ).toEqual( Object.keys( mockColumns ).length );
    });

    it( 'transforms percentage correctly', () => {
        expect( row.find( 'tr' ).childAt( 4 ).text() ).toEqual( "84.77%" );
    });

    it( 'transforms datetime correctly', () => {
        expect( row.find( 'tr' ).childAt( 2 ).text() ).toEqual( "2018-06-26T13:59:54" );
        expect( row.find( 'tr' ).childAt( 3 ).text() ).toEqual( "2018-06-26T15:08:17" );
    });
});
