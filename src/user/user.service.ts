import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Get all users
  async findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Get a user by ID
  async viewUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  // Update a user by ID
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    // Update only provided fields
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  // Delete a user by ID
  async removeUser(id: number): Promise<{ affected: number }> {
    const result = await this.userRepository.delete(id);
    return { affected: result.affected ?? 0 };
  }
}
