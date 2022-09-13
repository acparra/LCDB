import axios from 'axios';
const baseURL = "https://lascuentasdelbarrio.herokuapp.com/api";

export const createClient = (id: String, data:Object, token: String) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/clients/create`,
                data: {
                    id,
                    ...data
                },
                headers: {
                    "authorization": `Bearer ${token}`,
                },
                validateStatus: (e) => e < 500
            })
        )
    }
    catch (error) {
        console.log("error: ")
    }
}

export const updateClient = (id: String, data:Object, token: String) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/clients/update`,
                data: {
                    id,
                    ...data
                },
                headers: {
                    "authorization": `Bearer ${token}`,
                },
                validateStatus: (e) => e < 500
            })
        )
    }
    catch (error) {
        console.log(error)
    }
}

export const deleteClient = (id: String, clientId:Object, token: String) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/clients/delete`,
                data: {
                    id,
                    clientId
                },
                headers: {
                    "authorization": `Bearer ${token}`,
                },
                validateStatus: (e) => e < 500
            })
        )
    }
    catch (error) {
        console.log(error)
    }
}

