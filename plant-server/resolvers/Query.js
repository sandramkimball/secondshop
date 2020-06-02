
// This reimplements the same functions with dedicated 
// function in a different file.

function feed(parent, args, context, info) {
    return context.users()
  }
  
  module.exports = {
    feed,
  }