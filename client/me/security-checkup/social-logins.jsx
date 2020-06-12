/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { getCurrentUser } from 'state/current-user/selectors';
import SecurityCheckupNavigationItem from './navigation-item';
import { getOKIcon, getWarningIcon } from './icons.js';

class SecurityCheckupSocialLogins extends React.Component {
	static propTypes = {
		socialConnections: PropTypes.number.isRequired,
		translate: PropTypes.func.isRequired,
	};

	render() {
		const { socialConnectionCount, translate } = this.props;

		let description, icon;

		if ( socialConnectionCount === 0 ) {
			icon = getOKIcon();
			description = translate( 'You do not have any social logins enabled.' );
		} else {
			icon = getWarningIcon();
			description = translate(
				'You have {{strong}}%(socialLoginCount)d social login enabled{{/strong}}.',
				'You have {{strong}}%(socialLoginCount)d social logins enabled{{/strong}}.',
				{
					count: socialConnectionCount,
					args: {
						socialLoginCount: socialConnectionCount,
					},
					components: {
						strong: <strong />,
					},
				}
			);
		}

		return (
			<SecurityCheckupNavigationItem
				description={ description }
				materialIcon={ icon }
				path="/me/security/social-login"
				text={ translate( 'Social Logins' ) }
			/>
		);
	}
}

export default connect( ( state ) => {
	const currentUser = getCurrentUser( state );
	const connections = currentUser.social_login_connections || [];
	return {
		socialConnectionCount: connections.length,
	};
} )( localize( SecurityCheckupSocialLogins ) );
