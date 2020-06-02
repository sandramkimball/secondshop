//routes? are they a thing in graphql?

server.use(
    '/profule/:id',
    bodyParser.json(),
    graphqlExpress(req => {
      // Some sort of auth function
      const userForThisRequest = getUserFromRequest(req);
  
      return {
        schema: profile,
        context: {
          user: userForThisRequest,
        },
        // other options here
      };
    }),
  );