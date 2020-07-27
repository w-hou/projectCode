// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 获取数据库引用
const db = cloud.database();

// 获取查询指令引用
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
    
    try {
        
        let date = null;
        if(event.end){
            // 开始日期 <= date <= 结束日期
            date = _.gte(event.start).and(_.lte(event.end));
            
        } else {
            date = event.start;
        }

        return await db.collection("bookingData").where({
            bookingInfo: {
                date,
            },
            userInfo: event.userInfo,
        }).get();

    } catch (err) {

        

    }

}