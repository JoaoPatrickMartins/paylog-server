class helloController{
    async index(  req, res ){
        return res.json({ hello: 'wold'});
    }
}

export default new helloController();