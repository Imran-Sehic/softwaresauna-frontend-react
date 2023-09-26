import { useState } from "react";
import { onSubmit } from "../../api/submit";
import "./index.css";

export interface FormDataInterface {
  name: string;
  description: string;
  attendeeLimit: number;
  time: {
    from: string;
    to: string;
  };
}

export interface ErrorDataInterface {
  name?: string;
  description?: string;
  attendeeLimit?: string;
  time?: string;
}

export const UIEventForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataInterface>({
    name: "",
    description: "",
    attendeeLimit: 0,
    time: {
      from: "",
      to: "",
    },
  });

  const [errors, setErrors] = useState<ErrorDataInterface>();

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isTime?: boolean
  ) => {
    const { name, value } = event.target;
    isTime
      ? setFormData((prevData) => ({
          ...prevData,
          time: {
            ...prevData.time,
            [name]: value,
          },
        }))
      : setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: ErrorDataInterface = {};

    if (!formData.name.length) {
      newErrors.name = "Name should not be empty";
      valid = false;
    }

    const fromTime = new Date(formData.time.from).getTime();
    const toTime = new Date(formData.time.to).getTime();

    if (fromTime >= toTime) {
      newErrors.time = "From date should be smaller than To date";
    }

    setErrors(newErrors);
    return valid;
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      const url = "https://www.backend.com/create-event";
      onSubmit(url, formData);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={submitForm} className="form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          data-testid="event-name"
          onChange={onChange}
          value={formData.name}
        />
        {errors?.name && <div style={{ color: "red" }}>{errors.name}</div>}
        <label htmlFor="description">Description:</label>
        <textarea
          rows={5}
          name="description"
          data-testid="event-description"
          onChange={onChange}
          value={formData.description}
        />
        <label htmlFor="name">Attendees:</label>
        <input
          type="number"
          name="attendeeLimit"
          data-testid="attendee-limit"
          onChange={onChange}
          value={formData.attendeeLimit}
        />
        <label htmlFor="from">From:</label>
        <input
          type="datetime-local"
          name="from"
          data-testid="event-from-time"
          onChange={(e) => onChange(e, true)}
          value={formData.time.from}
        />
        <label htmlFor="to">To:</label>
        <input
          type="datetime-local"
          name="to"
          data-testid="event-to-time"
          onChange={(e) => onChange(e, true)}
          value={formData.time.to}
        />
        {errors?.time && <div style={{ color: "red" }}>{errors.time}</div>}
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};
