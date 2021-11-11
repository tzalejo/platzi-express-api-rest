const faker = require('faker');

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

    create(){}

    find(){
        return this.users;
    }

    findOne(id){
         return this.users.find(item => item.id === id); 
    }

    update(){}
}
module.exports = UsersService;

