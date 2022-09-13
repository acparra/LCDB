import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { StoreContext } from "../../../context/StoreContext";
import { createProduct, deleteProduct, updateProduct } from "../../../services/inventory";
const toastr = require('toastr');
import { CSVLink } from "react-csv";

export const Inventory = () => {

    const [storeDataContext, setStoreDataContext]: any = useContext(StoreContext)
    const [inventory, setInventory]: any = useState([])

    const navigate = useNavigate()

    const getInventory = () => {
        const inventory = storeDataContext.inventory
        const inventoryArray: Array<Object> = []
        for (const key in inventory) {
            inventoryArray.push({ productId: key, ...inventory[key] })
        }

        setInventory(inventoryArray)
    }

    const createProductAxios = async () => {
        let token = window.localStorage.getItem('token')
        let result = await createProduct(storeDataContext.databaseId, newProduct, String(token))

        if (result?.status == 201) {
            toastr.success("El producto ha sido registrado con exito")
            navigate("/home")
        } else {
            toastr.error(result?.data.msg)
        }
    }

    const updateProductAxios = async () => {
        console.log("newProductEdit: ", newProductEdit)
        let token = window.localStorage.getItem('token')
        let result = await updateProduct(storeDataContext.databaseId, newProductEdit, String(token))

        if (result?.status == 201) {
            toastr.success("El producto ha sido actualizado con exito")
            navigate("/home")
        } else {
            toastr.error(result?.data.msg)
        }
    }

    const deleteProductAxios = async (productId: String) => {
        let token = window.localStorage.getItem('token')

        let result = await deleteProduct(storeDataContext.databaseId, productId, String(token))

        if (result?.status == 201) {
            toastr.success("El producto ha sido eliminado con exito")
            navigate("/home")
        } else {
            toastr.error(result?.data.msg)
        }
    }

    const [newProduct, setNewProduct]: any = useState({})
    const [newProductEdit, setNewProductEdit] = useState({})

    const [editProduct, setEditProduct]: any = useState({})

    const headers = [
        { label: "ID producto", key: "idProduct" },
        { label: "Nombre", key: "nameProduct" },
        { label: "Cantidad", key: "quantity" },
        { label: "Valor Compra", key: "purchaseCost" },
        { label: "Valor Venta", key: "saleCost" },
        { label: "Categoría", key: "category" }
    ];

    useEffect(() => { getInventory() }, [])

    return (
        <Fragment>
            <h3 className="fw-bold content__title"> Productos </h3>
            <br />
            <CSVLink headers={headers} data={inventory} filename={"reporteInventario.csv"} className="Table"><input type="button" className="btn btn-primary" value='Reporte CSV' /></CSVLink>
            <table className="table align-middle table-borderless text-center mt-3">
                <thead>
                    <tr className="border">
                        <td colSpan={1}>
                            <input type="number" className="form-control" placeholder='Referencia' onChange={(e) => setNewProduct({ ...newProduct, idProduct: e.currentTarget.value })} />
                        </td>
                        <td colSpan={1}>
                            <input type="text" className="form-control" placeholder='Nombre' onChange={(e) => setNewProduct({ ...newProduct, nameProduct: e.currentTarget.value })} />
                        </td>
                        <td colSpan={1}>
                            <input type="number" className="form-control" placeholder='Cantidad' onChange={(e) => setNewProduct({ ...newProduct, quantity: e.currentTarget.value })} />
                        </td>
                        <td colSpan={1}>
                            <input type="number" className="form-control" placeholder='Valor de compra' onChange={(e) => setNewProduct({ ...newProduct, purchaseCost: e.currentTarget.value })} />
                        </td>
                        <td colSpan={1}>
                            <input type="number" className="form-control" placeholder='Valor de venta' onChange={(e) => setNewProduct({ ...newProduct, saleCost: e.currentTarget.value })} />
                        </td>
                        <td colSpan={1}>
                            <select className="form-control" placeholder='Seleccione una categoría' onChange={(e) => setNewProduct({ ...newProduct, category: e.currentTarget.value })}>
                                <option value='Select'>  </option>
                                <option value="Alimentos">Alimentos</option>
                                <option value="Papeleria">Papelería</option>
                                <option value="Otros">Otros</option>
                            </select>
                        </td>
                        <td className="mr-0 ml-auto">
                            <input type="button" className="btn btn-primary" value='Agregar' onClick={() => { if (Object.entries(newProduct).length > 5 && newProduct.nameProduct != '' && newProduct.idProduct != '' && newProduct.quantity != '' && newProduct.purchaseCost != '' && newProduct.saleCost != '' && newProduct.category != '') { createProductAxios() } else { toastr.error("Los campos no pueden estar vacios") } }} />
                        </td>
                    </tr>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Valor Compra</th>
                        <th scope="col">Valor Venta</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((element: any) => (
                        <tr key={element.productId}>
                            {editProduct.state == true && editProduct.id == element.productId ?
                                <Fragment>
                                    <td><input type="number" className="form-control" defaultValue={element.idProduct} onChange={(e) => setNewProductEdit({ ...newProductEdit, idProduct: e.currentTarget.value })} ></input>
                                    </td>
                                    <td>
                                        <input type="text" className="form-control" defaultValue={element.nameProduct} onChange={(e) => setNewProductEdit({ ...newProductEdit, nameProduct: e.currentTarget.value })} ></input>
                                    </td>
                                    <td >
                                        <input type="number" className="form-control" defaultValue={element.quantity} onChange={(e) => setNewProductEdit({ ...newProductEdit, quantity: e.currentTarget.value })} ></input>
                                    </td>
                                    <td>
                                        <input type="number" className="form-control" defaultValue={element.purchaseCost} onChange={(e) => setNewProductEdit({ ...newProductEdit, purchaseCost: e.currentTarget.value })}></input>
                                    </td>
                                    <td>
                                        <input type="number" className="form-control" defaultValue={element.saleCost} onChange={(e) => setNewProductEdit({ ...newProductEdit, saleCost: e.currentTarget.value })} ></input>
                                    </td>
                                    <td>
                                        <select className="form-control" defaultValue={element.category} onChange={(e) => setNewProductEdit({ ...newProductEdit, category: e.currentTarget.value })}>
                                            <option value="alimentos">Alimentos</option>
                                            <option value="papeleria">Papelería</option>
                                            <option value="otros">Otros</option>
                                        </select>
                                    </td>
                                    <td className="text-primary"> <span role='button' onClick={() => { updateProductAxios() }}> Guardar </span> o <span role='button' onClick={() => setEditProduct({})}>Cancelar</span> </td>
                                </Fragment>
                                :
                                <Fragment>
                                    <td> {element.idProduct} </td>
                                    <td> {element.nameProduct} </td>
                                    <td> {element.quantity} </td>
                                    <td> {element.purchaseCost} </td>
                                    <td> {element.saleCost} </td>
                                    <td> {element.category} </td>
                                    <td className="text-primary"> <span role="button" onClick={() => { setEditProduct({ state: true, id: element.productId }); setNewProductEdit(element) }}> Editar </span> o <span role="button" onClick={() => deleteProductAxios(element.productId)}> Eliminar </span></td>
                                </Fragment>

                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}