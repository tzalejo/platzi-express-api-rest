const faker = require('faker');
const boom = require('@hapi/boom');
class UsersService {
    constructor(){
        this.users = [];
        this.generate();
    }

    generate(){
        const limit =  70;
        for (let i = 0; i < limit; i++){
            this.users.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                email: faker.internet.email(),
                limit: faker.datatype.number(),
                offset: faker.datatype.number()
            });
        }
    }

    async create(data){
      const newUser = {
          id: faker.datatype.uuid(),
          ...data
      };
      this.users.push(newUser);
      return newUser;
  }

    async find(){
        return new Promise((resolve, reject) =>{
          setTimeout(()=>{
           resolve(this.users);
          },5000);
        })
    }

    findOne(id){
      const user = this.users.find(item => item.id === id);
      if (!user) {
        throw boom.notFound('Error de user not found');
      }
      return user;
    }

    update(){}
}
module.exports = UsersService;

