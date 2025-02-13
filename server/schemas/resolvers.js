const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks')
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },


    },

    Mutation: {

        login: async (parent, body) => {
            // find user by username or by email
            const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(body.password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, body) => {
            const user = await User.create(body);
            const token = signToken(user);
            console.log({user, token});
            return { token, user };
        },

        saveBook: async (parent, body, context) => {
            if (context.user) {
                console.log(context.user._id);
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    // add to set pushes new book to array tied to user, but makes sure no repeated books are pushed
                    { $addToSet: { savedBooks: body } },
                    { new: true,runValidators: true}
                )
                return updatedUser;
            }
            throw new AuthenticationError('Please log in!')
        },

        removeBook: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId: args.bookId } } },
                    { new: true }
                )
                return updatedUser;
            }
            throw new AuthenticationError('Please log in!')

        }
    }
}

module.exports = resolvers;