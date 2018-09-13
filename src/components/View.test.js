import React from 'react';
import { shallow } from 'enzyme';
import View from './View';

const mockView = {
    "duration": 30,
    "reports": [
        {
            "endpoint": "/v1/health/integrations/requests/success-rates",
            "params": {},
            "title": "Integration Request Success Rates",
            "width": 3,
            "columns": {
                "IntegrationId": {
                    "header": "Integration",
                    "transform": "dictionary"
                },
                "TotalRequests": {
                    "header": "Total requests",
                    "transform": "none"
                },
                "SuccessfulRequests": {
                    "header": "Successful requests",
                    "transform": "none"
                },
                "SuccessRate": {
                    "header": "Success rate",
                    "transform": "percentage"
                },
                "LastRequestDateTime": {
                    "header": "Last request on",
                    "transform": "datetime"
                }
            }
        },
        {
            "endpoint": "/v1/health/integrations/requests/failed",
            "params": {},
            "title": "Failed Integration Requests",
            "width": 4,
            "columns": {
                "ApiLogId": {
                    "header": "Log",
                    "transform": "none"
                },
                "HotelName": {
                    "header": "Hotel",
                    "transform": "none"
                },
                "IntegrationId": {
                    "header": "Integration",
                    "transform": "dictionary"
                },
                "RequestDateTime": {
                    "header": "Requested on",
                    "transform": "datetime"
                },
                "LastSuccessfulRequest": {
                    "header": "Last successful request",
                    "transform": "datetime"
                }
            }
        }
    ]
};

describe( 'View', () => {
    let view;

    beforeEach( () => {
        const { reports } = mockView;
        const layout = reports.reduce( ( sizes, report ) => `${ sizes } ${ report.width }fr`, '' );

        view = shallow( <View reports={ reports } layout={ layout } timecode={ 1 } /> );
    });

    it( 'renders correctly', () => {
        expect( view ).toMatchSnapshot();
    });

    it( 'contains two reports', () => {
        expect( view.children().length ).toEqual( 2 );
    });
});
