/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { useState, useEffect } from 'react';
// import './SearchCompanies.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import Form from 'react-bootstrap/Form';
import Fragment from 'react';

class SearchCompanies extends React.Component {
    
    render() {
        const options=[
            { id: '12314645', label: 'amazon' },
            { id: '12354635', label: 'itunes' },
            { id: '12354645', label: 'bleep' }
          ]
        return (
            <Fragment>
                <Form.Group>
                    
                </Form.Group>
            </Fragment>
        );
    }
};


export default SearchCompanies;