
const ConversationSchema = ({
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const MessageSchema = (
    {
      conversationId: {
        type: String,
      },
      sender: {
        type: String,
      },
      text: {
        type: String,
      },
    },
    { timestamps: true }
  );