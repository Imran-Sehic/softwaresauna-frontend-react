import { onSubmit } from "./submit";

describe("submitEvent", () => {
  const mockEventData = {
    name: "Test Event",
    description: "This is a test event",
    attendeeLimit: 100,
    time: {
      from: "2023-07-25T10:00",
      to: "2023-07-25T12:00",
    },
  };

  it("should handle unsuccessful event submission first (500 status code) then successful event submission (200 status code)", async () => {
    const mockSuccessOrError = (status: 200 | 500) => {
      return Promise.resolve({
        json: () => Promise.resolve({ status }),
        status: status,
      });
    };

    global.fetch = jest
      .fn()
      .mockImplementation(() => mockSuccessOrError(200))
      .mockImplementationOnce(() => mockSuccessOrError(500));

    const url = "https://www.backend.com/create-event";

    const errorStatusCode = await onSubmit(url, mockEventData);
    expect(fetch).toHaveBeenCalledWith(url, expect.any(Object));
    expect(errorStatusCode).toBe(500);

    const successStatusCode = await onSubmit(url, mockEventData);
    expect(fetch).toHaveBeenCalledWith(url, expect.any(Object));
    expect(successStatusCode).toBe(200);
  });

  // Additional test cases for other scenarios can be added here
});
