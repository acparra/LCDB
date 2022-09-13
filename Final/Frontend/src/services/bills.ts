import axios from 'axios';
const baseURL = "https://lascuentasdelbarrio.herokuapp.com/api";

export const createBill = (id: String, data:any, token: String) => {
    try {
        let formData = new FormData()
        formData.append("id", String(id))
        formData.append("date", data.date)
        formData.append("type", data.type)
        formData.append("description", data.description)
        formData.append("value", data.value)
        formData.append("file", data.file || undefined)
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/bills/create`,
                data: formData,
                headers: {
                    "authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
                validateStatus: (e) => e < 500
            })
        )
    }
    catch (error) {
        console.log(error)
    }
}

export const updateBill = (id: String, data:any, token: String) => {
    try {
        let formData = new FormData()
        formData.append("id", String(id))
        formData.append("date", data.date)
        formData.append("type", data.type)
        formData.append("description", data.description)
        formData.append("value", data.value)
        formData.append("billId", data.billId)
        formData.append("file", data.file || undefined)
        return (
            
            axios({
                method: 'POST',
                url: `${baseURL}/bills/update`,
                data: formData,
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

export const deleteBill = (id: String, data: any, token: String, state: Boolean) => {
    try {

        return (
            
            axios({
                method: 'POST',
                url: `${baseURL}/bills/delete`,
                data: {
                    id,
                    billId: data,
                    state
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
