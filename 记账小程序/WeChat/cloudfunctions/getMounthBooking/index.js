// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {

    try{

        return await db.collection("bookingData").where({
            bookingInfo: {
                date: _.gte(event.start).and(_.lte(event.end)),
            },
            userInfo: event.userInfo,
        }).get();

    } catch(err) {
        
        

    }
}