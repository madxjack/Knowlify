import { Link } from 'react-router-dom'
import { useSkill } from '@/hooks/skill'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import SkillCard from '@/components/skill/SkillCard'

export default function SkillListPage() {
  const { skills } = useSkill()

  return (
    <>
      <div className='flex min-h-screen w-full flex-col'>
        <main className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {skills.map((skill) => (
            <article>
              <SkillCard key={skill.id} skill={skill} />
            </article>
          ))}
        </main>
        {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell>{skill.id}</TableCell>
                  <TableCell>{skill.name}</TableCell>
                  <TableCell>{skill.description}</TableCell>
                  <TableCell>{skill.category}</TableCell>
                  <TableCell>
                    <Link to={`/skill/${skill.id}`}>Ver</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
      </div>
    </>
  )
}
