import axios from 'axios';
const baseURL = "https://lascuentasdelbarrio.herokuapp.com/api";

export const login = (data:Object) => {
    try {
        return (
            axios({
                method: 'POST',
                url: `${baseURL}/auth/`,
                data: {
                    ...data
                },
                validateStatus: (e) => e < 500
            })
        )
    }
    catch (error) {
        console.log(error)
    }
}