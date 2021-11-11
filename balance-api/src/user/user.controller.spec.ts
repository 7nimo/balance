import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserRO } from './user.interface';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should return a created user', async () => {
      const user: UserRO = {
        username: 'Joe',
        email: 'joes@email.com',
        password: 'password',
      };

      jest.spyOn(userService, 'create').mockImplementation(() => {
        user;
      });

      expect(await userController.create(user)).toBe(user);
    });
  });
});
