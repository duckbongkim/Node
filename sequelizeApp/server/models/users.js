// const Sequelize = require('sequelize');


// // 상속받은 값을 초기화
// class User extends Sequelize.Model {
//    static initiate(sequelize){// 시퀄라이즈 초기화
//     User.init({// User 테이블의 초기값 설정 // 컬럼들의 대한 정보 추가
//         name:{
//             type:Sequelize.STRING(20), // datatype
//             allowNull: false, // Notnull
//             unique: false, // Unique 값
//         },
//         age:{
//             type:Sequelize.INTEGER.UNSIGNED, // 양의 정수만 받음
//             allowNull:false,
//         },
//         married:{
//             type:Sequelize.BOOLEAN // 참, 거짓 으로 데이터 사용
//         },
//         comment:{
//             type:Sequelize.TEXT, // text type 길이의 제한이 크게 없음
//             allowNull:true,
//         },
//         create_at:{
//             type: Sequelize.DATE,// DATE(시간포함) DATEONLY(날자만)
//             allowNull:false,
//             defaultValue: Sequelize.NOW, // 현재 시간이 기본값
//         },
        
//     },{
        
//         sequelize, // 모델에 대한 정보 
//         timestamps: false, // 자동으로 시간을 기록(createAt, updateAt)필드 생성을 하지 않음
//         underscored: false, // 테이블, 컬럼명등의 명명을 스네이크 표기법을 사용하지 않겟다.
//         modelName:'User',
//         tableName:'users', // 실제 테이블의 이름
//         paranoid: false, // 삭제된 데이터 복구 가능
//         charset:'utf8', // utf8로 인코딩
//         collate:'utf8_general_ci'
//     })
//    }
//    static associate(db) {
//     db.User.hasMany(db.Comment, {foreingKey:'commenter',sourceKey:'id'})
//    }
// }

// module.exports = User;


const Sequelize = require('sequelize');


class User extends Sequelize.Model{
    static initiate(sequelize){ // sequelize 초기화
        User.init({ // User 테이블의 초기값 설정
            name:{
                type: Sequelize.STRING(20), //datatype
                allowNull: false, // Not NUll
                unique: true // Unique 값
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED, //양의 정수
                allowNull: false // Not Null
            },
            married:{
                type: Sequelize.BOOLEAN // true, false 로 데이터 사용
            },
            comment:{
                type: Sequelize.TEXT, // text type
                allowNull: true,
            },
            create_at:{
                type: Sequelize.DATE, // Date(시간포함), DATEONLY(날짜만)
                allowNull: false,
                defaultValue: Sequelize.NOW, //현재 시간이 기본값

            },
        },{
            sequelize, // 모델에 대한 정보 
            timestamps: false, // 자동으로 시간 기록(createAt, UdateAt)필드 생성 하지 않음
            underscored: false, // 테이블, 컬럼명등의 명명을 스네이트 표기법을 사용하지 않겠다.
            modelName: 'User', // 모델이름
            tableName: 'users', // 실제 테이블의 이름
            paranoid: false, // 삭제된 데이터 복구 가능
            charset: 'utf8', // utf8로 데이터 인코딩
            collate: 'utf8_general_ci'
        })
    }
    static associate(db){
        db.User.hasMany(db.Comment, { foreignKey:'commenter', sourceKey: 'id'})
    }
}

module.exports = User;