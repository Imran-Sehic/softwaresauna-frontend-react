import { FormDataInterface } from "../components/event-form";

export const onSubmit = async (
  url: string,
  model: FormDataInterface
): Promise<number> => {
  try {
    const response = await fetch("https://www.backend.com/create-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
    });
    return response.status;
  } catch (error) {
    return 500;
  }
};
