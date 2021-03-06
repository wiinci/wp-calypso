/**
 * External dependencies
 */
import React from 'react';
import assign from 'lodash/object/assign';
import noop from 'lodash/utility/noop';

export default React.createClass( {
	displayName: 'TrackInputChanges',

	propTypes: {
		onNewValue: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			onNewValue: noop
		};
	},

	componentWillMount() {
		this.inputEdited = false;
	},

	onInputChange( /*event*/ ) {
		this.inputEdited = true;
	},

	onInputBlur( event ) {
		if ( this.inputEdited ) {
			this.props.onNewValue( event );
			this.inputEdited = false;
		}
	},

	render() {
		// Multiple children not supported
		const child = React.Children.only( this.props.children );

		const props = assign( {}, child.props, {
			onChange: event => {
				if ( typeof child.props.onChange === 'function' ) {
					child.props.onChange.call( child, event );
				}
				this.onInputChange( event );
			},
			onBlur: event => {
				if ( typeof child.props.onBlur === 'function' ) {
					child.props.onBlur.call( child, event );
				}
				this.onInputBlur( event );
			}
		} );

		return React.cloneElement( child, props );
	}
} );
