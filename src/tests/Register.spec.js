/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';

import Register from '../component/Auth/Register';

describe('<Register />', () => {
	it('renders without crashing', () => {
		shallow(<Register />);
	});

	it('should have the firstName, lastName, phone, email & password component', () => {
		const component = shallow(<Register />);
		expect(component.find('#firstName')).toHaveLength(1);
		expect(component.find('#lastName')).toHaveLength(1);
		expect(component.find('#phone')).toHaveLength(1);
		expect(component.find('#email')).toHaveLength(1);
		expect(component.find('#password')).toHaveLength(1);
	});

});
