import React, { useState, useEffect } from 'react';
import { getPeopleApi } from '../apis/tableApis';
import Loader from '../components/Loader';

import PeopleTable from '../components/PeopleTable';

const Home = () => {
	const [peopleData, setPeopleData] = useState();
	useEffect(() => {
		getPeople();
	}, []);

	const getPeople = async () => {
		const response = await getPeopleApi();
		if (response.status === 200) {
			setPeopleData(response.data.results);
		} else {
			alert('Please try after sometime');
		}
	};
	if (!peopleData) return <Loader />;

	return (
		<div style={{ maxWidth: '100%' }}>
			<PeopleTable peopleData={peopleData} />
		</div>
	);
};

export default Home;
