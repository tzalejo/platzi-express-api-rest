const faker = require('faker');
const boom = require('@hapi/boom');
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
                isBlock: faker.datatype.boolean(),
            });
        }

    }

    async create(data){
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        };
        this.products.push(newProduct);
        return newProduct;
    }

    async find(){
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) =>{
        setTimeout(()=>{
         resolve(this.products);
        },5000);
      })
    }

    async findOne(id){
        const product = this.products.find(item => item.id === id);
        if (!product) {
          throw boom.notFound('Error de productos not found');
        }
        if (product.isBlock) {
          throw boom.conflict('product is block');
        }
        return product;
    }

    async delete(id){
      const index = this.products.findIndex(item => item.id === id);
      if (index === -1) {
        // throw new Error('Product not found');
        throw boom.notFound('Error de productos not found')
      }

      this.products.splice(index,1);
      return {id};
    }

    async udpate(id, data){
      const index = this.products.findIndex(item => item.id === id);

      if (index === -1) {
        // throw new Error('Product not found');
        throw boom.notFound('Error de productos not found');
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

