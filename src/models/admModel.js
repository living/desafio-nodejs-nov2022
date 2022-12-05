import mongoose from "mongoose";

const ADMSchema = mongoose.Schema(
    {
        USUARIO:{type:String, required:true},
        SENHA:{type:String, required:true},
        createdAt: {
            type:Date,
            default: () => Date.now(),
            immutable:true
        },
        updatedAt: {
            type:Date,
            default: () => Date.now(),
        }
    },
)

const ADM = mongoose.model("administradores", ADMSchema)

export { ADM, ADMSchema }