import React from 'react';
import MaterialTable from 'material-table';
import tableIcons from '../utils/tableIcons';
import FullScreenDialog from './FullScreenDialog';

const PeopleTable = ({ peopleData }) => {
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = React.useState();
	const [data, setData] = React.useState();
	const [peopleInfo, setPeopleInfo] = React.useState(peopleData);

	const handleClick = (data, title) => {
		setData(data);
		setOpen(true);
		setTitle(title);
	};

	if (open) {
		return (
			<FullScreenDialog
				open={open}
				setOpen={setOpen}
				title={title}
				data={data}
			/>
		);
	}

	return (
		<MaterialTable
			editable={{
				onRowUpdate: (newData, oldData) =>
					new Promise((resolve, reject) => {
						setTimeout(() => {
							const dataUpdate = [...peopleInfo];
							const index = oldData.tableData.id;
							dataUpdate[index] = newData;
							setPeopleInfo([...dataUpdate]);

							resolve();
						}, 1000);
					}),
			}}
			icons={tableIcons}
			columns={[
				{ title: 'Name', field: 'name' },
				{ title: 'Height', field: 'height', type: 'numeric' },
				{ title: 'Mass', field: 'mass', editable: 'never' },
				{
					title: 'bmi',
					field: 'bmi',
					editable: 'never',
					render: (rowData) => <div>{(rowData.mass / rowData.height) ^ 2}</div>,
				},
				{
					title: 'Gender',
					field: 'gender',
					lookup: { male: 'Male', female: 'Female', 'n/a': 'Other' },
				},
				{
					title: 'Films',
					field: 'films',
					editable: 'never',
					render: (rowData) => (
						<div
							onClick={() => handleClick(rowData.films, 'Films')}
							style={{ cursor: 'pointer' }}
						>
							{rowData.films.length}
						</div>
					),
				},
				{
					title: 'Vehicles',
					field: 'vehicles',
					editable: 'never',
					render: (rowData) => (
						<div
							onClick={() => handleClick(rowData.films, 'Vehicles')}
							style={{ cursor: 'pointer' }}
						>
							{rowData.vehicles.length}
						</div>
					),
				},
				{
					title: 'Starships',
					field: 'starships',
					editable: 'never',
					render: (rowData) => (
						<div
							onClick={() => handleClick(rowData.films, 'Starships')}
							style={{ cursor: 'pointer' }}
						>
							{rowData.starships.length}
						</div>
					),
				},
			]}
			data={peopleInfo}
			title="People Table"
		/>
	);
};

export default PeopleTable;
