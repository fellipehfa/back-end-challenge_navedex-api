import { EntityRepository, Repository } from 'typeorm'
import { Navers } from '../models/Navers'

@EntityRepository(Navers)
class NaversRepository extends Repository<Navers> {

}

export { NaversRepository }
