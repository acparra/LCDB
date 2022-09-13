import axios from 'axios';
const baseURL = "https://lascuentasdelbarrio.herokuapp.com/api";

export const getEmployees = (emails : Array<String>, token: String) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/employees/`,
                data: {
                    emails
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

export const createEmployee = (id: String, email : String, token: String) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/employees/create`,
                data: {
                    id,
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
        console.log("error:", error)
    }
}

export const deleteEmployee = (id: String, email : String, token: String) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/employees/delete`,
                data: {
                    id,
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
        console.log("error:", error)
    }
}


