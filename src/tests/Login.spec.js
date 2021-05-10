/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import Login from '../component/Auth/Login';

describe('<Login />', () => {
	it('renders without crashing', () => {
		shallow(<Login />);
	});
	it('should have the phone and password component', () => {
		const component = shallow(<Login />);
		expect(component.find('#phone')).toHaveLength(1);
		expect(component.find('#password')).toHaveLength(1);
	});
});
