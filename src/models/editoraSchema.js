import mongoose from 'mongoose';

const EditoraSchema = new mongoose.Schema(
    {
        NOME:{ type:String, required:true },
        CNPJ:{ type:String, required:true },
        LIVROS: {
            type: Array
        },
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

const Editora = mongoose.model("editora", EditoraSchema)

export { Editora , EditoraSchema }