import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())


export const get = async (req: any, res: any) => {
    try {
        const companies = await prisma.company.findMany()
        res.json(companies)
    }
    catch (error) {
        res.json(error)
    }
}

export const post = async (req: any, res: any) => {
    const { name, ratio } = req.body
    const result = await prisma.company.create({
        data: {
            name,
            ratio,
            wallet: 0
        },
    })
    res.json(result)
}

export const del = async (req: any, res: any) => {
    const { id } = req.body

    try {
        const company = await prisma.company.delete({
            where: {
                id: Number(id),
            },
        })
        res.json(company)
    }
    catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` })
    }

}
export const put = async (req: any, res: any) => {
    const { id, data } = req.body

    try {
        const company = await prisma.company.update({
            where: { id: Number(id) },
            data: {
                ...data
            },
        })

        res.json(company)
    } catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` })
    }
}


const router = express.Router();

router.get('/companies', get);
router.post('/companies', post);
router.put('/companies', put);
router.delete('/companies', del);

app.use('/', router)




const server = app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`))
