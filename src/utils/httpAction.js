import toast from "react-hot-toast";

const httpAction = (data) => async () => {
  try {
    const isForm = data.isFormData === true;
    const token = localStorage.getItem("token");
    const headers = {};

    if (!isForm) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(data.url, {
      method: data.method || "GET",
      body: isForm
        ? data.formData || data.body || null
        : data.body
        ? JSON.stringify(data.body)
        : null,
      headers,
      credentials: "include",
    });

    let result;

    try {
      
      result = await response.clone().json();
    } catch (err) {
      const text = await response.clone().text(); 
      console.error("Invalid JSON response. Raw response:", text);
      throw new Error("Invalid server response (not JSON)");
    }

    if (!response.ok) {
      throw new Error(result.message || "Request failed");
    }

    return result;
  } catch (error) {
    toast.error(error.message || "Something went wrong");
    return { status: false, message: error.message };
  }
};

export default httpAction;
