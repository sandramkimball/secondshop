import { categories, products, explore, users } from './mocks';
// define resolver
// this tells the server how to fetch when query is made
// "here, use this data:..."

export default resolvers = {
    Query: {
        products: () => products,
        categories: ()=> categories,
        explore: ()=> explore,
        users(id){
            return users.find(profile => profile.id === id)
        },
        products(id){
            return products.find(item => item.id === id)
        }
    }
}