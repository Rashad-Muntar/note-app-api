module.exports = {
  notes: async (parent, args, {models}) => {
    return await models.Note.find();
  },
  note: async (parent, { id }, { models }) => {
    return await models.Note.findById(id);
  },
};
