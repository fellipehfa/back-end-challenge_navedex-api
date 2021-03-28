import { EntityRepository, Repository } from 'typeorm'
import { Projects } from '../models/Projects'

@EntityRepository(Projects)
class ProjectsRepository extends Repository<Projects> {

}

export { ProjectsRepository }
