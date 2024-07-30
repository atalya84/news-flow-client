import mongoose from "mongoose";

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  imgUrl?: string;
  tokens?: string[];
}