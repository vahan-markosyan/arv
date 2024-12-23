const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (_, _, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Уникальное имя файла
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Лимит 10 МБ
});

// Настройка для обработки нескольких полей
const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 }, // Главное изображение
    { name: 'servicesImages', maxCount: 10 }, // Изображения сервисов
]);

module.exports = uploadFields;
