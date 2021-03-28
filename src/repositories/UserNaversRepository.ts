import { EntityRepository, Repository } from 'typeorm'
import { UserNavers } from '../models/UserNavers'

@EntityRepository(UserNavers)
class UserNaversRepository extends Repository<UserNavers> {

}

export { UserNaversRepository }
