module.exports={
    port: process.env.PORT || 3800,
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/api',
    SECRET_TOKEN: 'miclavedetokens'
}