import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';

const prisma = new PrismaClient()
const app = express()

dotenv.config()

app.use(cors())


app.use(express.json())


export const get = async (req: any, res: any) => {
    const { entity } = req.params;
    let data;
    try {
        switch (entity) {
            case 'companies':
                data = await prisma.company.findMany()
                break;
            case 'invoices':
                data = await prisma.invoice.findMany()
                break;
            case 'invoice-type':
                data = await prisma.invoiceType.findMany()
                break;
            default:
                throw new Error('Entity not found.')
        }
        return res.json({status: 'success', data})
    }
    catch (error: any) {
        console.log(error.message)
        res.json(error)
    }
}

export const post = async (req: any, res: any) => {
    const { entity } = req.params;
    const data = req.body;
    try {
        switch (entity) {
            case 'companies':
                const newCompany = await prisma.company.create({
                    data: {
                        ...data,
                        wallet: 0
                    },
                });
                return res.json({ status: "success", newCompany })
            case 'invoices':
                const foundInvoiceType = await prisma.invoiceType.findUnique({
                    where: {
                        text: data.invoiceType
                    }
                })
                if (!foundInvoiceType) 
                    await prisma.invoiceType.create({
                        data: {
                            text: data.invoiceType
                        }
                    })
                
                await prisma.company.update({
                    where: {
                        name: data.company
                    },
                    data: {
                        wallet: {
                            increment: data.amount * -1
                        }
                    }
                  })

                const newInvoice = await prisma.invoice.create({
                    data: {
                        ...data,
                    },
                })
                return res.json({ status: "success", newInvoice })
            case 'invoice-type':
                await prisma.invoiceType.create({
                    data: {
                        ...data,
                    },
                })
                return res.json({ status: "success" })
            default:
                return res.json({status: 'error', message: "Entity not found"})
        }
    }
    catch (error: any) {
        console.log(error.message)
        return res.json({status: 'error', message: error.message})
    }
}

export const del = async (req: any, res: any) => {
    const { id } = req.body
    const { entity } = req.params;

    try {
        switch (entity) {
            case 'companies':
                await prisma.company.delete({
                    where: {
                        id: Number(id),
                    },
                })
                res.json({ status: "success" })
                break;
            case 'invoices':
                await prisma.invoice.delete({
                    where: {
                        id: Number(id),
                    },
                })
                res.json({ status: "success" })
                break;
            case 'invoice-type':
                await prisma.invoiceType.delete({
                    where: {
                        id: Number(id),
                    },
                })
                res.json({ status: "success" })
                break;
            default:
                res.json("Entity not found")
                break;
        }
    }
    catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` })

    }
}
export const put = async (req: any, res: any) => {
    const { id, data } = req.body

    const { entity } = req.params;

    try {
        switch (entity) {
            case 'companies':
                await prisma.company.update({
                    where: { id: Number(id) },
                    data: {
                        ...data
                    },
                })
                res.json({ status: "success" })
                break;
            case 'invoices':
                await prisma.invoice.update({
                    where: { id: Number(id) },
                    data: {
                        ...data
                    },
                })
                res.json({ status: "success" })
                break;
            case 'invoice-type':
                await prisma.invoiceType.update({
                    where: { id: Number(id) },
                    data: {
                        ...data
                    },
                })
                res.json({ status: "success" })
                break;
            default:
                res.json("Entity not found")
        }
    }
    catch (error) {
        res.json(error)
    }


}


const router = express.Router();

router.get('/:entity', get);
router.post('/:entity', post);
router.delete('/:entity', del);
router.put('/:entity', put);
app.use('/', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`🚀 Server ready at: ${PORT}`))
