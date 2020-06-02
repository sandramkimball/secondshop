const { and, or, rule, shield } = require('graphql-sheild');

function getPermissions(user){
    if (user && user['https://localhost:3300/graphql']){
        return user[''].permissions;
    }
    return [];
}

// the Rule function takes all the same params as a resolver
const isAuthenticated = rule()( (parent, args, { user }) => {
    return user !== null;
});

// These read functions are for the viewer (I think)
const canReadAnyAccount = rule()((parent, args, { user } )=> {
    const userPermissions = getPermissions(user);
    return userPermissions && userPermissions.includes('read:any_account');
})

const canReadOwnAccount = rule()((parent, args, { user } )=> {
    const userPermissions = getPermissions(user);
    return userPermissions && userPermissions.includes('read:own_account');
})

const isReadingOwnAccount = rule()((parent, { id } )=> {
    return user && user.sub === id;
})

const permissions = shield({
    Query: {
        user: or(and(canReadOwnAccount, isReadingOwnAccount)),
        users: canReadOwnAccount,
        viewer: isAuthenticated
    }
});

module.exports = {
    permissions
}