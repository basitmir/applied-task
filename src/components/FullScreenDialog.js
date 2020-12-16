import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Loader from './Loader';
import ListItems from './ListItems';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, setOpen, title, data }) {
	const [finalResult, setFinalResult] = useState();
	useEffect(() => {
		const getResult = async () => {
			let finalData = []; //store all the data

			const getAllData = async (res) => {
				const response = await axios.get(res);
				if (response.status === 200) finalData.push(response.data);
			};
			await axios.all(data.map((res) => getAllData(res)));
			setFinalResult(finalData);
		};

		getResult();
	}, [data]);

	const classes = useStyles();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	// console.log(finalResult && finalResult.length, '>>>>>>>>>>>>>>>>');
	// console.log(data.length);
	if (!finalResult) return <Loader />;
	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Open full-screen dialog
			</Button>
			<Dialog
				fullScreen
				open={open}
				onClose={handleClose}
				TransitionComponent={Transition}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							{title}
						</Typography>
						{/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
					</Toolbar>
				</AppBar>
				<List>
					{finalResult.map((data, index) => (
						<div key={index}>
							<ListItems singleList={data} />
							<Divider />
						</div>
					))}
				</List>
			</Dialog>
		</div>
	);
}
