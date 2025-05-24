import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ReservationFormSchema } from "../../validations/ReservationFormSchema";
import s from "./ReservationForm.module.css";

const ReservationForm = () => {
  const initialValues = {
    name: "",
    email: "",
    date: null,
    comment: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    toast.success("Your message has been delivered successfully.");
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ReservationFormSchema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
    >
      {({ setFieldValue, values }) => (
        <Form className={s.form}>
          {[
            { name: "name", type: "text", placeholder: "Name*" },
            { name: "email", type: "email", placeholder: "Email*" },
          ].map(({ name, type, placeholder }) => (
            <label key={name}>
              <Field
                name={name}
                type={type}
                placeholder={placeholder}
                className={s.field}
                autoFocus={name === "name"}
              />
              <ErrorMessage name={name} component="div" className={s.error} />
            </label>
          ))}

          <label className={s.datepickerWrapper}>
            <DatePicker
              selected={values.date}
              onChange={(date) => setFieldValue("date", date)}
              placeholderText="Booking date"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              showPopperArrow={false}
              className={s.dateInput}
              calendarClassName="react-datepicker"
            />
            <ErrorMessage name="date" component="div" className={s.error} />
          </label>

          <label>
            <Field
              name="comment"
              as="textarea"
              placeholder="Comment"
              className={`${s.field} ${s.commentField}`}
            />
            <ErrorMessage name="comment" component="div" className={s.error} />
          </label>

          <button type="submit" className={s.submitbtn}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ReservationForm;
