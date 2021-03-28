import { EntityRepository, Repository } from 'typeorm'
import { ProjectNavers } from '../models/ProjectNavers'

@EntityRepository(ProjectNavers)
class ProjectNaversRepository extends Repository<ProjectNavers> {

}

export { ProjectNaversRepository }
