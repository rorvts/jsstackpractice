import Appointment from "../models/Appointment";
import User from "../models/User";
import * as Yup from "yup";

class AppointmentController {
  async store(request, response) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required()
    });

    if(!(await schema.isValid(request.body))){
      return response.status(400).json({ error: "Fields not valid." });
    }

    const { provider_id, date } = request.body;
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true }
    });

    if(!isProvider){
      return response.status(401).json({ error: "You can only create appointments with providers."});
    }

    const appointment = await Appointment.create({
      user_id: request.userId,
      provider_id,
      date
    });

    return response.json(appointment);
  }
}

export default new AppointmentController();