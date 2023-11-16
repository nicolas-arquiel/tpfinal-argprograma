import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const useCustomAlert = () => {
  const showConfirmAlert = async (options) => {
    const {
      title,
      message,
      icon,
      onConfirm,
      html,
      confirmButtonText,
      showCancelButton = true,
      showConfirmButton = true,
      customClasses = {},
    } = options;

    try {
      const result = await MySwal.fire({
        title,
        text: message,
        icon,
        showCancelButton,
        showConfirmButton,
        confirmButtonText,
        cancelButtonText: "Cancelar",
        customClass: {
          confirmButton: "btn btn-success fw-bolder",
          cancelButton: "btn btn-outline-danger ms-1 fw-bolder ",
          ...customClasses,
        },
        buttonsStyling: false,
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          try {
            await onConfirm();
          } catch (error) {
            Swal.showValidationMessage(`Error: ${error}`);
          }
        },
        allowOutsideClick: false,
        html,
      });

      return result.value;
    } catch (error) {
      console.error("An error occurred:", error);
      MySwal.fire("Error", error || "Ocurrió un error!", "error");
      throw error;
    }
  };

  const simpleAlert = async (options) => {
    const { title, message, icon, html, customClasses = {} } = options;

    try {
      const result = await MySwal.fire({
        title,
        text: message,
        icon,
        html,
        allowOutsideClick: false,
        customClass: customClasses,
      });

      return result;
    } catch (error) {
      return error;
    }
  };

  const simpleAlertNoButtons = async (options) => {
    const { title, message, icon, html, customClasses = {} } = options;

    try {
      const result = await MySwal.fire({
        title,
        text: message,
        icon,
        html,
        allowOutsideClick: false,
        showConfirmButton: false,
        showCancelButton: false,
        customClass: customClasses,
      });

      return result;
    } catch (error) {
      return error;
    }
  };

  const loadingAlert = async () => {
    try {
      const result = await MySwal.fire({
        title: "Cargando...",
        text: "Espere un momento...",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      return result;
    } catch (error) {
      return error;
    }
  };

  const loadingAlertWithMessage = async (message) => {
    try {
      const result = await MySwal.fire({
        title: "Cargando...",
        text: message,
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      return result;
    } catch (error) {
      return error;
    }
  };

  const closeAllAlerts = () => {
    Swal.close();
  };

  return {
    showConfirmAlert,
    simpleAlert,
    loadingAlert,
    closeAllAlerts,
    loadingAlertWithMessage,
    simpleAlertNoButtons,
  };
};

export default useCustomAlert;
