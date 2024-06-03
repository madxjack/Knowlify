import { ISkill } from '@/interfaces/skill'
import ImageWithSkeleton from '@/components/img/ImageWithSkeleton'
import { Link } from 'react-router-dom'

interface SkillCardProps extends React.HTMLAttributes<HTMLDivElement> {
  skill: ISkill
}

export default function SkillCard({ skill, ...props }: SkillCardProps) {
  return (
    <div {...props} className={`${props.className} w-full`}>
      {/* Provisional border  */}
      <ImageWithSkeleton
        src={skill.imageUrl}
        alt={skill.name}
        className='w-full object-cover aspect-square rounded-xl border-2'
      />
      {/* <img
        className="w-full object-cover aspect-square rounded-xl border-2"
        src="./public/gardener.jpg"
        alt={skill.name}
        loading="lazy"
      /> */}
      <section>
        <h2 className='text-lg font-bold text-black/80'>{skill.name}</h2>
        <h3 className='text-sm text-black/50'>{skill.description}</h3>
        <p className='text-sm text-black/50'>{skill.category}</p>
      </section>
      <div className='mt-2'>
        <span className='inline-block text-orange-600 text-sm font-medium py-2 hover:text-orange-400 transition-colors duration-200'>
          <Link to={`/skill/${skill.id}`}>Ver detalles</Link>
        </span>
      </div>
    </div>
  )
}
