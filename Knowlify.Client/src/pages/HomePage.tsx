import SkillCard from '@/components/skill/SkillCard'
import TransactionCard from '@/components/transaction/TransactionCard'
import BarterCard from '@/components/barter/BarterCard'
import { useSkill } from '@/hooks/skill'
import { useTransaction } from '@/hooks/transaction'
import { useBarter } from '@/hooks/barter'
import SearchCard from '@/components/search/SearchCard'

export default function HomePage() {
  const { skills, lastSkills } = useSkill()
  const { transactions } = useTransaction()
  const { lastBarters } = useBarter()

  const numBarterCards = 3
  console.log(skills)

  return (
    <div className='flex flex-col gap-10'>
      <header>
        <div className='flex gap-10'>
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
          <main className='flex flex-col md:flex-row md:gap-8 items-center justify-between'>
            {/* only 3 skills */}
            {lastSkills().map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </main>
        </section>

        <section className='flex flex-col gap-6'>
          <header>
            <h1 className='text-3xl font-semibold'>
              Últimos trueques realizados
            </h1>
          </header>
          <main className='flex flex-col md:flex-row md:gap-8 items-center justify-between'>
            {transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </main>
        </section>

        <section className='flex flex-col gap-6'>
          <header>
            <h1 className='text-3xl font-semibold'>Trueques abiertos</h1>
          </header>
          <main className='flex flex-col md:flex-row md:gap-8 items-center justify-between'>
            {lastBarters(numBarterCards).map((barter) => (
              <BarterCard key={barter.id} barter={barter} />
            ))}
          </main>
        </section>
      </main>
    </div>
  )
}
