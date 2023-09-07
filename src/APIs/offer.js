import axios from 'axios';

export const addOffers = async (data) => {
    try {

        const response = await axios.post('inverntoryManagment/api/v1/public/offer/add',data);

        return {
            type: "success",
            data: response.data
        }

    } catch (err) {

        return {
            type: "error",
            message: "Network Error"
        }

    }
}