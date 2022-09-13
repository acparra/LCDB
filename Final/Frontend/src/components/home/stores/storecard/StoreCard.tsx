
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { StoreContext } from '../../../../context/StoreContext'
import './StoreCard.sass'

interface Props {
    store : any
    setStoreDataUpdate : Function
}
export const StoreCard = ({store, setStoreDataUpdate} : Props) => {

    let [storeDataContext, setStoreDataContext] : any = useContext(StoreContext)
    let navigate = useNavigate()

    const handlerButton = () =>{
        setStoreDataContext(store)
        navigate('/store')
    }

    return (
        <div className="d-flex flex-column justify-content-center col-md-3 p-3 m-3" id='store__card'>
            <p className="fs-6 fw-bold p-0 m-0"> {store.name} </p>
            <p className="p-0 m-0"> {store.address} </p>
            <p className="p-0 m-0"> {store.type} </p>
            <div className="d-flex justify-content-end" onClick={()=>setStoreDataUpdate(store)}>
                <i className="fa fa-door-open p-1 action__button" role='button' onClick={()=>handlerButton()}></i>
                <i className="fa fa-pencil p-1 action__button" role='button' data-bs-toggle="modal" data-bs-target="#modalUpdate"></i>
                <i className="fa fa-trash p-1 action__button " role='button' data-bs-toggle="modal" data-bs-target="#modalDelete"></i>
            </div>
        </div>
    );
}