import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const data = [
  { name: "Expargo", wallet: 0, ratio: 2.2, dateAdded: new Date() }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const c of data) {
    const company = await prisma.company.create({
      data: c,
    })
    console.log(`Created company with id: ${company.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
