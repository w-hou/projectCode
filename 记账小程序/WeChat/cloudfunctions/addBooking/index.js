// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    try {

        return db.collection("bookingData").add({
            data: event,
        })

    } catch(err) {
        
    }
}