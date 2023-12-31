import axios from "axios"

export const getclients = async () => {
    try {
        const response = await axios.get("inverntoryManagment/api/v1/public/client/getClient")

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