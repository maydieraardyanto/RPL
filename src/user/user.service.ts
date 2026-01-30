import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username: dto.username }
    })
    if (existingUser) {
      throw new ConflictException('Username sudah digunakan')
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)
    
    return this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword
      }
    })
  }
  async findAll() {
    return this.prisma.user.findMany({ orderBy: { id: 'asc' } })
  }
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new NotFoundException('User not found')
    return user
  }
  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id)
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10)
    }
    return this.prisma.user.update({
      where: { id },
      data: dto,
    })
  }
  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.user.delete({ where: { id } })
    return { message: `User with id ${id} deleted` }
  }
}