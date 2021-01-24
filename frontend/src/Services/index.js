import axios from 'axios'

const backend_url = `http://localhost:8000/`

const post_sensor_data = async (request) => {
    const URI = `${backend_url}sensor/`
    try {
        const resp = await axios.post(URI,request)

        return resp
    }
    catch (error) {
        console.log("error");
    }
}

const get_sensors = async (token) => {
    const URI = `${backend_url}get-sensors/`
    try {
        const resp = await axios.get(URI,{token})

        return resp
    }
    catch (error) {
        console.log("error");
    }
}

const query_data = async (type,from,to,token) => {
    const URI = `${backend_url}sensor/?type=${type}&from=${from}&to=${to}`
    try {
        const resp = await axios.get(URI,{token})

        return resp
    }
    catch (error) {
        console.log("error");
    }
}

export { post_sensor_data, get_sensors, query_data }