import axios from 'axios';
import { baseUrl } from '../config/apiConfig';

export async function getPeopleApi() {
	try {
		return await axios.get(baseUrl + 'people');
	} catch (error) {
		console.log(error);
	}
}
