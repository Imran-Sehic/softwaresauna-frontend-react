import { fireEvent, render, screen } from "@testing-library/react";
import { onSubmit } from "../../api/submit";
import { UIEventForm } from "./index";
jest.mock("../../api/submit", () => ({
  onSubmit: jest.fn(),
}));

test("renders event form and submits data correctly", () => {
  render(<UIEventForm />);

  const nameInput = screen.getByTestId("event-name");
  fireEvent.change(nameInput, { target: { value: "" } });

  const descriptionInput = screen.getByTestId("event-description");
  fireEvent.change(descriptionInput, {
    target: { value: "This is a test event" },
  });

  const attendeeLimitInput = screen.getByTestId("attendee-limit");
  fireEvent.change(attendeeLimitInput, { target: { value: "100" } });

  const fromInput = screen.getByTestId("event-from-time");
  fireEvent.change(fromInput, { target: { value: "2023-07-25T10:00" } });

  const toInput = screen.getByTestId("event-to-time");
  fireEvent.change(toInput, { target: { value: "2023-07-25T12:00" } });

  const createButton = screen.getByText("Create Event");
  fireEvent.click(createButton);

  expect(onSubmit).not.toHaveBeenCalled();

  const nameError = screen.getByText("Name should not be empty");
  expect(nameError).toBeInTheDocument();

  fireEvent.change(nameInput, { target: { value: "Test Event" } });

  fireEvent.click(createButton);

  expect(onSubmit).toHaveBeenCalledWith(
    "https://www.backend.com/create-event",
    {
      name: "Test Event",
      description: "This is a test event",
      attendeeLimit: "100",
      time: {
        from: "2023-07-25T10:00",
        to: "2023-07-25T12:00",
      },
    }
  );
});
