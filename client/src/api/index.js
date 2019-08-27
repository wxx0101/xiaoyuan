import request from "../utils/request"

const login = (data) => request.post("/user/login", data)
const userCheckbox = (data) => request.post("/user/checkCode", data)
const homeBanner = () => request.get("/home/banner")
const homeShop = (data) => request.get("/home/shop", { params: data })
const classifyShop = (data) => request.get("/shop/shopType", { params: data })
const shopSelectType = (data) => request.get("/shop/selectType", { params: data })
const carAddCar = (data) => request.post("/car/addCar", data)
const carGetCar = (data) => request.get("/car/getCar", { params: data })
const carRemoveCar = (data) => request.post("/car/removeCar", data)
const carRemoveShop = (data) => request.post("/car/removeShop", data) //删除购物车商品
const carSearch = (data) => request.get("/search", { params: data })  //搜索
const allShop = () => request.get("/shop/allShop") //获取所有商品

export default { login, userCheckbox, homeBanner, homeShop, classifyShop, shopSelectType, carAddCar, carGetCar, carRemoveCar, carRemoveShop, carSearch, allShop }