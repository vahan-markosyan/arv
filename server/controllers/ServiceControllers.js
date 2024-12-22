const Service = require('../models/Service');
const path = require('path');
const fs = require('fs');
const uploadDir = path.resolve(__dirname, '..', 'uploads');
const ServiceItem = require('../models/ServiceItem');



class ServicesControllers {
    async getServices(req, res) {
        try {
            const services = await Service.find();
            res.status(200).json({ data: services });
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch services.', error: error.message });
        }
    };



    // Получение сервиса по ID
    async getServiceById(req, res) {
        try {
            const { id } = req.params;
            let product;
            if (id) {
                if (id.length < 15) {
                    product = await Service.findOne({ id: id });
                } else {
                    product = await Service.findById(id);
                }
            }
            if (!product) {
                return res.status(404).json({ message: 'Продукт не найден' });
            }

            const formattedProduct = {
                ...product.toObject(),
                id: product._id.toString(),
                image: `http://localhost:3000/uploads/${product.image}`,

            };

            res.status(200).json(formattedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Ошибка получения продукта', error });
        }
    }




    async addService(req, res) {
        console.log(1);

        try {
            const { title, description, link } = req.body;
            const mainImage = req.files?.image || null;
            const imageName = `${Date.now()}${path.extname(mainImage.name)}`
            const mainImagePath = mainImage
                ? path.join(uploadDir, imageName)
                : null;
            console.log(mainImagePath);
            if (mainImage) {
                try {
                    await mainImage.mv(mainImagePath);
                } catch (err) {
                    console.error('Ошибка при сохранении основного изображения:', err);
                    return res.status(500).json({ message: 'Не удалось сохранить основное изображение' });
                }
            }

            console.log('l,crdfc');
            

            if (!title || !description) {
                return res.status(400).json({ message: 'Title and description are required.' });
            }

            const newService = new Service({
                title,
                description,
                image: imageName,
                link,
            });
            newService.id = String(newService._id)
            await newService.save();

            res.status(201).json({
                data: newService,
            });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add service.', error: error.message });
        }
    }



    async deleteServiceById(req, res) {
        try {
            const { id } = req.params;

            // Проверяем, существует ли сервис с указанным ID
            const service = await Service.findOne({ id: id });
            if (!service) {
                return res.status(404).json({ message: 'Service not found' });
            }
            console.log(service);

            // Удаляем сервис
            await Service.findByIdAndDelete(service._id);
            const filePath = path.join(uploadDir, service.image)

            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении файла:', err);
                        return res.status(500).send('Ошибка при удалении файла');
                    }
                    console.log('Файл успешно удалён:', filePath);
                });
            }
            res.status(200).json({ message: 'Service deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete service', error: error.message });
        }
    };
    async updateServices(req, res) {
        try {
            const { id } = req.params;
            const { title, description, link } = req.body;


            const product = await Service.findOne({ id: id });
            if (!product) {
                return res.status(404).json({ message: 'Продукт не найден' });
            }

            const mainImage = req.files?.image || null;
            let imageName;
            const filePath = path.join(uploadDir, product.image)
            console.log(req.body);

            if (mainImage) {
                if (fs.existsSync(filePath)) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Ошибка при удалении файла:', err);
                            return res.status(500).send('Ошибка при удалении файла');
                        }
                    });
                }
                imageName = `${Date.now()}${path.extname(mainImage.name)}`
                const mainImagePath = mainImage
                    ? path.join(uploadDir, imageName)
                    : null;
                if (mainImage) {
                    try {
                        await mainImage.mv(mainImagePath);
                    } catch (err) {
                        console.error('Ошибка при сохранении основного изображения:', err);
                    }
                }
            }

            product.title = title != "null" ? title : product.title;
            product.description = description != "null" ? description : product.description;
            product.link = link != "null" ? link : product.link;
            product.image = imageName || product.image




            await product.save();
            product.id = product._id.toString()

            // Возвращаем объект с полем `id`
            res.status(200).json({
                data: product // Возвращаем остальные поля объекта
            });
        } catch (error) {
            res.status(500).json({ message: 'Ошибка при обновлении продукта' });
        }
    }

}

module.exports = new ServicesControllers()