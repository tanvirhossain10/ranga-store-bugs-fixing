const arr = [];

const loadProducts = (url) => {
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         arr.push(data);
         showProducts(data);
      });
};

loadProducts('https://fakestoreapi.com/products');

// show all product in UI
const showProducts = (products) => {

   setInnerText('total_products', products.length, true);

   document.getElementById("all-products").innerHTML = "";

   const allProducts = products.slice(0, 20).map((pd) => pd);
   for (const product of allProducts) {
      const image = product.image
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>

      <button onclick="showProductDetails(${product.id})" id="details-btn"    data-bs-toggle="modal"
      data-bs-target="#exampleModal" class="btn btn-outline-secondary mb-2 rounded-1 mt-1">Details</button>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success border-0 w-100 rounded-0 bg-main py-2">Add to cart</button>
      `;
      document.getElementById('all-products').appendChild(div);
   }
};

let count = 0;

const addToCart = (id, price) => {
   count = count + 1;
   updatePrice('price', id, price);

   updateTaxAndCharge();
   updateTotal();
   document.getElementById('total-Products').innerText = count;
};

const showProductDetails = (product_id) => {
   fetch(`https://fakestoreapi.com/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => showProductDetailsInModal(data));
};

const showProductDetailsInModal = (product_details) => {
   setInnerText('exampleModalLabel', product_details.title);
   setInnerText('product_Id', product_details.id);
   setInnerText('modal_body', product_details.description);
   setInnerText('rating', product_details.rating.rate);
};

const getInputValue = (id) => {
   const element = document.getElementById(id).innerText;
   const converted = parseInt(element);
   return converted;
};

// main price update function
const updatePrice = (id, value, price) => {
   const convertedOldPrice = getInputValue(id);
   const convertPrice = parseInt(price);
   const total = convertedOldPrice + convertPrice;
   document.getElementById(id).innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value, istrue) => {
   if (istrue) {
      document.getElementById(id).innerText = Math.round(value);
   }
   else {
      document.getElementById(id).innerText = value;
   }

};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
   const priceConverted = getInputValue('price');
   if (priceConverted < 200) {
      setInnerText('delivery-charge', 30);
      setInnerText('total-tax', (priceConverted * 0.2).toFixed(2));
   }
   if (priceConverted > 400) {
      setInnerText('delivery-charge', 50);
      setInnerText('total-tax', (priceConverted * 0.3).toFixed(2));
   }
   if (priceConverted > 500) {
      setInnerText('delivery-charge', 60);
      setInnerText('total-tax', (priceConverted * 0.4).toFixed(2));
   }
};

//grandTotal update function
const updateTotal = () => {
   const grandTotal =
      getInputValue('price') +
      getInputValue('delivery-charge') +
      getInputValue('total-tax');
   document.getElementById('total').innerText = grandTotal;
};

// search by category
document.getElementById("search-btn").addEventListener("click", function () {
   const inputField = document.getElementById("input-value").value;
   const searchedProduct = arr[0].filter((p) => {
      return p.category === inputField || inputField === 'men' || inputField === 'women';
   });
   showProducts(searchedProduct);
});
 /*
//  product categories list for help
men's clothing
jewelery
electronics
women's clothing */

