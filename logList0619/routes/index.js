let express = require('express');
let fs = require('fs')
const xml2js = require('xml2js');
let exec = require("child_process").exec


let router = express.Router();


let path = require("path") //目录路径
// let fs = require("fs") //数据流

//出于测试的目的， 手动添加目录
let filePath = path.resolve("../data")
// let sysCmd ="svn log --xml -r{2019-06-12}:HEAD  C:/SVNTestwc"


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'LogSystem' });
// });



/*
本文件的功能是读取特定目录下的所有文件，返回文件名+文件数据流

另见data目录
*/

//js允许每条指令无需添加semicolon

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
                                // // babyStream = data.toString()

                                // console.log("Here is a new one>>>\n\n\n"+babyStream+"\n\n\n")
                                

                                

                                ///////////////////////////////////////////////

                                let jsonBuilder = xml2js.parseString
                                let  result = jsonBuilder(data)
                                res.end(result)                                

                                /////////////////////////////////////////////////



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





router.get('/',function(req,res){


    /*
本文件的功能是读取特定目录下的所有文件，返回文件名+文件数据流

另见data目录
*/

//js允许每条指令无需添加semicolon

// function fileShow(file_path){

    //库函数fs.readdir(arg1,arg2) ， 返回 list对象（此处是指files1）
//     fs.readdir(filePath,function(error,files1){
//         //捕捉异常
//         if(error){
//             console.warn(error)
//         }
//         else{
//             //list对象 自带forEach(）
//             files1.forEach(function(files2){

//                 //files2作为形参 代表每一个 “list-member”
//                 let absFilePath = path.join(filePath,files2)
                
//                 //fs.stat(a1,a2) 返回“fileProperty对象”（此处是指stats）
//                 fs.stat(absFilePath,function(error,stats){
//                     if(error){
//                         console.warn(error)
//                     }
//                     else{
//                         let good = stats.isFile()
//                         let shit = stats.isDirectory()

//                         //如果是文件 则打印该文件
//                         if(good){
//                             let readInStream = fs.createReadStream(absFilePath)

//                             //The readInStream.on() function is an event handler and in it, we are specifying the first parameter as 'data' which means that whenever data comes in the stream from the file, then execute second parameter which is a callback-function.
//                             readInStream.on("data",function(data){
                                
//                                 // babyStream = data.toJSON()
//                                 // // babyStream = data.toString()

//                                 // console.log("Here is a new one>>>\n\n\n"+babyStream+"\n\n\n")
                                

                                

//                                 ///////////////////////////////////////////////

//                                 let jsonBuilder = xml2js.parseString
//                                 let  result = jsonBuilder(data)
//                                 res.send(result)                                

//                                 /////////////////////////////////////////////////



//                             })
//                         }
                        
//                         //如果是文件夹 ，则作为实参 继续遍历
//                         if(shit){
//                             fileShow(absFilePath)
//                         }


//                     }
//                 }) 
//             })
//         }
//     })
// // }


    
    
    //调用函数
    // fileShow(filePath)



    //   exec(sysCmd,function(error,stdout){
    //   if(error){
        // console.warn(error)
        // return
    //   }

      //create json-string
      // let  showData = JSON.stringify(stdout)

      //parse json-string
    //   let data  = JSON.parse(stdout)
    //   console.log(data)
      // res.end(obj.date)
      // res.end(showData)

      // res.end(stdout)

      // let readStream = fs.createReadStream(stdout)


      //
      // let jsonBuilder = xml2js.parseString
      // let  result = jsonBuilder(`stdout: ${stdout}`)
      // res.end(result)


      // let stringOfStdout = String(stdout)
      // res.end(stringOfStdout)


      //
      // let data = JSON.parse(stdout);
      // res.end(data)


    // res.end(stdout)

    //
    // showData = showData01.toJSON()
    // let json = JSON.parse(showData)
    // console.log("res")
    //
    // res.render('index',
    //     { title: 'LogSystem' },
    //     { showData:showData }
    // );
    //
    // let jsonBuilder = xml2js.parseString() //xml --> json
    //
    // let showData = jsonBuilder(stdout)
    //
    // var xml = "<root>Hello xml2js!</root>"
    // var parseString = require('xml2js').parseString;
    //
    // parseString(xml, function (err, result) {
    //   // console.dir(result);
    //   res.end(result)
    //
    // });



//   })
})


/////////////////////////////////////////
module.exports = router;

