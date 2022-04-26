import React from 'react'

function Allproducts({products, loading}) {
  if(loading === true){
    <h1>loading</h1>
  }

  return (
    <div>

      {products.map(product => <div key={product.id}>
         <h1>{product.id}</h1> 
         <p>{product.title}</p>
         <p>{product.price}</p>
         <p>{product.description}</p>
         </div>
      )}

    </div>
  )
}

export default Allproducts