import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Logo } from '../../assets/Logo';
import { login } from '../../services/auth';
import jwt_decode from 'jwt-decode';
import './Login.sass';
import { useNavigate } from 'react-router';

const CLIENT_ID = "991025254749-s5uu1f1ugfrnpm0q829mopmhr1usvua7.apps.googleusercontent.com"

const Login = () => {

    const handleLogin = async (response: CredentialResponse) => {
        if (response.credential) {
            const result: any = jwt_decode(response.credential)
            const userData = {
                email: result.email,
                name: result.name,
                picture: result.picture
            }
            const exec = await login(userData)
            if (exec?.status == 201) {
                window.localStorage.setItem('user', JSON.stringify(userData))
                window.localStorage.setItem('token', exec?.data.token)
                window.location.href = '/'
            }   
        }
    }

    return (
        <div className='row g-0'>
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center" id='login__left'>
                <h3 className='mb-3 fs-1 fw-bold lh-1 text-center text-light'> LAS CUENTAS <br /> DEL BARRIO</h3>
                <Logo></Logo>
                <p className='mt-3 fs-6 text-center text-light'> Donde guardar la informacion de tus <br /> tiendas es mas seguro y util que nunca. </p>
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center" id='login__right'>
                <h3 className='fw-bold'> INICIO DE SESION </h3>
                <GoogleOAuthProvider clientId={CLIENT_ID}>
                    <GoogleLogin
                        onSuccess={response => { handleLogin(response) }}
                        onError={() => {
                            console.log('Login Failed');
                        }
                        }
                        useOneTap={true}
                        type="standard"
                    />
                </GoogleOAuthProvider>
            </div>
        </div>
    );
}



export default Login;