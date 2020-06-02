import { categories, products, explore, profiles } from './mocks';
// define resolver
// this tells the server how to fetch when query is made
// "here, use this data:..."

export default resolvers = {
    Query: {
        products: () => products,
        categories: ()=> categories,
        explore: ()=> explore,
        profiles(id){
            return profiles.find(profile => profile.id === id)
        },
        products(id){
            return products.find(item => item.id === id)
        }
    }
}