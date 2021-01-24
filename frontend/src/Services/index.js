import axios from 'axios'

const backend_url = `http://localhost:8000/`
const Token = '9054f7aa9305e012b3c2300408c3dfdf390fcddf'

const post_sensor_data = async (request) => {
    const headers = {
        'Authorization': `Token ${Token}`,
        'Content-Type': 'application/json',
        "X-CSRFToken": `${Token}`,
      }
    const URI = `${backend_url}sensor/`
    try {
        const resp = await axios.post(URI,request,{headers:headers})

        return resp
    }
    catch (error) {
        console.log("error");
    }
}

const get_sensors = async (token) => {
    const URI = `${backend_url}get-sensors/`
    const headers = {
        'Authorization': `Token ${Token}`,
        'Content-Type': 'application/json',
        "X-CSRFToken": Token,
      }
    try {
        const resp = await axios.get(URI,{"headers":headers,token})

        return resp
    }
    catch (error) {
        console.log("error");
    }
}

const query_data = async (type,from,to) => {
    const headers = {
        'Authorization': `Token ${Token}`,
        'Content-Type': 'application/json',
        "X-CSRFToken": Token,
      }
    const URI = `${backend_url}sensor/?type=${type}&from=${from}&to=${to}`
    try {
        const resp = await axios.get(URI,{'headers':headers})

        return resp
    }
    catch (error) {
        console.log("error");
    }
}

export { post_sensor_data, get_sensors, query_data }