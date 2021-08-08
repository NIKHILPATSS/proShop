import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, decription, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='decription' content={decription} />
			<meta name='keyword' content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome to ProShop',
	description: 'We sell the best products for cheap',
	keywords: 'electronics, buy electronics , cheap electronics',
};

export default Meta;
