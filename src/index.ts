import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())


app.get('/companies', async (req, res) => {
    const companies = await prisma.company.findMany()
    res.json(companies)
})

app.post(`/companies`, async (req, res) => {
    const { name, ratio } = req.body
    const result = await prisma.company.create({
        data: {
            name,
            ratio,
            wallet: 0
        },
    })
    res.json(result)
})

app.delete(`/companies`, async (req, res) => {
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

})

app.put('/companies', async (req, res) => {
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
})







const server = app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`))
