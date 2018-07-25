/* global describe, it, before, after, beforeEach */

import React from 'react';
import Promise from 'bluebird';
import axios from 'axios';
import sinon from 'sinon';
import { expect } from 'chai';
// import _ from 'lodash';
import { mount } from 'enzyme';
import { MemoryRouter as Router } from 'react-router-dom';
import Home from '../../../src/components/Home';




const placeData = [{
  _id: 1,
  address: 'Berlin, Germany',
  location: {
    lat: 52.52000659999999,
    lng: 13.404953999999975
  }
}];



describe('Home', () => {
  let wrapper;
  let promise;

  before(done => {
    promise = Promise.resolve({data: placeData});
    // when the test runs axios it just gets our data here not the actual api
    sinon.stub(axios, 'get').returns(promise);
    done();
  });

  after(done => {
    axios.get.restore();
    done();
  });

  // before each test
  beforeEach(done => {
    wrapper = mount(
      <Router>
        <Home />
      </Router>
    );
    done();
  });

  it('should display a map', done => {
    promise.then(() => {
      wrapper.update();
      expect(wrapper.find('div.map').length).to.eq(1);
      done();
    });
  });



});
