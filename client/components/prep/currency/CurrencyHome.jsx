import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../../actions';

import CurrencyChart from './CurrencyChart.jsx';
import ExchangeRatesDisplay from './ExchangeRatesDisplay.jsx';

const dummyData = {
  traveller: {
    name: 'Tom'
  },
  trip: {
    origin: {
      country: {
        code: 'USA',
        name: 'United States of America'
      },
      currency: {
        code: 'USD',
        name: 'United States Dollar'
      }
    },
    destinations: [
      {
        country: 'UK',
        currency: {
          code: 'GBP',
          name: 'British Pound Sterling'
        },
        budget: 100
      },
      {
        country: 'Germany',
        currency: {
          code: 'EUR',
          name: 'Euro'
        },
        budget: 100
      }
    ]
  }
};

// returns an obj where rates property is an obj with each property being
// another currency (ex: GBP) mapped to its exchange rate
const currencyApiEndpoint = 'https://api.fixer.io/latest?base=usd';

// returns a country object where currency property is an array of objects
// with each object being a currency info (for usa just one obj for usd)
const countryInfoEndpoint = 'https://restcountries.eu/rest/v2/alpha/usa';

class CurrencyHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartedCurrency: 'GBP',
      quotes: {}
    }
  }

  componentWillMount() {
    return (async () => {
      let quotes = await fetch('https://api.fixer.io/latest?base=usd');
      this.setState({ quotes });
    })();
  }

  render() {
    return (
      <div className='currencyHome'>
        <h1>Currency Home</h1>
        <div>
          <span>
            You are coming from {dummyData.trip.origin.country.name} {' '}
            ({dummyData.trip.origin.country.code}) 
            where your local currency is the {' '}
            {dummyData.trip.origin.currency.name} {' '}
            ({dummyData.trip.origin.currency.code})
          </span>
          <ExchangeRatesDisplay 
            origin={dummyData.trip.origin}
            destinations={dummyData.trip.destinations}
            quotes={this.state.quotes}
          />
          <CurrencyChart 
            baseCurrency={dummyData.trip.origin.currency.code}
            targetCurrency={this.state.chartedCurrency}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    example: state.example,
    router: state.router
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyHome));