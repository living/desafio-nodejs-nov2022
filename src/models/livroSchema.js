import mongoose from 'mongoose';

const LivroSchema = new mongoose.Schema(
    {
        TITULO: { type:String, required:true },
        AUTOR: { type:String, required:true },
        EDITORA: { type: mongoose.Schema.Types.ObjectId, ref:"editora", required:true },
        PRECO: { type:Number, required:true },
        QUANTIDADE: { type:Number, required:true },
        createdAt: {
            type:Date,
            default: () => Date.now(),
            immutable:true
        },
        updatedAt: {
            type:Date,
            default: () => Date.now(),
        }
    }
)

const Livro = mongoose.model("livros", LivroSchema)

export { Livro , LivroSchema }