module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalPrice = oldCart.totalPrice || 0;
    this.totalQty = oldCart.totalQty || 0;

    //defining function to add new item to the cart
    this.add = function (item, id) {
        var storedItems = this.items[id];
        if(!storedItems){

            storedItems = this.items[id] = {item: item, qty: 0, price: 0};
            storedItems.price = storedItems.item.price * storedItems.qty;
            this.totalQty++;
            this.totalPrice += storedItems.item.price;
        }

        this.generateArray = function () {
            var arr = [];
            for(var id in this.item){
                arr.push(this.item[id]);
            }
            return arr;
            
        }

        
    }
    
};
