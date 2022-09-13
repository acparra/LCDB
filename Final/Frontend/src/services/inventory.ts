import axios from 'axios';
const baseURL = "https://lascuentasdelbarrio.herokuapp.com/api";

export const createProduct = (id: String, data:Object, token: String) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/inventory/create`,
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

export const updateProduct = (id: String, data:Object, token: String) => {

    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/inventory/update`,
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

export const deleteProduct= (id: String, productId:Object, token: String) => {

    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/inventory/delete`,
                data: {
                    id,
                    productId
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

