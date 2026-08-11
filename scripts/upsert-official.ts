/**
 * Upsert Official records (helper for seeding board member bios + photos).
 *
 * Usage:
 *   unset DATABASE_URI && npx tsx scripts/upsert-official.ts
 *
 * Edit the OFFICIALS array below, then run. Matches on exact name:
 * updates the existing record if found, creates it otherwise.
 * If photoPath is set, the image is uploaded to the media collection
 * (reused if a media doc with the same filename already exists).
 */

import { config as loadEnv } from 'dotenv'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')

// MUST run before payload.config is imported — it reads DATABASE_URI, PAYLOAD_SECRET, etc.
loadEnv({ path: path.resolve(projectRoot, '.env.local') })

type OfficialSeed = {
  name: string
  title: string
  department: string
  responsibilities?: string
  email?: string
  phone?: string
  bio?: string
  displayOrder?: number
  status?: string
  photoPath?: string // relative to project root
}

const OFFICIALS: OfficialSeed[] = [
  {
    name: 'Tony Recupito',
    title: 'Highway Commissioner',
    department: 'road-district',
    email: 'arecupito@cretetownship.com',
    phone: '708-672-7732',
    photoPath: 'public/assets/officials/recupito.jpeg',
    displayOrder: 0,
    status: 'published',
    bio: `Tony is a life-long resident of Crete Township and has been involved in Township government for over 38 years. He started out as a volunteer member of the Township Plan Commission in 1984, subsequently serving as its chairman. In 1992, he was elected as Township Trustee and served for 16 years in that position. He is currently serving in his 14th year as Highway Commissioner.

As Highway Commissioner, Tony is responsible for the maintenance of over 80 miles of roads in the unincorporated areas of the Township, which is currently the largest Township Road System in Will County. He has been instrumental in securing millions of dollars in federal grants for road improvements and bridge replacements, which takes the burden off the Road District portion of local property tax that each property owner pays.

Some of the duties that Tony and his crew are responsible for include road and ditch maintenance, culvert replacements, tree trimming and removal, branch pick-up, shoulder stone maintenance, roadside mowing and clean-up, sign maintenance, asphalt patching, bridge repair and replacement, snowplowing and salting. They also maintain most of their equipment in-house, in addition to maintaining the building and grounds.`,
  },
  {
    name: 'Cheryl Albrecht',
    title: 'Township Trustee',
    department: 'board',
    email: 'cheryl.albrecht@cretetownship.com',
    photoPath: 'public/assets/officials/albrecht.png',
    displayOrder: 20,
    status: 'published',
  },
  {
    name: 'Laura Hawkins',
    title: 'Township Trustee',
    department: 'board',
    email: 'laura.elton@cretetownship.com',
    photoPath: 'public/assets/officials/hawkins.jpg',
    displayOrder: 30,
    status: 'published',
    bio: `Crete Township Collector since 2016.

Republican Committeeperson for precinct 12 in Crete Township.

Past President and Vice President of Steger Kiwanis Club.

Volunteer and Planner of numerous events throughout Steger, Village of Crete and Crete Township including: parades, benefits, food pop-ups, recycling, senior luncheons, veterans events, Acorn Fest, Trunk or Treats and other children's events.

Founded and operated the annual Autism Benefit which has been in operation for 8 years, promoting autism awareness and raising over $60,000 for Speed School in Chicago Heights Autism Program.

Hands-on involvement in operating and managing the Bambino's Restaurant family business for over 36 years.

As Township Collector, organized and handed out one hundred backpacks full of school supplies to children in our area. Also organized and operated the free Letters to Santa Program for Crete Township children.

Resident of Crete Township living with my husband, raising our 16 year-old son Zachary who is autistic and nonverbal, my eldest son Joshua is 25.

Dedicated to serving and improving the quality of life for the families of Crete Township.`,
  },
  {
    name: 'Laurie Penman',
    title: 'Collector',
    department: 'collector',
    displayOrder: 0,
    status: 'published',
  },
  {
    name: 'Mary Margaret Tamez',
    title: 'Township Assessor',
    department: 'assessor',
    email: 'mary@creteassessor.com',
    photoPath: 'public/assets/officials/tamez.jpeg',
    displayOrder: 0,
    status: 'published',
    bio: `Mary Margaret Tamez was elected Assessor of Crete Township and officially began her term on January 1, 2018. She previously served as Chief Deputy Assessor of Crete Township prior to her running for elected office. She is a graduate of Crete-Monee High School and has been a resident of Crete Township for the last 30 years, spending her youth in University Park, Illinois.

Mary has been employed with the Crete Township Assessor's Office for the last twelve years and has vast experience in the area, assessing over 11,000 parcels and over 7,000 homes. She is currently an active member of the Illinois Assessors Association, Vice President of the Will County Assessor Association, and Township Officials of Illinois. She previously served as Co-President of the Parent-Teachers Organization ("PTO") of the Crete Monee Middle School and is a former member of the Crete Elementary PTO as well as the Crete Emergency Services & Disaster Agency ("ESDA"). Further information on Mary can be found on her LinkedIn profile: https://www.linkedin.com/in/mary-tamez-6b190411`,
  },
  {
    name: 'Frank Elton',
    title: 'Township Trustee',
    department: 'board',
    responsibilities: 'Senior and Special Events',
    email: 'frank.elton@cretetownship.com',
    photoPath: 'public/assets/officials/elton-frank.jpeg',
    displayOrder: 10,
    status: 'published',
    bio: `Frank Elton moved to Crete from Blue Island in the early 80's. His past work experiences include men's clothing store salesman, President of a chemical company, Blue Island police officer, to name a few, and he's currently the owner and operator of Bambino's Restaurant on 34th in Steger.

Frank is a people's person and loves to chat with everyone. As a Township Trustee in charge of Senior Events, he's very passionate about keeping Crete Township seniors busy with events such as the wildly popular Crete Township Senior Picnic and Crete Township Senior Christmas Luncheon.

Frank has been married to Debbie for 51 years and is the father of six children and 17 grandchildren. He also enjoys bird watching.`,
  },
  {
    name: 'Michael Liccar',
    title: 'Township Supervisor',
    department: 'board',
    email: 'michael.liccar@cretetownship.com',
    photoPath: 'public/assets/officials/liccar.jpg',
    displayOrder: 0,
    status: 'published',
    bio: `Michael has been a Crete Township resident for over 30 years and served as a Township Trustee from 2001 to 2016, and as Township Supervisor from 2017 to present. He graduated with a B.S. in Accountancy from Northern Illinois University in 1979 and is a licensed Certified Public Accountant and licensed Registered Investment Advisor.

He founded Michael J. Liccar & Co., CPAs (now Liccar Fund Services) in Chicago in 1988 and operated it through 2017. The Company was a 40-person CPA firm specializing in the investment industry. He is a Compatriot Member of the Sons of the American Revolution.

Michael and his wife Debbie of 40 years are proud parents to three grown daughters who are graduates of Crete-Monee High School. Both Michael and Debbie are heavily involved in our local community.

Past and Present positions held by Michael Liccar:

• Will County Paratransit Coordination Council Member
• Crete Township Plan Commission Member
• Chairman of the Crete Township Finance & Technology Committees
• Crete Country Christmas Organizer & Volunteer
• Concerts in the Park Organizer
• Crete EuroMarket Organizer
• Chairman of Crete Gospel Fest
• Chairman of the Crete Time Capsule Project
• Village of Riverdale Trustee, Finance Committee Chairman (1987-1990)
• Director and co-founder of the Edge Ministries which operates the Edge Coffee Shop
• Managing Director and co-founder of Evil Horse Brewing Company`,
  },
  {
    name: 'Jim Buiter',
    title: 'Township Clerk',
    department: 'clerk',
    email: 'jim.buiter@cretetownship.com',
    photoPath: 'public/assets/officials/buiter.jpeg',
    displayOrder: 5,
    status: 'published',
    bio: `Jim Buiter is now the new Crete Township Clerk. He currently resides in Crete, IL. He currently works as an independent financial advisor and CPA in Crete, IL. He has owned his tax practice for 10 years and has worked as a financial advisor for 23 years.

Prior to his current occupation he was a senior financial analyst for 6 years for Citibank, NA. He is married with three sons. He also has a dog and two cats. He has been a Crete resident since 2011. Previously he grew up and lived in Lansing, IL. He loves outdoor activities especially fishing and hunting. He is an avid hockey fan and is a devoted Blackhawks fan. GO HAWKS AND WOLVES!!! He also enjoys reading and walking.

He looks forward to taking on all the tasks required to be a township clerk. He looks forward to volunteering for the senior events and other township activities. He can always be reached at the township offices.`,
  },
]

async function run() {
  // Dynamic imports so they execute after loadEnv() has populated process.env
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')

  const payload = await getPayload({ config })

  for (const seed of OFFICIALS) {
    const { photoPath, ...data } = seed

    // Upload photo to media collection (or reuse existing doc by filename)
    let photoId: number | string | undefined
    if (photoPath) {
      const absPath = path.resolve(projectRoot, photoPath)
      const filename = path.basename(absPath)
      const existingMedia = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })
      if (existingMedia.docs.length > 0) {
        photoId = existingMedia.docs[0].id
        console.log(`ℹ️  Reusing existing media "${filename}" (id ${photoId})`)
      } else {
        const buffer = fs.readFileSync(absPath)
        const ext = path.extname(filename).toLowerCase()
        const mimetype = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png'
        const media = await payload.create({
          collection: 'media',
          data: { alt: `${seed.name}, ${seed.title}` } as any,
          file: { data: buffer, name: filename, mimetype, size: buffer.length },
        })
        photoId = media.id
        console.log(`ℹ️  Uploaded media "${filename}" (id ${photoId})`)
      }
    }

    const record = { ...data, ...(photoId ? { photo: photoId } : {}) }

    const existing = await payload.find({
      collection: 'officials',
      where: { name: { equals: seed.name } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const updated = await payload.update({
        collection: 'officials',
        id: existing.docs[0].id,
        data: record as any,
      })
      console.log(`✅ Updated official "${updated.name}" (id ${updated.id})`)
    } else {
      const created = await payload.create({
        collection: 'officials',
        data: record as any,
      })
      console.log(`✅ Created official "${created.name}" (id ${created.id})`)
    }
  }

  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Upsert failed:', err)
  process.exit(1)
})
