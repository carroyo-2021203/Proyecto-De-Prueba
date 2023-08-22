import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const apiserver = import.meta.env.VITE_BACKEND_URL;

export const AddProduct = ()=>{
    const title = 'ADD PRODUCT';
    const [categories, setCategories] = useState([])



    const addProduct = async()=>{
        try{
            let product = {
                name: document.getElementById('inputName').value,
                price: document.getElementById('inputPrice').value,
                stock: document.getElementById('inputStock').value,
         
            }
            const { data } = await axios.post(`${apiserver}/product/add`, product)
            alert(data.message)
        }catch(err){
            alert(err.response.data.message)
        }
    }



    return (
        <>
            <h1>{title}</h1>
            <form className="m-5 text-center">
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPrice" className="form-label">Price</label>
                    <input type="number" className="form-control" id="inputPrice" required/>
                </div>
                <div>
                    <label htmlFor="inputStock" className="form-label">Stock</label>
                    <input type="number" className="form-control" id="inputStock" required/>
                </div>

                <Link to="/products">
                    <button onClick={()=>addProduct()} className="btn btn-success">ADD</button>
                </Link>
                <Link to="/products">
                    <button className="btn btn-danger">Cancel</button>
                </Link>
            </form>
        </>
    )
}