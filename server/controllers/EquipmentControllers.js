const path = require('path');
const fs = require('fs');
const uploadDir = path.resolve(__dirname, '..', 'uploads');
const  EquipmentModel  = require('../models/equipment');



class EquipmentControllers {
  async getEquipment(req, res) {
    try {
      
      const equipment = await EquipmentModel.find();
      res.json({ data: equipment });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async getEquipmentById(req, res) {
    try {
      const { id } = req.params;
      let product;
      if (id) {
        if (id.length < 15) {
          product = await EquipmentModel.findOne({ id: id });
        } else {
          product = await EquipmentModel.findById(id);
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

  
  async addEquipment(req, res) {
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
      const { title, description } = req.body;
      const newEquipment = new EquipmentModel({
        title,
        description,
        image : imageName

      });
      newEquipment.id = String(newEquipment._id)
      await newEquipment.save();
      res.status(201).json({ data: newEquipment });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  }

  // Обновление услуги

  async updateEquipment(req, res) {
    try {
      const { id } = req.params;
      let { title, description } = req.body;


      const product = await EquipmentModel.findOne({ id: id });
      console.log(product);
      
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
      product.description = description != "null" ? description : product.description;
      product.image = imageName || product.image


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


  async deleteEquipment(req, res) {
    try {
      const { id } = req.params;

      // Проверяем, существует ли сервис с указанным ID
      const service = await EquipmentModel.findOne({ id: id });
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      console.log(service);

      // Удаляем сервис
      await EquipmentModel.findByIdAndDelete(service._id);
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

module.exports = new EquipmentControllers()