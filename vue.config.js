module.exports={
    configureWebpack:{
        devServer:{
            before(app){
                app.get('/api/goods', function(req,res){
                    res.json({
                        code:0,
                        list:[
                            { id: 1, text: "web", price: 200 },
                            { id: 2, text: "front-end", price: 340 }
                        ]
                    })
                })
            }
        }
    }
}