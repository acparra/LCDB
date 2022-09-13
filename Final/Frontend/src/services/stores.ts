import axios from 'axios';
const baseURL = "https://lascuentasdelbarrio.herokuapp.com/api";

export const createStore = (data:Object, token: String, email: String) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/stores/create/`,
                data: {
                    email: email,
                    ...data},
                headers: {
                    "authorization": `Bearer ${token}`,
                },
                validateStatus: (e) => e < 500
            })
        )
    }
    catch (error) {
        console.log(error);
    }
}

export const getStores = (token: String, email: String) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/stores/`,
                data: {
                    email
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

export const deleteStore = (id: String, token : String) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/stores/delete`,
                data:{
                    id
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

export const updateStore = (id : String, data : Object, token : String ) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/stores/update`,
                data: {...data, id},
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


