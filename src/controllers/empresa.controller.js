const Empresa = require("../models/empresa");

const empresaCtrl = {};

empresaCtrl.getEmpresas = async (req, res, next) => {
  const empresas = await Empresa.find();
  res.json(empresas);
};

empresaCtrl.getEmpresasDistinct = async (req, res, next) => {
  const empresas = await Empresa.aggregate([
    {
    $group: {
        _id: "$pais" 
    }
    },
    {
        $project: {
            _id: 0,
            pais: "$_id"
        }
    }
]);
  res.json(empresas);
};

empresaCtrl.getEmpresasDistinctdos = async (req, res, next) => {
  const empresas = await Empresa.aggregate([
    {
    $group: {
        _id: "$localidad" 
    }
    },
    {
        $project: {
            _id: 0,
            localidad: "$_id"
        }
    }
]);
  res.json(empresas);
};

empresaCtrl.getEmpresasFilter = async (req, res, next) => {
  const { pais } = req.params;
  const empresas = await Empresa.find({pais: pais});
  res.json(empresas);
};

empresaCtrl.getEmpresasFilterdos = async (req, res, next) => {
  const { localidad } = req.params;
  const empresas = await Empresa.find({localidad: localidad});
  res.json(empresas);
};

empresaCtrl.getEmpresasFilterdos = async (req, res, next) => {
  const { localidad } = req.params;
  const empresas = await Empresa.find({localidad: localidad});
  res.json(empresas);
};

empresaCtrl.createEmpresa = async (req, res, next) => {
  const empresa = new Empresa({
    name: req.body.name,
    descripcion: req.body.descripcion,
    direccion: req.body.direccion,
    localidad: req.body.localidad,
    pais: req.body.pais,
    longitude: req.body.longitude,
    latitude: req.body.latitude,

  });
  await empresa.save();
  res.json({ status: "Empresa created" });
};

empresaCtrl.getEmpresa = async (req, res, next) => {
  const { id } = req.params;
  const empresa = await Empresa.findById(id);
  res.json(empresa);
};

empresaCtrl.editEmpresa = async (req, res, next) => {
  const { id } = req.params;
  await Empresa.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "Empresa Updated" });
};

empresaCtrl.deleteEmpresa = async (req, res, next) => {
  await Empresa.findByIdAndRemove(req.params.id);
  res.json({ status: "Empresa Deleted" });
};

module.exports = empresaCtrl;
