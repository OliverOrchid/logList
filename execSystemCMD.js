let {exec} = require("child_process")

sysCmd ="svn log --xml -r{2019-06-12}:HEAD  C:/SVNTestwc"
exec(sysCmd,function(error,stdout,stderr){
    if(error){
        console.warn(error)
        return
    }
    showData = JSON.stringify(`stdout:${stdout}`)
    // showData = showData01.toJSON()
    // let json = JSON.parse(showData)

    console.log(showData)

})
