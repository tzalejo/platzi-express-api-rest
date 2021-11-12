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
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        };
        this.products.push(newProduct);
        return newProduct;
    }

    find(){
        return this.products;
    }

    findOne(id){
        return this.products.find(item => item.id === id);
    }

    delete(id){
      const index = this.products.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error('Product not found');
      }

      this.products.splice(index,1);
      return {id};
    }

    udpate(id, data){
      const index = this.products.findIndex(item => item.id === id);

      if (index === -1) {
        throw new Error('Product not found');
      }

      const product = this.products[index];
      this.products[index] ={
        ...product,
        ...data
      };
      return this.products[index];
    }

}

module.exports = ProductsService;

