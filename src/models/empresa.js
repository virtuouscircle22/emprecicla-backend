const mongoose = require("mongoose");
const { Schema } = mongoose;

const empresaSchema = new Schema(
  {
    name: { type: String, required: true },
    descripcion: { type: String, required: true },
    direccion: { type: String, required: true },
    localidad: { type: String, required: true },
    pais: { type: String, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("empresas", empresaSchema);

