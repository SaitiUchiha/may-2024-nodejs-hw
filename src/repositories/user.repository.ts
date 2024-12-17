import { IUser, IUserDtoUpdate } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async getEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }

  public async delete(id: string): Promise<void> {
    await User.deleteOne({ _id: id });
  }

  public async update(id: string, dto: IUserDtoUpdate): Promise<IUser> {
    return await User.findByIdAndUpdate(id, dto, { new: true });
  }
}

export const userRepository = new UserRepository();
