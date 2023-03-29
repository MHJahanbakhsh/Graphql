import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import cors from 'cors';
// import  {json}  from 'body-parser';
import express from 'express';
import { expressjwt } from 'express-jwt';
import jwt from 'jsonwebtoken';
import { User } from './db.js';
import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';

const PORT = 9000;
const JWT_SECRET = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
/*expressjwt middleware checkes req object for authorization token and if it exists,
it checks it validity; decodes it and adds it to req object with with "auth" key.
it checks header for "Authorization" key and make it cleaner and add that to express
req object
*/
app.use(cors(), express.json(), expressjwt({ 
  algorithms: ['HS256'],
  credentialsRequired: false,
  secret: JWT_SECRET,
}));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne((user) => user.email === email);
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET);
    res.json({ token });  
  } else {
    res.sendStatus(401);
  }
});
const typeDefs = await readFile('./schema.graphql','utf-8'); //why do this and not export schema.graphql and import it here? becuase it is not javascript.it is just a file
const context = async ({req,res})=> {
  if(req.auth){
    const user = await User.findById(req.auth.sub) 
    return {user}
  }
  return {}
}
const apolloServer = new ApolloServer({typeDefs, resolvers});
await apolloServer.start();
app.use(
  '/graphql',
  cors(),
  express.json(), //i'm not sure about this thou
  expressMiddleware(apolloServer,{context}),
); 

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
});
