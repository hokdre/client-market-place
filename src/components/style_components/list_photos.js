import React from "react";
const DEFAULT_PHOTO = "https://storage.googleapis.com/ecommerce_s2l_assets/default-product.jpg";

const ListPhotos = props => {
    let { photos = [] } = props

    let defaultPhoto = []
    let maxNumPhoto = 5
    let minusPhoto = maxNumPhoto - photos.length
    if( minusPhoto > 0 ) {
        for(let i = 0; i < minusPhoto; i++){
            defaultPhoto.push((
                <div key={i} className="list-photos__photo">
                    <img alt="dashboard-picture" src={DEFAULT_PHOTO}/>
                </div>
            ))
        }
    }

    return (
        <div className="list-photos">
             {
                photos.map((photo,key)=> 
                    (<div key={key} className="list-photos__photo">
                        <img alt="dashboard-picture" src={photo}/>
                    </div>)
                )
            }
            {
               defaultPhoto.length > 0 && defaultPhoto
            }
        </div>
    )
}

export default ListPhotos