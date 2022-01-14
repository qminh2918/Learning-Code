class Cart {
    constructor(oldCart){
        this.items = oldCart.items || {};
        this.totalQty = oldCart.totalQty || 0;
        this.totalPrice = oldCart.totalPrice || 0;
        // this.numItems = oldCart.numItems || 0;

    }
    add(item, id, sl) {
        var storedItem = this.items[id];
        if(!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};            
        }
        storedItem.qty += Number(sl);
        storedItem.price = storedItem.item.originalPrice *(100-storedItem.item.sale)/100* storedItem.qty;
        this.totalQty += Number(sl);
        this.totalPrice += storedItem.item.originalPrice*(100-storedItem.item.sale)/100 *Number(sl);
    };
    update(id ,sl) {
        var storedItem = this.items[id];
        var oldQty = storedItem.qty;
        storedItem.qty = Number(sl);
        storedItem.price = storedItem.item.originalPrice *(100-storedItem.item.sale)/100 *storedItem.qty;
        this.totalQty += Number(sl) - oldQty;
        this.totalPrice += storedItem.price - storedItem.item.originalPrice *(100-storedItem.item.sale)/100 * oldQty;
    };
    deleteItem = id => {
        var storeItem = this.items[id];
        this.totalQty -= storeItem.qty;
        this.totalPrice -= storeItem.price ;
        // *(100-storeItem.item.sale)/100
        // this.numItems--;
        delete this.items[id];
      };
    generateArray() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};

module.exports = Cart;