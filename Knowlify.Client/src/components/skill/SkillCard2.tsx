import '../../styles/skillCard.css'
import { ISkill } from '@/interfaces/skill'
import ImageWithSkeleton from '@/components/img/ImageWithSkeleton'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

interface SkillCardProps extends React.HTMLAttributes<HTMLDivElement> {
  skill: ISkill
  bgColor: string
}

export default function SkillCard2({
  skill,
  bgColor,
  ...props
}: SkillCardProps) {
  return (
    <div {...props} className={`${props.className || ''} ag-courses-item`}>
      <div className='ag-courses_box'>
        <div className='ag-courses_item shadow-lg'>
          <Link
            to={`/skill/${skill.id}`}
            className='ag-courses-item_link border'>
            <div className='ag-courses-item_img'>
              <ImageWithSkeleton src={skill.imageUrl} alt={skill.name} />
            </div>
            <div className={`ag-courses-item_bg bg-${bgColor}-500`}></div>

            <div className='ag-courses-item_title z-0 mt-2'>{skill.name}</div>
            <p className='text-sm text-black/50'>{skill.category}</p>

            <div className='ag-courses-item_text '>
              <h3 className='text-3xl font-bold '>Descripción</h3>
              <h4 className='mt-4'> {skill.description}</h4>
              <Button
                className={`text-2xl font-bold mt-10 bg-white text-${bgColor}-500 hover:bg-orange-600 hover:text-white transition-colors duration-500 ease-in-out`}>
                Ver detalles
              </Button>
            </div>

            <div className='text-center'></div>
          </Link>
        </div>
      </div>
    </div>
  )
}
