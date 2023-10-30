export function getErrorMessage(error: unknown): string {
  let msg;

  if (error instanceof Error) {
    msg = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    msg = String(error.message);
  } else if (typeof error === "string") {
    msg = error;
  } else {
    msg = "Something went horribly wrong.";
  }

  return msg;
}
