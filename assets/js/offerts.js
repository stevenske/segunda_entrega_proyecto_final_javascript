let product = localStorage.getItem('product')

let shoppingCart = [];

shoppingCart.push(product)

class StockTrips {
    constructor(id,trip,price,desc,img,quantityProd){
        this.id = id,
        this.trip = trip,
        this.price = price,
        this.desc = desc,
        this.img = img
        this.quantityProd = quantityProd
    }
}

const stockTrips =[]

rome = new StockTrips (1,'Rome',2300,'Visit the Colosseum in Rome with a direct train trip','assets/img/coliseo_rome.jpg',1)
paris = new StockTrips(2,'Paris',2400,'Visit the Colosseum in Rome with a direct train trip','assets/img/paris.jpg',1) 
amsterdam = new StockTrips(3,'Amsterdam',2100,'Visit the Colosseum in Rome with a direct train trip','assets/img/amsterdam.jpg',1)
greece = new StockTrips (4,'Greece',2150,'Visit the Colosseum in Rome with a direct train trip','assets/img/greece.jpg',1)
london = new StockTrips(5,'London',1800,'Visit the Big Ben in London with a direct train trip','assets/img/london.jpg',1)
spain = new StockTrips(6,'Spain',1600,'Visit the Metropolitan Cathedral Basilica of the Holy Cross and Saint Eulalia train trip','assets/img/spain.jpg',1)

stockTrips.push(rome,paris,amsterdam,greece,london,spain)

console.log(stockTrips)
console.log(stockProducts)


let cardsContainer = document.getElementById("cards__container")
let shoppingContainer = document.getElementById("shopping__container")
let cartCounter = document.querySelector("#cart__counter")
let totalPrice = document.getElementById("total__price")
let price = document.getElementsByClassName("price")

function showProducts() {
    stockTrips.forEach(item => {
        let div = document.createElement('div')
        div.className = '.product-rows col-md-4 d-flex justify-content-center my-3'
        div.innerHTML = `
            <div class="card text-center shadow-lg" style="width: 18rem;">
                <img src="${item.img}" class="card-img-top rounded zoom" alt="photo of the Colosseum in Rome">
                <div class="card-body">
                    <p class="card-title fs-5">${item.trip}</p>
                    <p class="card-text">${item.desc}</p>
                    <p class="card-text">$${item.price}</p>
                    <button id="btn${item.id}" type="submit" class="btnBuy btn btn-train fw-bold"">BUY</button>
                </div>
            </div>
    `
        cardsContainer.appendChild(div)
        let button = document.getElementById(`btn${item.id}`)
        button.addEventListener("click", () => {
            addCart(item.id)
        })
        function addCart(id) {
            let finded = stockProducts.find(e=>e.id === id)
            let exist = shoppingCart.includes(finded)
            // console.log(finded);
            if(exist){
                finded.quantityProd += 1
                finded.price = finded.price + item.price
                // console.log(finded.price);
                // console.log(finded.quantityProd)
                // console.log(shoppingCart);
                }else{
                    shoppingCart.push(finded)
                    // console.log(shoppingCart)
                }
            showShoppingCart()
            localStorage.setItem('product',JSON.stringify(shoppingCart))
        }
    
    
    
    })
}
showProducts()
function addCart(id) {
    let finded = stockProducts.find(e=>e.id === id)
    let exist = shoppingCart.includes(finded)
    // console.log(finded);
    if(exist){
        finded.quantityProd += 1
        finded.price = finded.price + price.innerHTML.value
        // console.log(finded.price);
        // console.log(finded.quantityProd)
        // console.log(shoppingCart);
        }else{
            shoppingCart.push(finded)
            // console.log(shoppingCart)
        }
    showShoppingCart()
    localStorage.setItem('product',shoppingCart)
}
function showShoppingCart() {
    shoppingContainer.innerHTML =''
    for (const product of shoppingCart) {
        let div = document.createElement('div')
        div.className = 'productCart d-flex justify-content-between border-start border-4 border-danger bg-gray rounded-1  my-1 py-2 px-1'
        div.innerHTML += `
                    <p class="my-auto">${product.trip}</p>
                    <p class="price my-auto">$${product.price}</p>
                    <p id='quantity__counter' class="my-auto">${product.quantityProd}</p>
                    <button class='btn-remove btn btn-train fw-bold'>X</button>
    `
    shoppingContainer.appendChild(div)
    let removeProduct = div.querySelectorAll('.btn-remove')
    for (let button of removeProduct) {
        button.addEventListener('click', removeElement)
        }
    
    }
    updateCart()
    
}

function updateCart() {
    let quantity = document.querySelectorAll('#shopping__container > div')
    cartCounter.innerText = quantity.length
    uptateTotal()
}

function removeElement(e) {
    btn = e.target
    let parent = btn.parentElement
    parent.remove()
    shoppingCart.splice(e,1)
    localStorage.clear()
    uptateTotal()
    updateCart()
}

function uptateTotal() {
    totalPrice.innerText = shoppingCart.reduce((acc, el) => acc + el.price, 0)
}
// alert(rome.price)