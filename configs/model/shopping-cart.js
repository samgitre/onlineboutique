
//declaring and exporting the cart object

var Cart = function(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;


    //defining function to add new item to the cart
    this.add = function (item, id) {
        var storedItems = this.items[id];
        if (!storedItems) {
            storedItems = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItems.qty++;
        storedItems.price = storedItems.item.price * storedItems.qty;
        this.totalQty++;
        this.totalPrice += storedItems.price;
    };

    //declaring function updating the cart items

    //reduce items
    this.reduceByOne = function (id) {
        this.items[id].qty --;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty --;
        this.totalPrice -= this.items[id].item.price;
    };
   //increase items
    this.addByOne = function (id) {
        this.item[id].qty ++;
        this.items[id].price += this.items[id].item.price;
        this.totalQty ++;
        this.totalPrice += this.items[id].item.price;
    };

        this.generateArray = function () {
            var arr = [];
            for(var id in this.items){
                arr.push(this.items[id]);
            }
            return arr;
        }
};

module.exports = Cart;