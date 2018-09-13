import React, { Component } from 'react';
import Api from '../api';
import View from './View';
import Viewtimer from './Viewtimer';
import views from '../views.json';

export default class extends Component {
    constructor( props ) {
        super( props );
        this.api = new Api();
        this.state = { view : 0 };

        // Set up timer to switch to next view
        setTimeout( () => {
            this.nextView();
        }, views[ this.state.view ].duration * 1000 );
    }
    
    /**
     * Switches the app to the next view containing reports.
     */
    nextView = () => {
        const currentView = this.state.view;
        const view = currentView + 1 === views.length ? 0 : currentView + 1;
        this.setState({ view }, () => {
            setTimeout( () => {
                this.nextView();
            }, views[ view ].duration * 1000 );
        });
    }

    render() {
        const { reports, duration } = views[ this.state.view ];
        const layout = reports.reduce( ( sizes, report ) => `${ sizes } ${ report.width }fr`, '' );
        const timecode = Date.now();

        return (
            <div className="app">
                <Viewtimer duration={ duration } key={ timecode } />
                <View reports={ reports } layout={ layout } timecode={ timecode } />
            </div>
        );
    }
}
