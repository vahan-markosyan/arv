const path = require('path');
const fs = require('fs');
const uploadDir = path.resolve(__dirname, '..', 'uploads');
const { ServiceItem } = require('../models/ServiceItem');



class ServiceItemControllers {
  async getServiceItems(req, res) {
    try {
      
      const serviceItems = await ServiceItem.find().populate('serviceId', 'title');
      res.json({ data: serviceItems });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async getServicItemsById(req, res) {
    try {
      const { id } = req.params;
      let product;
      if (id) {
        if (id.length < 15) {
          product = await ServiceItem.findOne({ id: id });
        } else {
          product = await ServiceItem.findById(id);
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

  async getServicItemsByIdOne(req, res) {
    try {
      console.log(1);
      
      const { id } = req.params;
      let product;
      if (id) {
        if (id.length < 15) {
          product = await ServiceItem.findOne({ id: id });
        } else {
          product = await ServiceItem.findById(id);
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

  // Добавление новой услуги
  async postServiceItems(req, res) {
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

    try {
      const { descArray, price, title, serviceId } = req.body;
      console.log(serviceId);
      const newServiceItem = new ServiceItem({
        descArray: JSON.parse(descArray),
        price: JSON.parse(price),
        title,
        serviceId,
        image: imageName,
      });
      newServiceItem.id = String(newServiceItem._id)
      await newServiceItem.save();
      res.status(201).json({ data: newServiceItem });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  }

  // Обновление услуги

  async putServiceItems(req, res) {
    try {
      const { id } = req.params;
      let { title, descArray, price, serviceId } = req.body;


      const product = await ServiceItem.findOne({ id: id });

      if (!product) {
        return res.status(404).json({ message: 'Продукт не найден' });
      }

      const mainImage = req.files?.image || null;
      let imageName;
      const filePath = path.join(uploadDir, product.image)

      if (mainImage) {
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error('Ошибка при удалении файла:', err);
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
            return res.status(500).json({ message: 'Не удалось сохранить основное изображение' });
          }
        }
      }
      product.title = title != "null" ? title : product.title;
      product.descArray = JSON.parse(descArray);
      product.price = JSON.parse(price);
      product.image = imageName || product.image
      product.serviceId = serviceId || product.serviceId


      console.log(product);


      await product.save();
      product.id = product._id.toString()

      // Возвращаем объект с полем `id`
      res.status(200).json({
        data: product // Возвращаем остальные поля объекта
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: 'Ошибка при обновлении продукта' });
    }
  }


  async deleteServiceItems(req, res) {
    try {
      const { id } = req.params;

      // Проверяем, существует ли сервис с указанным ID
      const service = await ServiceItem.findOne({ id: id });
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      console.log(service);

      // Удаляем сервис
      await ServiceItem.findByIdAndDelete(service._id);
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

}

module.exports = new ServiceItemControllers()