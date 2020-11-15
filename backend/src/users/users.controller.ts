import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a user' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created user',
    type: User,
  })

  @ApiResponse({
    status: 409,
    description: 'Error message saying that the email is already used',
  })
  create(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.create(userDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetches all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns an array of all the users',
    type: [User],
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetches a user' })
  @ApiResponse({
    status: 200,
    description: 'Return the user with the specified id',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description:
      'Error message saying that no organization with the specified id has been found',
  })
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Updates a user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated user',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description:
      'Error message saying that no organization with the specified id has been found',
  })
  update(@Param('id') id: number, @Body() userDto: UserDto) {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a user' })
  @ApiResponse({
    status: 200,
    description: 'Deletion successful. Returns an empty response',
  })
  @ApiResponse({
    status: 404,
    description:
      'Error message saying that no organization with the specified id has been found',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
