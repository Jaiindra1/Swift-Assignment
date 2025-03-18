import { Request, Response } from "express";
import { db } from "./db";
import axios from "axios";

// Load Data from JSON Placeholder
export const loadData = async (req: Request, res: Response): Promise<void> => {
  try {
    const usersResponse = await axios.get("https://jsonplaceholder.typicode.com/users");
    const users = usersResponse.data.slice(0, 10); // Only 10 users

    for (let user of users) {
      const postsResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
      const posts = postsResponse.data;

      for (let post of posts) {
        const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
        post.comments = commentsResponse.data;
      }

      user.posts = posts;
    }

    await db.collection("users").insertMany(users);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: "Error loading data", error });
  }
};

// Delete All Users
export const deleteAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    await db.collection("users").deleteMany({});
    res.status(200).json({ message: "All users deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting users", error });
  }
};

// Delete Specific User
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await db.collection("users").deleteOne({ id: userId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Get Specific User
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await db.collection("users").findOne({ id: userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Add New User
export const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = req.body;
    const existingUser = await db.collection("users").findOne({ id: newUser.id });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    await db.collection("users").insertOne(newUser);
    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
};
