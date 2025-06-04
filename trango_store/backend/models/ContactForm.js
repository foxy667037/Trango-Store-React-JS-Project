import mongoose from 'mongoose';
const { Schema } = mongoose;
import moment from "moment-timezone";

const formatDate = () => {
  return moment.tz("Asia/Karachi").format("HH:mm:ss YYYY/MM/DD");
};

const ContactFormSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  order_number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    default: formatDate,
  },
});

const ContactForm = mongoose.model('contactforms', ContactFormSchema);
export default ContactForm;
