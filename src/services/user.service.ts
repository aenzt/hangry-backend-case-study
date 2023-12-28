import { User } from "../models/user.model";
import { userRepository } from "../repositories/user.repository";

const createUser: Function = (user: User) => {
  user.id = userRepository.length + 1;
  userRepository.push(user);
  return user;
};

const getAllUsers: Function = () => {
  return userRepository;
};

const getUserById: Function = (id: number) => {
  const user = userRepository.find((user) => user.id === id);
  return user;
};

const updateUserById: Function = (id: number, user: User) => {
  const userIndex = userRepository.findIndex((user) => user.id === id);
  userRepository[userIndex] = user;
  return user;
};

const deleteUserById: Function = (id: number) => {
  const userIndex = userRepository.findIndex((user) => user.id === id);
  userRepository.splice(userIndex, 1);
  return;
};

const getUserByEmail: Function = (email: string) => {
  const user = userRepository.find((user) => user.email === email);
  return user;
};

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByEmail,
};
