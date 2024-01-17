const getRecomendedHouses = async (req , res) => {
    res.status(200).json({
        massage: "success",
    })  
}

module.exports = {
    getRecomendedHouses
}