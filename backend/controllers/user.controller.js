const zod = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';
const User = require('../models/user.model');

const signupSchema = zod.object({
  name: zod.string(),
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(5).max(255),
});

const signup = async (req, res) => {
  const { success } = signupSchema.safeParse(req.body);
  console.log(success);

  if (!success) {
    return res.status(411).json({
      message: 'Incorrect inputs ',
    });
  }

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(411).json({
      message: 'Email already taken/Incorrect inputs ',
    });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
    username: req.body.username,
  });
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
  );

  res.status(200).json({
    message: 'User created successfully',
    token: token,
  });
};

const signin = async (req, res) => {
  const { success } = signinSchema.safeParse(req.body);
  //   console.log(req.body);
  if (!success) {
    console.log(success);
    return res.status(411).json({
      message: 'Error while logging in',
    });
  }

  const user = await User.findOne({
    email: req.body.email,
  });
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET,
    );

    res.json({
      message: 'Logged in successfully',
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: 'Error while logging in',
  });
};

module.exports = { signup, signin };
