class Good {
    constructor(id, name, description, sizes, price, available,) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }
    setAvailable() {
        this.available = true;
    }
}

class GoodList {
    #goods = [];
    constructor(goods, filter, sortPrice=true, sortDir=true,) {
        this.#goods = goods;
        this.filter = new RegExp(filter,'gi');
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }
    get list() {
        let filter = this.filter
        let filteredList = this.#goods.filter(good => filter.test(good.name))
        if (this.sortPrice) {
            if (this.sortDir) {
                filteredList.sort((a, b) => a.price - b.price)
            } else {
                filteredList.sort((a, b) => b.price - a.price)
            }
        }
        return filteredList
    }
    add(good) {
        this.#goods.push(good)
    }
    remove(id) {
        this.#goods.forEach(good => {
            if (good.id == id) {
                this.#goods.splice(this.#goods.indexOf(good), 1)
            }
        });
    }
}

class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available)
        this.amount = amount
    }
}

class Basket {
    constructor(goods) {
        this.goods = [];
    }

    get totalAmount() {
        return this.goods.reduce((a, b) => a + b.amount, 0)
    }

    get totalSum() {
        return this.goods.reduce((a, b) => a + b.amount * b.price, 0)
    }

    add(good, amount) {
        for(let it = 0; it < this.goods.length; it++) {
            if (this.goods[it].id == good.id) {
                this.goods[it].amount += amount
            }
        }
        this.goods.push(new BasketGood(good, amount))
    }

    remove(good, amount) {
        for(let it = 0; it < this.goods.length; it++) {
            if (this.goods[it].id == good.id) {
                this.goods[it].amount -= amount
            }
            if (this.goods[it].amount <= 0) {
                this.goods.splice(this.goods.indexOf(this.goods[it]), 1)
            }
        }
    }

    clear() {
        this.goods.splice(0)
    }

    removeUnavailable() {
        return this.goods = this.goods.filter(good => good.available === true)
    }
}

let gun_1 = new Good(1, "Colt-M1911", "gun", 45, 500, true,);
let gun_2 = new Good(2, "Beretta", "gun", 9, 550, true,);
let gun_3 = new Good(3, "Glock-17", "gun", 9, 450, true,);
let gun_4 = new Good(4, "TT", "gun", 4.62, 400, true,);
let gun_5 = new Good(5, "Desert Eagle", "gun", 357, 600, true,);

console.log("----С поиском----", "\n")
let examplGunBelt = new GoodList([gun_1, gun_2, gun_3, gun_4, gun_5], /TT/gi, true, true);
console.log(examplGunBelt.list, "\n")

console.log("----Без поиска----", "\n")
let gunBelt = new GoodList([gun_1, gun_2, gun_3, gun_4,], "", true, true);
console.log(gunBelt.list, "\n")

console.log("----Добавление и удаление----", "\n")
gunBelt.add(gun_5)
gun_5.setAvailable(true)
gunBelt.remove(4)
console.log(gunBelt.list)
gunBelt.add(gun_4)

console.log("----Карзина----", "\n")

let basket = new Basket()

basket.add(gun_1, 2)
basket.add(gun_5, 3)
console.log(basket.goods, "\n")
console.log("Количество оружия в карзине:", basket.totalAmount)
console.log("Стоимость оружия в карзине:", basket.totalSum, "\n")

basket.clear()
console.log("Количество оружия в карзине:", basket.totalAmount)
console.log("Стоимость оружия в карзине:", basket.totalSum, "\n")