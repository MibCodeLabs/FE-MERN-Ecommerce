import axios from "axios";

// export function getErrorMessage(error: unknown): string {
//   if (axios.isAxiosError(error)) {
//     return (
//       error.response?.data?.message ??
//       error.message ??
//       "Request failed."
//     );
//   }

//   if (error instanceof Error) {
//     return error.message;
//   }

//   return "An unexpected error occurred.";
// }

export const getErrorMessage = (error: unknown): string => {
  const err = error as any;

  const fieldErrors = err?.response?.data?.errors?.fieldErrors;

  if (fieldErrors) {
    const messages = Object.values(fieldErrors)
      .flat()
      .filter((message): message is string => typeof message === "string");

    if (messages.length > 0) {
      return messages.join(" • ");
    }
  }

  return err?.response?.data?.message || "Something went wrong";
};
