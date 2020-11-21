import React, { useEffect, useState } from "react";
import CardProduct from '../../components/style_components/card_product';
import Slider from "../../components/UI_components/slider";
import Container from "../../components/UI_components/container";
import Axios from "axios";
import { URL_GET_PRODUCT_TERLARIS } from "../../api/api";
import { useHistory } from "react-router-dom";
const SectionTerlaris = props => {
    let history = useHistory()

    let [products, setProducts ] = useState([])

    useEffect(() => {
        fetchProductTerlaris()
    },[])

    const fetchProductTerlaris = async () => {
        console.log(`fetching product terlaris : `)
        try {
            let response = await Axios.get(URL_GET_PRODUCT_TERLARIS())
            setProducts(response.data.data)
        }catch(error){

        }

    }

    const detilProduct = (product) => {
        history.push(`/products/${product._id}`)
    }

    return (
        <section className="section-terlaris">
            <h2 className="heading-secondary text-center">Product Terlaris</h2>
            <Slider width={5}>
                {products.map(({ product, merchant, jumlah_terjual }, index) =>(
                    <div key={index} style={{marginRight : "1.5rem"}}>
                        <CardProduct key={index} 
                            onClick={() => detilProduct(product)}
                            title={product.title}
                            image={product.photos}
                            description={product.description}
                            price={product.price}
                            rating={product.rating}
                            city={merchant.address.city.city_name}
                            terjual={jumlah_terjual}
                            />
                    </div>
                ))}
            </Slider>
        </section>
    )
}

export default SectionTerlaris;