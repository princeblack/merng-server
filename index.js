const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');

const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');

const Pubsub = new PubSub();

const PORT = process.env.PORT || 5000;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({ req })=> ({ req, Pubsub})
});

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('MongoDB Successfuly Connected');
    return server.listen({ port : PORT});
}).then((res) =>{
    console.log(`server running at ${res.url}` )
})
.catch(err => {
    console.error(err)
  })



