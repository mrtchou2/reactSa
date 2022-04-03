const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const {Product, ProductInfo} = require('../models/models');

class productController {
    async createProduct(req, res, next) {
        try {
            let {name, price, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const product = await Product.create({name, price, typeId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => 
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                );
            };

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    };

    async updateProduct(req, res, next) {
        const {id} = req.params;
        let product = await Product.update(
            {
                name: req.body.name, 
                price: req.body.price, 
                typeId: req.body.typeId, 
                img: req.body.fileName
            }, 
            {
                where: {id}
            }
            );
        return res.json(product);
    };

    async getAllProducts(req, res, next) {
        const products = await Product.findAll()
        return res.json(products);
    };

    async getOneProduct(req, res, next) {
        const {id} = req.params;
        const product = await Product.findOne(
            {
                where: {id},
                include: [{model: ProductInfo, as: 'info'}]
            },
        );
        return res.json(product)
    };

    async getProductsByType(req, res, next) {
        const products = await Product.findByPk(
            {
                where: {typeId: req.body.typeId},
                includes: [{model: ProductInfo, as: 'info'}]
            },
        );
        return res.json(products);
    }

    async deleteProduct(req, res) {
        const {id} = req.params;
        const product = await Product.destroy(
            {
                where: {id}
            },
        );
        return res.json(product);
    };
};

module.exports = new productController();