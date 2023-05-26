const upload_video= async (req, res)=> {
    const {file }= req
    if(!file) {
        return req.status(400).send("không có video được tải lên")
    }

    const video= {
        name: file.originalname,
        path: file.path,
        size: file.size
    }

    return res.status(200).json(video)
}