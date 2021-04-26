const moment = require("moment");
moment.locale("es");
//para el manejo de archivos
const fs = require("fs");
//Para manejar las rutas de directorios
const csv=require('csvtojson')

const Material = require("../models/Material");


exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    return res.render("adminMaterials", {
      materials,
      title: "admin-materiales",
    });
  } catch (error) {
    console.log(error);
    req.flash("errors", { msg: "error!" });
    return res.redirect("back");
  }
};
exports.postMaterials = async (req, res) => {
  try {
    const { file } = req;
    const filePath = file.path;
    let materials = []
    const jsonObj = await csv({
      noheader:true,
      output: "csv"
    }).fromFile(filePath)
    for (let index = 1; index < jsonObj.length; index++) {
      //los csv pueden estar separados por , o ; hacer la lectura correcta segun sea el caso
      const arr = jsonObj[index]
      const obj = {user:arr[0],item:arr[1],price:arr[2],quantity:arr[3]}
      materials.push(obj)
    }
    await Material.insertMany(materials).then(function () {
      fs.unlinkSync(filePath);
    });

    req.flash('success', { msg: `Materiales actualizados!` });
    return res.redirect('/');
  } catch (error) {
    console.log(error);
    req.flash("errors", { msg: "error!" });
    return res.redirect("back");
  }
};