import React from 'react'; 
import { shallow } from 'enzyme'; // Method from enzyme which allows us to do shallow render
import App from '../client/app/app.jsx';

describe('App', () => {
  const wrapper = shallow(<App />);

  it('works!', () => {
    expect(true).to.be.true;
  });

  it('renders as a <div>', () => {
    expect(wrapper.type()).to.eql('div');
  });
});