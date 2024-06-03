import TransactionCard from '@/components/transaction/TransactionCard'
import BarterCard from '@/components/barter/BarterCard'
import { useSkill } from '@/hooks/skill'
import { useTransaction } from '@/hooks/transaction'
import { useBarter } from '@/hooks/barter'
import SearchCard from '@/components/search/SearchCard'
import SkillCard2 from '@/components/skill/SkillCard2'

export default function HomePage() {
  const { lastSkills } = useSkill()
  const { lastTransactions } = useTransaction()
  const { lastBarters } = useBarter()

  const numBarterCards = 3

  const mapCategoryColor = {
    Hogar: 'sky',
    Jardineria: 'green',
    Enseñanza: 'blue',
    Administración: 'red',
    Tecnología: 'purple',
    Desarrollo: 'yellow',
    Otros: 'gray',
  }

  return (
    <div className='flex flex-col gap-10'>
      <header>
        <div className='flex flex-col gap-10 lg:flex-row'>
          <div>
            <h1 className='text-2xl font-bold'>
              Comparte tus habilidades con gente de todo el mundo
            </h1>
            <p className='text-xl'>Inspirado en el trueque de toda la vida.</p>
          </div>
          <div className='flex flex-1 gap-4'>
            <SearchCard />
            {/* <div className="flex-1 max-w-full overflow-hidden rounded-2xl">
              <img
                src="/public/home2.webp"
                className="h-full w-full object-cover object-center"
                alt="Descripción de la imagen"
              />
            </div> */}
          </div>
        </div>
      </header>
      <main className='flex flex-col gap-20'>
        <section className='flex flex-col gap-6'>
          <header>
            <h1 className='text-3xl font-semibold'>Habilidades destacadas</h1>
          </header>
          <main className='grid grid-cols-1 md:grid-cols-3'>
            {/* only 3 skills */}
            {lastSkills().map((skill) => (
              <article key={skill.id}>
                <SkillCard2
                  skill={skill}
                  bgColor={
                    mapCategoryColor[
                      skill.category as keyof typeof mapCategoryColor
                    ]
                  }
                />
              </article>
            ))}
          </main>
        </section>

        <section className='flex flex-col gap-6'>
          <header>
            <h1 className='text-3xl font-semibold'>
              Últimos trueques realizados
            </h1>
          </header>
          <main className='grid grid-cols-1 gap-10 md:grid-cols-3'>
            {lastTransactions.slice(0, 3).map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </main>
        </section>

        <section className='flex flex-col gap-6'>
          <header>
            <h1 className='text-3xl font-semibold'>Trueques abiertos</h1>
          </header>
          <main className='grid grid-cols-1 gap-10 md:grid-cols-3'>
            {lastBarters(numBarterCards).map((barter) => (
              <BarterCard key={barter.id} barter={barter} />
            ))}
          </main>
        </section>
      </main>
    </div>
  )
}
