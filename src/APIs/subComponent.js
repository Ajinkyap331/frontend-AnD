import axios from "axios"

export const postSubComponents = async (data) => {
    try {
        const response = await axios.post("inverntoryManagment/api/v1/public/subComponent/add", data)

        console.log(response.data)
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

export const getSubComponents = async () => {
    try {
        const response = await axios.get("inverntoryManagment/api/v1/public/subComponent/all")

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

