import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import imgLoading from '../../assets/loading.gif'

const apiserver = import.meta.env.VITE_BACKEND_URL;

export const UpdateProduct = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([{}])
  const { id } = useParams();

  const getProduct = async()=>{
    try{
      const { data } = await axios(`${apiserver}/product/get/${id}`)
      setProduct(data.product)
      setLoading(false)
    }catch(err){
      console.error(err);
    }
  }


  const updateProduct = async()=>{
    try{
      let updateProduct = {
        name: document.getElementById('inputName').value,
        price: document.getElementById('inputPrice').value,
        stock: document.getElementById('inputStock').value,

      }

      const { data } = await axios.put(`${apiserver}/product/update/${id}`, updateProduct)
      console.log(data)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    getProduct();

  }, [])

/*   if(loading){
    return (
      <img src={imgLoading} alt="Loading..." />
    )
  } */
  return (
    <> {/* React Fragment - No agregar una etiqueta */}
      <form className="m-5 text-center">
        <div className="mb-3">
          <label htmlFor="inputName" className="form-label">Name</label>
          <input defaultValue={product.name} type="text" className="form-control" id="inputName" required />
        </div>
        <div className="mb-3">
          <label htmlFor="inputPrice" className="form-label">Price</label>
          <input defaultValue={product.price} type="number" className="form-control" id="inputPrice" required />
        </div>
        <div>
          <label htmlFor="inputStock" className="form-label">Stock</label>
          <input defaultValue={product.stock} type="number" className="form-control" id="inputStock" required />
        </div>
        <Link to="/products">
          <button onClick={() => updateProduct()} className="btn btn-success">UPDATE</button>
        </Link>
        <Link to="/products">
          <button className="btn btn-danger">Cancel</button>
        </Link>
      </form>
    </>
  )
}