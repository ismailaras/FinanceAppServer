import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())


export const get = async (req: any, res: any) => {
    const { entity } = req.params;

    try {
        switch (entity) {
            case 'companies':
                const companies = await prisma.company.findMany()
                res.json(companies)
                break;
            case 'invoices':
                const invoices = await prisma.invoice.findMany()
                res.json(invoices)
                break;
            case 'invoice-type':
                const invoiceType = await prisma.invoiceType.findMany()
                res.json(invoiceType)
                break;
            default:
                res.json("Entity not found")
                break;
        }
    }
    catch (error) {
        res.json(error)
    }
}

export const post = async (req: any, res: any) => {
    const { entity } = req.params;
    const data = req.body
    try {
        switch (entity) {
            case 'companies':
                await prisma.company.create({
                    data: {
                        ...data,
                        wallet: 0
                    },
                })
                res.json({ status: "success" })
                break;
            case 'invoices':
                await prisma.invoice.create({
                    data: {
                        ...data,
                    },
                })
                res.json({ status: "success" })
                break;
            case 'invoice-type':
                await prisma.invoiceType.create({
                    data: {
                        ...data,
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
        res.json(error)
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





app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`))
