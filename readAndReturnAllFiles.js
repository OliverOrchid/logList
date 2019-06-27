/*
本文件的功能是读取特定目录下的所有文件，返回文件名+文件数据流

另见data目录
*/

//js允许每条指令无需添加semicolon

let path = require("path") //目录路径
let fs = require("fs") //数据流

//出于测试的目的， 手动添加目录
let filePath = path.resolve("./data")


function fileShow(file_path){

    //库函数fs.readdir(arg1,arg2) ， 返回 list对象（此处是指files1）
    fs.readdir(filePath,function(error,files1){
        //捕捉异常
        if(error){
            console.warn(error)
        }
        else{
            //list对象 自带forEach(）
            files1.forEach(function(files2){

                //files2作为形参 代表每一个 “list-member”
                let absFilePath = path.join(filePath,files2)
                
                //fs.stat(a1,a2) 返回“fileProperty对象”（此处是指stats）
                fs.stat(absFilePath,function(error,stats){
                    if(error){
                        console.warn(error)
                    }
                    else{
                        let good = stats.isFile()
                        let shit = stats.isDirectory()

                        //如果是文件 则打印该文件
                        if(good){
                            let readInStream = fs.createReadStream(absFilePath)

                            //The readInStream.on() function is an event handler and in it, we are specifying the first parameter as 'data' which means that whenever data comes in the stream from the file, then execute second parameter which is a callback-function.
                            readInStream.on("data",function(data){
                                // babyStream = data.toJSON()
                                babyStream = data.toString()
                                console.log("Here is a new one>>>\n\n\n"+babyStream+"\n\n\n")
                            })
                        }
                        
                        //如果是文件夹 ，则作为实参 继续遍历
                        if(shit){
                            fileShow(absFilePath)
                        }
                    }
                }) 
            })
        }
    })
}


//调用函数
fileShow(filePath)


