const faker = require('faker');
class ProductsService {
    constructor(){
        this.products = [];
        this.generate();
    }

    generate(){
        const limit =  100;
        for (let i = 0; i < limit; i++){
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price()),
                image: faker.image.imageUrl(),
            });
        }

    }

    create(data){
        return this.products.push({ 
            id: faker.datatype.uuid(),
            name: data.name,
            price: data.price, 
            image: data.image
        });
    }

    find(){
        return this.products;
    }

    findOne(id){
        return this.products.find(item => item.id === id); 
    }

    delete(){}
    
    udpate(){}

}

module.exports = ProductsService;

