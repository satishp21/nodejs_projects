const AWS = require('aws-sdk')

const uploadTOS3 = (data,filename)=>{
    try{
    const BUCKET_NAME = 'expensetracker55'
    const IAM_USER_KEY = 'AKIAWZW2YFYTG3UT33BP'
    const IAM_USER_SECRET = '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'

    let s3bucket = new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
        // Bucket:BUCKET_NAME
    })
    // s3bucket.createBucket(()=>{ we dont need to create bucket it is already present
        var params = {
            Bucket:BUCKET_NAME,
            Key:filename,
            Body:data,
            ACL:'public-read' // acl is access control level
        }

        return new Promise((resolve,reject)=>{
            s3bucket.upload(params,(err,s3response)=>{
                if (err){
                    console.log('something went wrong',err)
                    reject(err)
                }
                else{
                    console.log('success',s3response)
                    resolve(s3response.Location)
                }
            })
        })
    }catch(err){
        console.log(err)
        res.status(500).json({ fileURL: '', success: false, success:false,err:err})
    }
}

module.exports= {
    uploadTOS3
}