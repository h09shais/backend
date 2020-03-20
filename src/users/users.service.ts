import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginDto, PatchUserDto } from './users.controller';
import { compareHash, hashString } from 'src/utils/hash';
import { UsersMongoService } from './services/users.mongo.service';
import { ObjectID } from 'mongodb';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(private usersMongo: UsersMongoService) {}

    public async registerOrLogin(data: LoginDto) {
        const user = await this.usersMongo.findOneByUuid(data.uuid);
        if (user) {
            if (await compareHash(data.password, user.password)) {
                throw new HttpException('BAD_CREDENTIALS', HttpStatus.FORBIDDEN);
            }
            return user;
        }
        const hashedPassword = await hashString(data.password);
        return this.usersMongo.createOne({ uuid: data.uuid, password: hashedPassword });
    }

    public async patch(args: { id: ObjectID; data: Partial<User> }) {
        return this.usersMongo.patchOneById({ id: new ObjectID(args.id), data: args.data });
    }
}
