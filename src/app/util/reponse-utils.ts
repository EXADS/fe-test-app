import swal from "sweetalert2";

// swal.fire("Posts Published!", "The post has been published", "success");
export function _errorHandler(error: any): Promise<any> {
  if (error.status == 0) {
    swal.fire(
      "Oops!",
      "Something went wrong. Error code: " + error.status,
      "error"
    );
    return Promise.reject("[0] Internal Server Error");
  }
  if (error.status == 401) {
    swal.fire(
      "Oops!",
      "Something went wrong. Error code: " + error.status,
      "error"
    );
    return Promise.reject("[401] Bad Request");
  }
  if (error.status == 403) {
    swal.fire("Oops!", "You do not have permission to do this!", "error");
    return Promise.reject("[403] Forbidden");
  }
  if (error.status == 409) {
    swal.fire(
      "Oops!",
      "Duplicate! That already exists in our system!",
      "error"
    );
    return Promise.reject("[409] Conflict");
  }
  if (error.status == 400) {
    swal.fire(
      "Oops!",
      "Something went wrong. Error code: " + error.status,
      "error"
    );
    return Promise.reject("[400] Bad Request");
  }
  if (error.status == 404) {
    return Promise.reject("[404] Not Found");
  }
  if (error.status == 500) {
    swal.fire("Oops!", "500 Internal Server Error!", "error");
    return Promise.reject("[500] Internal Server Error");
  } else {
    swal.fire("Oops!", "Something went wrong", "error");
    return Promise.reject("[0] Internal Server Error");
  }
}
