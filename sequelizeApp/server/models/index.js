// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;


//RDBMS >> SQL 만 사용가능 시퀄라이즈는 DB를 노드에서 사용가능하도록 해줌

const Sequelize = require('sequelize');
const User = require('./users')
const Comment = require('./comment')

const env = process.env.NODE_ENV || 'development'; // 환경변수 설정
const config = require('../config/config')[env]; // 현재 실행환경에 맞는 confing 를 가져옴
const db = {}; // db객체 초기화

  
const sequelize = new Sequelize(config.database, config.username, config.password, config); // 시퀄라이즈로 객채를 만들고 인스턴스를 만들어줌

db.sequelize = sequelize; // 시퀄라이즈 인스턴스를 저장
db.User = User; // DB 에 테이블 정보를 전달
db.Comment = Comment;

User.initiate(sequelize) // 해당 User를 실행 해서 초기화 시키는 작업
Comment.initiate(sequelize);


//데이터베이스 관계 설정
User.associate(db);
Comment.associate(db);

module.exports = db;